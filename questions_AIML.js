const questions = {

  intro: {
    title:"INTRODUCTION",
    description:`Welcome to Artifical Intelligence and Machine Learning module`,
    

  },
  t1: {
  title: "Simple Iris Dataset Loader",
  description: `
    <h4>🌼 Simple Iris Dataset Loader</h4>
    <p>This basic script loads the Iris dataset using <code>scikit-learn</code> and prints feature names, target names, and a sample of the dataset. No visualization libraries are used.</p>

    <h4>🔍 Key Features:</h4>
    <ul>
      <li>Loads Iris dataset from <code>sklearn.datasets</code></li>
      <li>Displays feature names and target labels</li>
      <li>Prints first 5 rows of data with targets</li>
    </ul>

    <h4>📊 Output:</h4>
    <ul>
      <li>List of feature names</li>
      <li>List of species names (target)</li>
      <li>Preview of data in tabular form</li>
    </ul>

    <h4>🧰 Libraries Used:</h4>
    <ul>
      <li><code>sklearn.datasets</code></li>
      <li><code>pandas</code> (for tabular display)</li>
    </ul>

    <h4>⚙️ Requirements:</h4>
    <ul>
      <li>Python 3.x</li>
      <li>pandas, scikit-learn</li>
    </ul>

    <h4>💡 Usage:</h4>
    <ul>
      <li>Run this script directly</li>
      <li>Inspect printed dataset structure</li>
    </ul>
  `,
  code: `
from sklearn.datasets import load_iris
import pandas as pd

# Load dataset
iris = load_iris()
df = pd.DataFrame(data=iris.data, columns=iris.feature_names)
df['species'] = iris.target

# Print info
print("🌸 Feature Names:", iris.feature_names)
print("🔖 Target Names:", iris.target_names)
print("📋 First 5 Samples:")
print(df.head())
`
}, 


t2: {
  title: "Random Classification Data Generator",
  description: `<p>A tool to generate a random classification dataset for machine learning models:</p>
                <ul>
                    <li>Uses <code>make_classification()</code> from scikit-learn</li>
                    <li>Generates data with 2 informative features</li>
                    <li>Visualizes data points with color-coded classes</li>
                    <li>Helps in understanding how classifiers work with sample data</li>
                </ul>`,
  code: `
from sklearn.datasets import make_classification
import matplotlib.pyplot as plt

# Generate random classification dataset
X, y = make_classification(n_samples=100, n_features=2, n_informative=2,
                           n_redundant=0, n_clusters_per_class=1, random_state=42)

# Plotting the dataset
plt.scatter(X[:, 0], X[:, 1], c=y, cmap='bwr', edgecolor='k')
plt.title("Random Classification Data")
plt.xlabel("Feature 1")
plt.ylabel("Feature 2")`
},

t3: {
  title: "Train-Test Splitter",
  description: `
    <h4>✂️ Dataset Splitter for Machine Learning</h4>
    <p>This script splits the dataset into training and testing subsets, a crucial step for training and evaluating ML models.</p>
    
    <h4>📌 Key Features:</h4>
    <ul>
      <li>Uses <code>train_test_split()</code> from <code>sklearn.model_selection</code></li>
      <li>Customizable split ratio</li>
      <li>Ensures reproducibility with <code>random_state</code></li>
    </ul>
    
    <h4>📋 Output Explanation:</h4>
    <ul>
      <li>Prints the number of samples in training and testing sets</li>
      <li>Helps you verify the proper division of data before model training</li>
    </ul>

    <h4>🧰 Libraries Used:</h4>
    <ul>
      <li><code>sklearn.model_selection</code> - for splitting the dataset</li>
    </ul>

    <h4>⚙️ Requirements:</h4>
    <ul>
      <li>Python 3.x</li>
      <li>scikit-learn installed</li>
      <li>A dataset (e.g., from <code>make_classification</code> or <code>load_iris</code>)</li>
    </ul>
    
    <h4>💡 Usage:</h4>
    <ul>
      <li>Ensure you have your dataset (X, y)</li>
      <li>Use the script to split into train and test parts</li>
      <li>Proceed to model training with <code>X_train</code> and <code>y_train</code></li>
    </ul>
  `,
  code: `
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

# Load and split data
data = load_iris()
X_train, _, y_train, _ = train_test_split(data.data, data.target, test_size=0.2, random_state=42)

# Train model
model = LogisticRegression(max_iter=200)
model.fit(X_train, y_train)

print("Model trained successfully!")
`
},
t4: {
  title: "Logistic Regression Trainer",
  description: `
    <h4>📈 Logistic Regression Trainer</h4>
    <p>This standalone script loads the Iris dataset, splits it into training and testing sets, and trains a Logistic Regression model to classify the flower species based on petal and sepal measurements.</p>

    <h4>🔍 Key Features:</h4>
    <ul>
      <li>Loads Iris dataset directly</li>
      <li>Uses train-test split (80/20)</li>
      <li>Trains Logistic Regression with 200 max iterations</li>
      <li>Prints prediction results on the test data</li>
    </ul>

    <h4>📊 Output:</h4>
    <ul>
      <li>Training sample size</li>
      <li>Testing sample size</li>
      <li>Success message after model training</li>
      <li>Predicted class labels for test samples</li>
    </ul>

    <h4>🧰 Libraries Used:</h4>
    <ul>
      <li><code>sklearn.datasets</code> - for Iris dataset</li>
      <li><code>sklearn.linear_model</code> - for LogisticRegression</li>
      <li><code>sklearn.model_selection</code> - for train_test_split</li>
    </ul>

    <h4>⚙️ Requirements:</h4>
    <ul>
      <li>Python 3.x</li>
      <li>scikit-learn library installed</li>
    </ul>

    <h4>💡 Usage:</h4>
    <ul>
      <li>Run this script directly</li>
      <li>Observe model training and predictions</li>
    </ul>
  `,
  code: `
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

# Load the dataset
data = load_iris()
X = data.data
y = data.target

# Split the dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print("Training Samples:", len(X_train))
print("Testing Samples:", len(X_test))

# Train the Logistic Regression model
model = LogisticRegression(max_iter=200)
model.fit(X_train, y_train)

print("✅ Model trained successfully!")

# Predict on test set
y_pred = model.predict(X_test)
print("🔮 Predicted Labels:", y_pred)
`,
},
t5: {
  title: "Model Predictor",
  description: `
    <h4>🔮 Model Predictor (Iris Flower)</h4>
    <p>This tool uses Logistic Regression to predict the Iris flower species based on custom user input. It trains the model within the script, ensuring it works independently without dependencies on prior training files.</p>

    <h4>🧠 Features:</h4>
    <ul>
      <li>Trains a fresh model on Iris dataset every time</li>
      <li>Accepts live input for prediction</li>
      <li>Predicts one of: Setosa, Versicolor, or Virginica</li>
    </ul>

    <h4>📊 Output:</h4>
    <ul>
      <li>Model training confirmation</li>
      <li>Predicted class label for user input</li>
    </ul>

    <h4>🧰 Libraries Used:</h4>
    <ul>
      <li><code>sklearn.datasets</code> - Load Iris dataset</li>
      <li><code>sklearn.model_selection</code> - Split data</li>
      <li><code>sklearn.linear_model</code> - Logistic Regression</li>
    </ul>

    <h4>⚙️ Requirements:</h4>
    <ul>
      <li>Python 3.x</li>
      <li><code>scikit-learn</code> installed</li>
    </ul>

    <h4>💡 Usage:</h4>
    <ul>
      <li>Run the script</li>
      <li>Enter 4 values: Sepal Length, Sepal Width, Petal Length, Petal Width</li>
      <li>Get predicted flower type instantly</li>
    </ul>
  `,
  code: `
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

# Load and prepare the dataset
data = load_iris()
X = data.data
y = data.target
target_names = data.target_names

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = LogisticRegression(max_iter=200)
model.fit(X_train, y_train)
print("✅ Model trained successfully!")

# Take user input
print("Enter values for prediction:")
sepal_length = float(input("Sepal Length (cm): "))
sepal_width = float(input("Sepal Width (cm): "))
petal_length = float(input("Petal Length (cm): "))
petal_width = float(input("Petal Width (cm): "))

# Make prediction
sample = [[sepal_length, sepal_width, petal_length, petal_width]]
prediction = model.predict(sample)
predicted_class = target_names[prediction[0]]

print(f"🔮 Predicted Iris Species: {predicted_class}")
`,
},
t6: {
  title: "Model Accuracy Checker",
  description: `
    <h4>📏 Model Accuracy Checker</h4>
    <p>This script evaluates the accuracy of a Logistic Regression model trained on the Iris dataset. It splits the data, trains the model, makes predictions, and prints the accuracy score — all in one standalone run.</p>

    <h4>⚡ Features:</h4>
    <ul>
      <li>Trains model on Iris dataset</li>
      <li>Evaluates prediction accuracy on test data</li>
      <li>Displays result in percentage</li>
    </ul>

    <h4>📊 Output:</h4>
    <ul>
      <li>Model trained confirmation</li>
      <li>Accuracy score of the model on test data</li>
    </ul>

    <h4>🧰 Libraries Used:</h4>
    <ul>
      <li><code>sklearn.datasets</code> – Iris data loading</li>
      <li><code>sklearn.model_selection</code> – Data splitting</li>
      <li><code>sklearn.linear_model</code> – Model training</li>
      <li><code>sklearn.metrics</code> – Accuracy scoring</li>
    </ul>

    <h4>⚙️ Requirements:</h4>
    <ul>
      <li>Python 3.x</li>
      <li><code>scikit-learn</code> installed</li>
    </ul>

    <h4>💡 Usage:</h4>
    <ul>
      <li>Run the script</li>
      <li>View training and accuracy results in console</li>
    </ul>
  `,
  code: `
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# Load dataset
data = load_iris()
X = data.data
y = data.target

# Split dataset into training and testing
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = LogisticRegression(max_iter=200)
model.fit(X_train, y_train)
print("✅ Model trained successfully!")

# Predict using the test data
y_pred = model.predict(X_test)

# Evaluate accuracy
accuracy = accuracy_score(y_test, y_pred)
print(f"🎯 Model Accuracy: {accuracy * 100:.2f}%")
`,
},
t7: {
  title: "Confusion Matrix Generator",
  description: `
    <h4>🔲 Confusion Matrix Generator</h4>
    <p>This tool trains a Logistic Regression model on the Iris dataset and generates a confusion matrix that compares predicted and actual labels. It includes a visual matrix plot for better clarity.</p>

    <h4>🔍 Key Features:</h4>
    <ul>
      <li>Trains and predicts with Logistic Regression</li>
      <li>Generates a confusion matrix</li>
      <li>Plots matrix visually using matplotlib</li>
    </ul>

    <h4>📊 Output:</h4>
    <ul>
      <li>Confusion matrix as a 2D array in console</li>
      <li>Graphical matrix plot</li>
    </ul>

    <h4>🧰 Libraries Used:</h4>
    <ul>
      <li><code>sklearn.datasets</code> – Iris dataset</li>
      <li><code>sklearn.model_selection</code> – Data splitting</li>
      <li><code>sklearn.linear_model</code> – Model training</li>
      <li><code>sklearn.metrics</code> – Confusion matrix</li>
      <li><code>matplotlib.pyplot</code> – Visualization</li>
    </ul>

    <h4>⚙️ Requirements:</h4>
    <ul>
      <li>Python 3.x</li>
      <li>scikit-learn, matplotlib installed</li>
    </ul>

    <h4>💡 Usage:</h4>
    <ul>
      <li>Run script directly</li>
      <li>Check printed matrix and view plotted result</li>
    </ul>
  `,
  code: `
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay
import matplotlib.pyplot as plt

# Load dataset
data = load_iris()
X = data.data
y = data.target

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = LogisticRegression(max_iter=200)
model.fit(X_train, y_train)

# Predict
y_pred = model.predict(X_test)

# Generate confusion matrix
cm = confusion_matrix(y_test, y_pred)
print("🔄 Confusion Matrix:\\n", cm)

# Plot confusion matrix
disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=data.target_names)
disp.plot(cmap=plt.cm.Blues)
plt.title("Confusion Matrix")
plt.grid(False)
plt.show()
`,
},
t8: {
  title: "Classification Report Viewer",
  description: `
    <h4>📑 Classification Report Viewer</h4>
    <p>This standalone script trains a Logistic Regression model on the Iris dataset and generates a detailed classification report using precision, recall, and F1-score for each class.</p>

    <h4>🔍 Key Features:</h4>
    <ul>
      <li>Trains Logistic Regression model on Iris dataset</li>
      <li>Predicts test labels</li>
      <li>Displays precision, recall, f1-score, and support</li>
    </ul>

    <h4>📊 Output:</h4>
    <ul>
      <li>Text-based classification report for each class</li>
      <li>Detailed evaluation metrics in console</li>
    </ul>

    <h4>🧰 Libraries Used:</h4>
    <ul>
      <li><code>sklearn.datasets</code> – Load Iris dataset</li>
      <li><code>sklearn.model_selection</code> – Split data</li>
      <li><code>sklearn.linear_model</code> – Logistic Regression model</li>
      <li><code>sklearn.metrics</code> – classification_report</li>
    </ul>

    <h4>⚙️ Requirements:</h4>
    <ul>
      <li>Python 3.x</li>
      <li>scikit-learn installed</li>
    </ul>

    <h4>💡 Usage:</h4>
    <ul>
      <li>Run the script directly</li>
      <li>View precision, recall, f1-score, and support in output</li>
    </ul>
  `,
  code: `
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report

# Load data
data = load_iris()
X = data.data
y = data.target

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = LogisticRegression(max_iter=200)
model.fit(X_train, y_train)

# Predict
y_pred = model.predict(X_test)

# Generate and print classification report
report = classification_report(y_test, y_pred, target_names=data.target_names)
print("📋 Classification Report:\\n")
print(report)
`,
},
t9: {
  title: "Feature Scaler & Normalizer",
  description: `
    <h4>📈 Feature Scaler & Normalizer</h4>
    <p>This tool demonstrates the impact of feature scaling using <code>StandardScaler</code> and <code>MinMaxScaler</code> from scikit-learn. It processes the Iris dataset and prints the scaled values to the console.</p>

    <h4>🔍 Key Features:</h4>
    <ul>
      <li>Loads the Iris dataset</li>
      <li>Applies Standard Scaling (Z-score normalization)</li>
      <li>Applies Min-Max Scaling (0 to 1)</li>
      <li>Prints first 5 scaled samples for each method</li>
    </ul>

    <h4>📊 Output:</h4>
    <ul>
      <li>First 5 samples after Standard Scaling</li>
      <li>First 5 samples after Min-Max Scaling</li>
    </ul>

    <h4>🧰 Libraries Used:</h4>
    <ul>
      <li><code>sklearn.datasets</code> – Load dataset</li>
      <li><code>sklearn.preprocessing</code> – Apply scalers</li>
    </ul>

    <h4>⚙️ Requirements:</h4>
    <ul>
      <li>Python 3.x</li>
      <li>scikit-learn</li>
    </ul>

    <h4>💡 Usage:</h4>
    <ul>
      <li>Run the script directly</li>
      <li>Observe how data gets transformed by scalers</li>
    </ul>
  `,
  code: `
from sklearn.datasets import load_iris
from sklearn.preprocessing import StandardScaler, MinMaxScaler

# Load dataset
data = load_iris()
X = data.data

# Apply Standard Scaler
std_scaler = StandardScaler()
X_standard_scaled = std_scaler.fit_transform(X)

# Apply MinMax Scaler
minmax_scaler = MinMaxScaler()
X_minmax_scaled = minmax_scaler.fit_transform(X)

# Display first 5 samples
print("🔹 First 5 samples (Standard Scaled):")
print(X_standard_scaled[:5])
print("\\n🔸 First 5 samples (MinMax Scaled):")
print(X_minmax_scaled[:5])
`,
},
t10: {
  title: "Rule-Based Sentiment Classifier",
  description: `
    This tool uses a simple rule-based approach to detect sentiment (positive, negative, or neutral)
    from a user's input text using basic Python only – no external libraries at all.<br>
    Great for fast, dependency-free emotion checks in feedback tools or quick demos.
    Feel free to customize the rules
  `,
  code: `
# Define basic positive and negative word lists
positive_words = ["happy", "great", "awesome", "fantastic", "good", "love", "excellent"]
negative_words = ["sad", "bad", "terrible", "horrible", "hate", "angry", "poor"]

# User input
text = input("Enter a sentence: ").lower()

# Initialize scores
pos_score = sum(word in text for word in positive_words)
neg_score = sum(word in text for word in negative_words)

# Determine sentiment
if pos_score > neg_score:
    sentiment = "Positive 😊"
elif neg_score > pos_score:
    sentiment = "Negative 😞"
else:
    sentiment = "Neutral 😐"

print(f"Detected Sentiment: {sentiment}")
  `,
},

}