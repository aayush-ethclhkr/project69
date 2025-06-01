const questions = {
    intro:{
    title:"Introduction",
    description:`<div id="intro" class="content-section">
  <h1 style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #2c3e50;">
    Welcome to Data Visualization with Python 🎨🐍
  </h1>

  <p style="font-size: 1.1rem; line-height: 1.6; color: #34495e;">
    In a world drowning in data, the true hero is *clarity*.  
    With the power of Python and the magic of <code>matplotlib</code> and <code>pandas</code>,  
    we transform numbers into stories, tables into tales, and raw digits into delightful visuals.
  </p>

  <p style="font-size: 1rem; color: #2c3e50;">
    This interactive guide will take you on a colorful journey through the foundational plots in data visualization:
  </p>

  <ul style="list-style: none; padding-left: 0; font-size: 1rem; color: #34495e;">
    <li>📈 Line Charts – for spotting trends through time</li>
    <li>📊 Bar & Stacked Charts – to compare quantities with flair</li>
    <li>📉 Histograms & Box Plots – to explore distributions and outliers</li>
    <li>🧬 Scatter Plots – revealing relationships and correlations</li>
    <li>🥧 Pie & Donut Charts – visualizing parts of a whole in vibrant slices</li>
    <li>🏞️ Area Charts – layering your story over time</li>
    <li>📐 Horizontal Bars – turning comparisons sideways</li>
  </ul>

  

  <p style="font-size: 1.2rem; font-weight: bold; color: #27ae60;">
    Ready to visualize the invisible? Let's begin! 🚀
  </p>
</div>
`,
    code:``,
    },
   t1: {
    title: "Line Chart",
    description: `A line chart is used to visualize data points connected by straight lines. It's perfect for tracking changes over time, such as monthly sales or daily temperatures. This type of chart is excellent for identifying trends, patterns, and fluctuations in data.`,
    code: `
import pandas as pd
import matplotlib.pyplot as plt

# Sample Data
data = {'Month': ['January', 'February', 'March', 'April', 'May'],
        'Sales': [200, 250, 300, 350, 400]}
df = pd.DataFrame(data)

# Line Chart
plt.plot(df['Month'], df['Sales'], marker='o', color='blue', label='Sales')
plt.title('Monthly Sales Trend')  # Chart Title
plt.xlabel('Month')               # X-axis label
plt.ylabel('Sales')               # Y-axis label
plt.grid(True)                    # Add grid for clarity
plt.legend()                      # Show legend
plt.show()                        # Display the chart`
},

t2: {
    title: "Bar Chart",
    description: `Bar charts are best used for comparing quantities of different categories. Each bar represents a category, and its height reflects the value. Great for showing comparisons like product sales, user counts, etc.`,
    code: `
import pandas as pd
import matplotlib.pyplot as plt

# Sample Data
data = {'Product': ['Product A', 'Product B', 'Product C'],
        'Sales': [500, 300, 400]}
df = pd.DataFrame(data)

# Bar Chart
plt.bar(df['Product'], df['Sales'], color='green')
plt.title('Sales by Product')  # Chart Title
plt.xlabel('Product')          # X-axis label
plt.ylabel('Sales')            # Y-axis label
plt.show()                     # Display the chart`
},

t3: {
    title: "Histogram",
    description: `A histogram is used to show the distribution of a dataset. It groups values into bins and shows how many data points fall into each bin. Perfect for analyzing frequency of scores, ages, or other continuous data.`,
    code: `
import matplotlib.pyplot as plt

# Sample Data
scores = [55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 60, 70, 85, 90, 95]

# Histogram
plt.hist(scores, bins=5, color='orange', edgecolor='black')
plt.title('Distribution of Exam Scores')  # Chart Title
plt.xlabel('Score Ranges')                # X-axis label
plt.ylabel('Frequency')                   # Y-axis label
plt.show()                                # Display the histogram`
},

t4: {
    title: "Box Plot",
    description: `Box plots (or box-and-whisker plots) are used to display the distribution of a dataset. They show median, quartiles, and potential outliers, making them great for comparing statistical ranges of different groups.`,
    code: `
import pandas as pd
import matplotlib.pyplot as plt

# Sample Data
data = {'Math': [78, 85, 90, 88, 76, 80],
        'Science': [82, 84, 88, 90, 78, 85]}
df = pd.DataFrame(data)

# Box Plot
plt.boxplot([df['Math'], df['Science']], labels=['Math', 'Science'])
plt.title('Exam Scores Box Plot')  # Chart Title
plt.ylabel('Scores')               # Y-axis label
plt.show()                         # Display the box plot`
},

t5: {
    title: "Scatter Plot",
    description: `Scatter plots show the relationship between two numerical variables. Each point represents an observation. This is especially useful for identifying correlations or patterns in datasets, like age vs income.`,
    code: `
import pandas as pd
import matplotlib.pyplot as plt

# Sample Data
data = {'Age': [25, 30, 35, 40, 45, 50],
        'Income': [3000, 3500, 4000, 4500, 5000, 5500]}
df = pd.DataFrame(data)

# Scatter Plot
plt.scatter(df['Age'], df['Income'], color='purple')
plt.title('Age vs Income')  # Chart Title
plt.xlabel('Age')           # X-axis label
plt.ylabel('Income')        # Y-axis label
plt.show()                  # Display the scatter plot`
},

t6: {
    title: "Pie Chart",
    description: `Pie charts show proportions of a whole as slices of a circle. Each slice represents a category’s contribution to the total. Useful for showing budget breakdowns, expense shares, or percentage splits.`,
    code: `
import matplotlib.pyplot as plt

# Data
categories = ['Rent', 'Groceries', 'Utilities', 'Transport', 'Entertainment', 'Savings']
expenses = [12000, 4000, 2000, 1500, 3000, 5000]

# Pie chart
plt.figure(figsize=(8, 8))
plt.pie(expenses, labels=categories, autopct='%1.1f%%', startangle=140, shadow=True)
plt.title('Monthly Expense Distribution', fontsize=16)
plt.axis('equal')  # Ensures pie is a perfect circle
plt.show()`
},

t7: {
    title: "Area Chart",
    description: `Area charts are like line charts but the area under the line is filled with color. They are good for visualizing cumulative data like total revenue or stacked values across time.`,
    code: `
import pandas as pd
import matplotlib.pyplot as plt

# Sample Data
data = {'Month': ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        'Revenue': [1000, 1500, 2000, 2500, 3000]}
df = pd.DataFrame(data)

# Area Chart
plt.fill_between(df['Month'], df['Revenue'], color='skyblue', alpha=0.4)
plt.plot(df['Month'], df['Revenue'], color='blue', marker='o')
plt.title('Monthly Revenue Growth')
plt.xlabel('Month')
plt.ylabel('Revenue')
plt.grid(True)
plt.show()`
},

t8: {
    title: "Stacked Bar Chart",
    description: `A stacked bar chart shows multiple categories within each bar, stacked one on top of the other. It helps in visualizing part-to-whole relationships across categories.`,
    code: `
import pandas as pd
import matplotlib.pyplot as plt

# Sample Data
data = {'Quarter': ['Q1', 'Q2', 'Q3', 'Q4'],
        'Product A': [100, 150, 200, 250],
        'Product B': [80, 120, 160, 200]}
df = pd.DataFrame(data)

# Stacked Bar Chart
plt.bar(df['Quarter'], df['Product A'], label='Product A', color='lightcoral')
plt.bar(df['Quarter'], df['Product B'], bottom=df['Product A'], label='Product B', color='lightskyblue')
plt.title('Quarterly Sales by Product')
plt.xlabel('Quarter')
plt.ylabel('Sales')
plt.legend()
plt.show()`
},

t9: {
    title: "Horizontal Bar Chart",
    description: `Horizontal bar charts flip the bars horizontally. They’re useful when category labels are long or when comparing many categories side-by-side.`,
    code: `
import pandas as pd
import matplotlib.pyplot as plt

# Sample Data
data = {'Department': ['HR', 'IT', 'Sales', 'Finance'],
        'Employees': [10, 25, 30, 15]}
df = pd.DataFrame(data)

# Horizontal Bar Chart
plt.barh(df['Department'], df['Employees'], color='mediumseagreen')
plt.title('Employees per Department')
plt.xlabel('Number of Employees')
plt.ylabel('Department')
plt.show()`
},

t10 :{
    title: "Donut Chart",
    description: `A donut chart is a variation of the pie chart with a blank center. It serves the same purpose as a pie chart but offers better readability and space for adding labels or icons in the middle.`,
    code: `
import matplotlib.pyplot as plt

# Data
labels = ['Python', 'JavaScript', 'Java', 'C++']
sizes = [40, 25, 20, 15]

# Donut Chart
plt.pie(sizes, labels=labels, autopct='%1.1f%%', startangle=90, wedgeprops={'width':0.4})
plt.title('Programming Language Popularity')
plt.axis('equal')  # Keeps it circular
plt.show()`
}
}