// Global variables
let currentQuestion = null;
let isHighlighting = false;
let lastCursorPos = 0;
let executionContextId = null;
let isWaitingForInput = false;
let currentExecution = null;
let inputQueue = []; // Store all inputs upfront
let inputIndex = 0; // Track current input position

// Function to load questions (unchanged)
function loadQuestion(key, event) {
  if (event) event.preventDefault();

  currentQuestion = key;
  const q = questions[key];

  if (!q) {
    document.getElementById('questionArea').innerHTML = `
      <h2><i class="fas fa-exclamation-circle"></i> Oops!</h2>
      <p>No question found for key: <strong>${key}</strong></p>
    `;
    return;
  }

  // Update active tab
  document.querySelectorAll('#topics li').forEach(li => li.classList.remove('active'));
  if (event) {
    event.currentTarget.classList.add('active');
  } else {
    const targetLi = document.querySelector(`#topics li[onclick*="${key}"]`);
    if (targetLi) targetLi.classList.add('active');
  }

  // Update question display
  document.getElementById('questionArea').innerHTML = `
    <h2><i class="fas fa-question-circle"></i> ${q.title}</h2>
    <div class="question-description">
      ${q.description}
    </div>
  `;

  // Load code into editor
  loadCodeIntoEditor(q.code || '');
  document.getElementById('output').textContent = '# Your program output will appear here...';
}

// Load code into editor with syntax highlighting (unchanged)
function loadCodeIntoEditor(code) {
  const editor = document.getElementById("code");
  editor.textContent = code;
  applySyntaxHighlighting();
}

// Apply syntax highlighting (unchanged)
function applySyntaxHighlighting() {
  return new Promise((resolve) => {
    if (isHighlighting) {
      resolve();
      return;
    }

    const editor = document.getElementById("code");
    const code = editor.textContent;
    lastCursorPos = getCursorPosition(editor);
    const scrollPos = editor.scrollTop;

    isHighlighting = true;
    
    fetch('http://localhost:5000/highlight', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: code })
    })
    .then(res => res.json())
    .then(data => {
      editor.innerHTML = data.highlighted_code;
      setCursorPosition(editor, lastCursorPos);
      editor.scrollTop = scrollPos;
      isHighlighting = false;
      resolve();
    })
    .catch(err => {
      console.error("Highlighting error:", err);
      editor.textContent = code;
      setCursorPosition(editor, lastCursorPos);
      editor.scrollTop = scrollPos;
      isHighlighting = false;
      resolve();
    });
  });
}

// Cursor position functions (unchanged)
function getCursorPosition(editor) {
  const selection = window.getSelection();
  if (!selection.rangeCount) return 0;
  
  const range = selection.getRangeAt(0);
  const preRange = document.createRange();
  preRange.selectNodeContents(editor);
  preRange.setEnd(range.startContainer, range.startOffset);
  return preRange.toString().length;
}

function setCursorPosition(editor, pos) {
  const selection = window.getSelection();
  const range = document.createRange();
  
  let charCount = 0;
  let foundNode = null;
  let foundOffset = 0;

  function traverse(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const nextCount = charCount + node.length;
      if (!foundNode && pos >= charCount && pos <= nextCount) {
        foundNode = node;
        foundOffset = pos - charCount;
      }
      charCount = nextCount;
    } else {
      for (let child of node.childNodes) {
        traverse(child);
        if (foundNode) break;
      }
    }
  }

  traverse(editor);
  
  if (foundNode) {
    range.setStart(foundNode, foundOffset);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}

// Modified input handling functions
function showInputModal(promptText) {
  const modal = document.getElementById('inputModal');
  const inputPrompt = document.getElementById('inputPrompt');
  const userInputBox = document.getElementById('userInputBox');
  
  inputPrompt.textContent = promptText;
  userInputBox.value = '';
  modal.style.display = 'block';
  userInputBox.focus();
  
  return new Promise((resolve) => {
    window.submitInput = () => {
      modal.style.display = 'none';
      resolve(userInputBox.value);
    };
    
    window.cancelInput = () => {
      modal.style.display = 'none';
      resolve(null);
    };
  });
}

async function runCode() {
  const editor = document.getElementById("code");
  const output = document.getElementById("output");
  const runBtn = document.querySelector('.run-btn');
  const code = editor.textContent;

  // Reset and prepare UI
  output.textContent = "Running your code...";
  runBtn.disabled = true;
  runBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Running...';

  try {
    // Count all input() calls
    const inputMatches = code.match(/input\(/g) || [];
    const inputCount = inputMatches.length;
    const inputs = [];
    
    // Collect all inputs upfront
    for (let i = 0; i < inputCount; i++) {
      const input = await showInputModal(`Please enter input ${i+1} of ${inputCount}`);
      if (input === null) {
        output.textContent += "\n\nExecution canceled";
        return;
      }
      inputs.push(input);
    }

    // Execute with all inputs
    const response = await fetch('http://localhost:5000/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        code: code,
        inputs: inputs 
      })
    });

    const result = await response.json();

    // Display results
    if (result.error) {
      output.innerHTML = `<div class="output-text">${result.output}</div>
                         <div class="error-text">Error: ${result.error}</div>`;
    } else {
      output.innerHTML = `<div class="output-text">${result.output}</div>`;
    }

  } catch (err) {
    output.textContent = "Connection error: " + err.message;
  } finally {
    runBtn.disabled = false;
    runBtn.innerHTML = '<i class="fas fa-play"></i> Run Code';
  }
}
// Modified to process execution without additional input prompts
async function processExecution() {
  const output = document.getElementById("output");
  
  try {
    const response = await fetch(`http://localhost:5000/continue/${executionContextId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: "" }) // No additional inputs needed
    });
    
    const data = await response.json();
    
    if (data.error) {
      output.textContent = data.output + (data.error ? "\n\nError: " + data.error : "");
      return;
    }
    
    output.textContent = data.output;
    
    if (data.plot) {
      const img = document.createElement('img');
      img.src = `http://localhost:5000/plot/${data.plot}`;
      img.style.maxWidth = '100%';
      img.style.marginTop = '10px';
      output.appendChild(img);
    }
    
  } catch (err) {
    output.textContent = "Error: " + err.message;
  }
}

// Initialize editor (unchanged)
function initEditor() {
  const editor = document.getElementById("code");

  // Handle Tab key
  editor.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      document.execCommand('insertText', false, '    ');
    }
  });

  // Auto-highlight with debounce
  let highlightTimeout;
  editor.addEventListener('input', () => {
    clearTimeout(highlightTimeout);
    highlightTimeout = setTimeout(applySyntaxHighlighting, 500);
  });

  // Prevent paste of formatted text
  editor.addEventListener('paste', (e) => {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData('text/plain');
    document.execCommand('insertText', false, text);
  });

  // Fix scroll behavior
  editor.addEventListener('scroll', function() {
    const scrollPos = editor.scrollTop;
    applySyntaxHighlighting().then(() => {
      editor.scrollTop = scrollPos;
    });
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initEditor();
  const firstQuestionKey = Object.keys(questions)[0];
  loadQuestion(firstQuestionKey);
});

// Modal functions (unchanged)
function showDescriptionModal() {
  const modal = document.getElementById('simpleDialog');
  const content = document.getElementById('dialogContent');
  const q = questions[currentQuestion];

  content.innerHTML = `<h3>${q.title}</h3>${q.description}`;
  modal.style.display = 'block';
}

function closeDialog() {
  document.getElementById('simpleDialog').style.display = 'none';
}

// Submit input from modal
function submitInput() {
  if (typeof window.submitInput === 'function') {
    window.submitInput();
  }
}

// Cancel input from modal
function cancelInput() {
  if (typeof window.cancelInput === 'function') {
    window.cancelInput();
  }
}