// Global variable to track current question
let currentQuestion = null;
let isHighlighting = false;
let lastCursorPos = 0;

// Function to load questions
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

// Load code into editor with syntax highlighting
function loadCodeIntoEditor(code) {
  const editor = document.getElementById("code");
  editor.textContent = code;
  applySyntaxHighlighting();
}

// Apply syntax highlighting to editor content
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


// Get current cursor position
function getCursorPosition(editor) {
  const selection = window.getSelection();
  if (!selection.rangeCount) return 0;
  
  const range = selection.getRangeAt(0);
  const preRange = document.createRange();
  preRange.selectNodeContents(editor);
  preRange.setEnd(range.startContainer, range.startOffset);
  return preRange.toString().length;
}

// Set cursor position
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

// Function to run Python code
function runCode() {
  const editor = document.getElementById("code");
  const output = document.getElementById("output");
  const runBtn = document.querySelector('.run-btn');

  const code = editor.textContent;

  // ✨ Prompt user for stdin
  const userInput = prompt("Enter input for the program (if any):", "");

  runBtn.disabled = true;
  runBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Running...';
  output.textContent = "Running your code...";

  fetch('http://localhost:5000/run', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: code, stdin: userInput })
  })
  .then(res => res.json())
  .then(data => {
    let result = "";
    if (data.output) result += data.output;
    if (data.error) result += (result ? "\n\n" : "") + "Errors:\n" + data.error;

    output.textContent = result;

    if (data.plot) {
      const img = document.createElement('img');
      img.src = `http://localhost:5000/plot/${data.plot}`;
      img.style.maxWidth = '100%';
      img.style.marginTop = '10px';
      output.appendChild(img);
    }
  })
  .catch(err => {
    output.textContent = "Error: " + err.message;
  })
  .finally(() => {
    runBtn.disabled = false;
    runBtn.innerHTML = '<i class="fas fa-play"></i> Run Code';
  });
}

// Initialize editor
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
    // Ensure syntax highlighting doesn't break scroll
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