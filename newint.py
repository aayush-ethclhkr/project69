from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
from datetime import datetime
import io
import sys
import contextlib
from pygments import highlight
from pygments.lexers import PythonLexer
from pygments.formatters import HtmlFormatter

app = Flask(__name__)
CORS(app)

# Execution state storage
execution_contexts = {}

@app.route('/highlight', methods=['POST'])
def highlight_code():
    code = request.json.get('code', '')
    highlighted_code = highlight(
        code,
        PythonLexer(),
        HtmlFormatter(style='monokai', noclasses=True)
    )
    return jsonify({"highlighted_code": highlighted_code})

@app.route('/start', methods=['POST'])
def start_execution():
    data = request.get_json()
    code = data.get("code", "")
    
    # Create new execution context
    context_id = os.urandom(16).hex()
    execution_contexts[context_id] = {
        'code': code,
        'locals': {},
        'globals': {
            "__builtins__": {
                "print": print,
                "input": lambda prompt="": request_input(context_id, prompt),
                "range": range,
                "int": int,
                "str": str,
                "float": float
            }
        },
        'output': io.StringIO(),
        'pending_input': None
    }
    
    return jsonify({"context_id": context_id})

def request_input(context_id, prompt=""):
    ctx = execution_contexts.get(context_id)
    if not ctx:
        raise RuntimeError("Invalid execution context")
    
    ctx['pending_input'] = prompt
    ctx['output'].write(prompt)
    raise PendingInput(prompt)

class PendingInput(Exception):
    def __init__(self, prompt):
        self.prompt = prompt
        super().__init__()

@app.route('/continue/<context_id>', methods=['POST'])
def continue_execution(context_id):
    data = request.get_json()
    user_input = data.get("input", "")
    
    ctx = execution_contexts.get(context_id)
    if not ctx:
        return jsonify({"error": "Invalid context ID"}), 400
    
    try:
        with contextlib.redirect_stdout(ctx['output']):
            # Execute the code with the new input
            exec(ctx['code'], ctx['globals'], ctx['locals'])
            
        return jsonify({
            "output": ctx['output'].getvalue(),
            "done": True,
            "error": ""
        })
        
    except PendingInput as e:
        return jsonify({
            "output": ctx['output'].getvalue(),
            "done": False,
            "prompt": e.prompt
        })
    except Exception as e:
        return jsonify({
            "output": ctx['output'].getvalue(),
            "error": str(e),
            "done": True
        })

@app.route('/plot/<filename>')

def serve_plot(filename):
    return send_from_directory('static', filename)

@app.route('/run', methods=['POST'])
def run_code():
    data = request.get_json()
    code = data.get("code", "")
    inputs = data.get("inputs", [])
    input_ptr = 0

    # Custom input function
    def custom_input(prompt=""):
        nonlocal input_ptr
        if input_ptr < len(inputs):
            val = inputs[input_ptr]
            input_ptr += 1
            print(prompt + str(val))  # Include prompt in output
            return val
        return ""

    # Complete safe builtins
    safe_builtins = {
        "print": print,
        "input": custom_input,
        "int": int,          # Add this
        "str": str,          # Add this
        "float": float,      # Add this
        "range": range,      # Add this
        "len": len           # Add this
    }

    output = io.StringIO()
    
    try:
        with contextlib.redirect_stdout(output):
            exec(code, {"__builtins__": safe_builtins})
        
        return jsonify({
            "output": output.getvalue(),
            "error": "",
            "plot": None
        })
        
    except Exception as e:
        return jsonify({
            "output": output.getvalue(),
            "error": str(e),
            "plot": None
        })
    
if __name__ == '__main__':
    app.run(debug=True)