# Scientific Calculator React

A feature-rich, modern scientific calculator built with React and Math.js. This calculator combines the functionality of a traditional scientific calculator with modern UI/UX principles and advanced features.

![Calculator Demo](https://img.shields.io/badge/demo-live-brightgreen) ![React](https://img.shields.io/badge/React-18.2-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### **🎨 Modern UI/UX**
- **Dark/Light Mode Toggle** - Switch between themes with a single click
- **Glass-morphism Design** - Modern frosted glass effect
- **Responsive Layout** - Works perfectly on desktop, tablet, and mobile
- **Smooth Animations** - Hover effects and transitions
- **Intuitive Button Grouping** - Color-coded buttons by function type

### **🧮 Advanced Mathematical Functions**
- **Basic Operations**: Addition, Subtraction, Multiplication, Division
- **Scientific Functions**:
  - Trigonometric: sin, cos, tan, sin⁻¹, cos⁻¹, tan⁻¹
  - Logarithmic: log₁₀, ln, logₓ (custom base)
  - Exponential: eˣ, 10ˣ, 2ˣ, xʸ
  - Roots: Square (√), Cube (∛)
  - Powers: Square (x²), Cube (x³), Any power (x^y)
  - Factorial: x!
  - Percentage: %
  - Inverse: 1/x
  - Absolute Value: |x|
  - Sign Change: ±

### **💾 Memory Functions**
- **MC** - Memory Clear
- **MR** - Memory Recall
- **M+** - Memory Add
- **M-** - Memory Subtract
- **MS** - Memory Store
- Memory value indicator

### **📊 History System**
- Complete calculation history with timestamps
- Persistent storage using localStorage
- Clear history button
- Previous expression display

### **🔄 Angle Mode Support**
- Toggle between **Degrees (DEG)** and **Radians (RAD)**
- Automatic conversion for trigonometric functions

### **⌨️ Keyboard Support**
- Full keyboard navigation
- **Enter** = Calculate
- **Escape** = Clear All
- **Backspace** = Delete last character
- **Number keys** = Input numbers
- **Operators**: +, -, *, /, ^
- **Special keys**: ( ) . π

### **⚡ Performance Features**
- Efficient state management
- Memoized calculations
- Debounced inputs
- Optimized rendering

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/scientific-calculator-react.git
cd scientific-calculator-react
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Start the development server**
```bash
npm start
# or
yarn start
```

4. **Open in browser**
Navigate to `http://localhost:3000`

### Build for Production
```bash
npm run build
# or
yarn build
```

## 🛠️ Technologies Used

- **React 18** - UI library
- **Math.js** - Advanced mathematical computations
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **LocalStorage API** - Data persistence
- **ES6+** - Modern JavaScript features

## 📁 Project Structure

```
scientific-calculator-react/
├── src/
│   ├── App.js           # Main calculator component
│   ├── App.css          # Styles
│   ├── index.js         # Entry point
│   └── index.css        # Global styles
├── public/
│   └── index.html       # HTML template
├── package.json         # Dependencies
└── README.md           # This file
```

## 🎯 How to Use

### Basic Operations
1. Click numbers or use keyboard to input
2. Click operators (+, -, ×, ÷)
3. Press `=` or `Enter` to calculate

### Scientific Functions
1. Click scientific function buttons (sin, cos, log, etc.)
2. Enter the value in parentheses
3. Calculate as normal

### Memory Functions
1. **Store a value**: Calculate a result → Click **MS**
2. **Recall memory**: Click **MR**
3. **Add to memory**: Calculate a result → Click **M+**
4. **Subtract from memory**: Calculate a result → Click **M-**
5. **Clear memory**: Click **MC**

### History Features
- Previous calculations appear in the history panel
- Click on history items to reuse them
- Use **Clear History** to remove all history

### Theme Switching
- Click the sun/moon icon to toggle between dark and light modes

### Angle Mode
- Click the **DEG/RAD** button to switch angle modes
- The calculator automatically converts trigonometric values

## 🔧 Key Code Features

### Mathematical Evaluation
```javascript
const calculate = () => {
  try {
    let expression = input;
    // Handle angle mode conversion
    if (angleMode === "DEG") {
      expression = expression.replace(/sin\(/g, "sin(" + Math.PI / 180 + "*");
    }
    // Evaluate using math.js
    const result = evaluate(expression);
    setInput(result.toString());
  } catch (error) {
    setInput("Error");
  }
};
```

### Keyboard Support
```javascript
useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key >= '0' && e.key <= '9') handleClick(e.key);
    else if (e.key === 'Enter') calculate();
    // ... more key mappings
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [input]);
```

### Data Persistence
```javascript
useEffect(() => {
  const savedHistory = localStorage.getItem("calcHistory");
  if (savedHistory) setHistory(JSON.parse(savedHistory));
}, []);

useEffect(() => {
  localStorage.setItem("calcHistory", JSON.stringify(history.slice(-10)));
}, [history]);
```

## 📱 Responsive Design

The calculator is fully responsive:
- **Desktop**: Full 8-column layout
- **Tablet**: Optimized spacing
- **Mobile**: 4-column layout with touch-friendly buttons

## 🎨 Customization

### Modify Themes
Edit the CSS variables in `App.css` to customize colors:

```css
.dark-mode {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: #e6e6e6;
}

.light-mode {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  color: #333;
}
```

### Add New Functions
To add new mathematical functions:

1. Add a new button in the JSX:
```jsx
<button onClick={() => handleClick("newFunction(")}>New Func</button>
```

2. Ensure Math.js supports the function or implement custom logic

## 🧪 Testing

Run tests with:
```bash
npm test
# or
yarn test
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Math.js](https://mathjs.org/) for mathematical computation
- [React](https://reactjs.org/) for the UI framework
- Inspired by traditional scientific calculators and modern web design principles

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, email gaurinandanapai@gmail.com or create an issue in the GitHub repository.

---
