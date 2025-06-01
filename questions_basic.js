const questions = {
t1: {
title: "Voting Eligibility Checker",
description: `<p><strong>🎯 Problem Statement:</strong> A system to check if a person is eligible to vote:</p>
                <ul>
                    <li>Must be 18 or older</li>
                    <li>Must be a citizen</li>
                    <li>If age is above 60, they get a priority pass</li>
                </ul>`,
code: `
age = int(input("Enter your age: "))
citizen = input("Are you a citizen? (yes/no): ")

if age >= 18:
    if citizen.lower() == "yes":
        if age >= 60:
            print("Eligible to Vote with Priority Pass")
        else:
            print("Eligible to Vote")
    else:
        print("Not Eligible (Non-Citizen)")
else:
    print("Not Eligible (Underage)")`,
        
    },
    t2:{
        title:"Student Grading System",
        description:`<p><strong>🎯 Problem Statement:</strong> A student's grade is calculated based on marks and attendance:</p>
                <ul>
                    <li>Marks ≥ 90 and Attendance ≥ 85% → Grade A+ with Scholarship</li>
                    <li>Marks ≥ 90 but Attendance < 85% → Grade A</li>
                    <li>Marks between 80-89 → Grade B</li>
                    <li>Marks between 70-79 → Grade C</li>
                    <li>Marks between 60-69 → Grade D</li>
                    <li>Marks < 60 → Fail</li>
                </ul>`,
        code:`
marks = int(input("Enter your marks: "))
attendance = int(input("Enter your attendance percentage: "))

if marks >= 90:
    if attendance >= 85:
        print("Grade: A+ with Scholarship")
    else:
        print("Grade: A")
elif 80 <= marks <= 89:
    print("Grade: B")
elif 70 <= marks <= 79:
    print("Grade: C")
elif 60 <= marks <= 69:
    print("Grade: D")
else:
    print("Fail")`,
        
    },
    t3:{
        title:"Bank Loan Approval",
        description:`<p><strong>🎯 Problem Statement:</strong> A bank approves loans based on:</p>
                <ul>
                    <li>Income ≥ $60,000 and Credit Score ≥ 700 → Loan Approved</li>
                    <li>Income between $40,000-$59,999 with Credit Score ≥ 650 → Conditional Approval</li>
                    <li>Income < $40,000 or Credit Score < 650 → Loan Rejected</li>
                </ul>`,
        code:`
income = int(input("Enter your annual income: "))
credit_score = int(input("Enter your credit score: "))

if income >= 60000:
    if credit_score >= 700:
        print("Loan Approved")
    else:
        print("Loan Rejected (Low Credit Score)")
elif 40000 <= income < 60000:
    if credit_score >= 650:
        print("Conditional Loan Approval")
    else:
        print("Loan Rejected (Low Credit Score)")
else:
    print("Loan Rejected (Low Income)")`,
        
    },
    t4: {
        title:"E-commerce Shipping",
        description:` <p><strong>🎯 Problem Statement:</strong> Shipping costs based on order value and location:</p>
                <ul>
                    <li>Order ≥ $100 and local → Free Shipping</li>
                    <li>Order $50-$99 → $5 Shipping</li>
                    <li>Order $20-$49 → $10 Shipping</li>
                    <li>Order < $20 → $15 Shipping</li>
                    <li>International → Additional $20</li>
                </ul>`,
        code:`
order_value = float(input("Enter your order value: $"))
location = input("Is the location Local or International? ").lower()

if order_value >= 100:
    shipping = 0
elif 50 <= order_value < 100:
    shipping = 5
elif 20 <= order_value < 50:
    shipping = 10
else:
    shipping = 15

if location == "international":
    shipping += 20

print(f"Total Shipping Cost: \${shipping}")`,
        
    },
    t5:{
        title:"Password Strength Checker",
        description:`<p><strong>🎯 Problem Statement:</strong> A system to check password strength:</p>
                <ul>
                    <li>Length ≥ 12 and contains special chars → Strong Password</li>
                    <li>Length between 8-11 → Medium Password</li>
                    <li>Length < 8 → Weak Password</li>
                </ul>`,
        code:`
password = input("Enter your password: ")

if len(password) >= 12:
    if any(char in "!@#$%^&*()-_+=<>?/|{}[]" for char in password):
        print("Strong Password")
    else:
        print("Medium Password")
elif 8 <= len(password) <= 11:
    print("Medium Password")
else:
    print("Weak Password")`,
        
    },
    t6:{
        title:"Remove All Spaces",
        description:`<p><strong>🎯 Problem Statement:</strong> Create a program to remove all spaces from the input string.</p>`,
        code:`
# Remove spaces using replace()
no_space = text.replace(" ", "")

print("String without spaces:", no_space)`,
        
    },
    t7:{
        title:"Convert to Title Case",
        description:`
        <p><strong>🎯 Problem Statement:</strong> Write a program to capitalize the first letter of each word in a string (like a title).</p>
`,
        code:`
text = input("Enter a string: ")

# Convert to title case using title()
title_case = text.title()

print("Title Case String:", title_case)`,
        
    },
    t8:{
        title:"First & Last Character",
        description:`
        <p><strong>🎯 Problem Statement:</strong> Write a program to display the first and last character of a string.</p>`,
        code:`
text = input("Enter a string: ")

# Accessing first and last character
if len(text) > 0:
    first_char = text[0]
    last_char = text[-1]
    print("First Character:", first_char)
    print("Last Character:", last_char)
else:
    print("Empty String")`,
        
    },
    t9:{
        title:"Check for Digits Only",
        description:`
         <p><strong>🎯 Problem Statement:</strong> Write a program to check if the input string contains only numeric digits (0-9).</p>
            
`,
        code:`
text = input("Enter a string: ")

# Check if string is numeric
if text.isdigit():
    print("The string contains only digits.")
else:
    print("The string contains other characters.")`,
        
    },
    t10:{
        title:"Count Character Occurrences",
        description:`
         <p><strong>🎯 Problem Statement:</strong> Write a program to count how many times a specific character appears in a string.</p>`,
        code:`
text = input("Enter a string: ")
char = input("Enter the character to count: ")

# Count the character
count = text.count(char)

print(f"'{char}' appears {count} times in the string.")`,
        
    },

}