import React, { useState, useEffect } from "react";
import { evaluate, pi } from "mathjs";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [memory, setMemory] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [angleMode, setAngleMode] = useState("DEG"); // DEG or RAD
  const [prevResult, setPrevResult] = useState("");

  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("calcHistory");
    const savedMemory = localStorage.getItem("calcMemory");
    const savedMode = localStorage.getItem("calcDarkMode");
    
    if (savedHistory) setHistory(JSON.parse(savedHistory));
    if (savedMemory) setMemory(parseFloat(savedMemory));
    if (savedMode) setIsDarkMode(savedMode === "true");
  }, []);

  // Save to localStorage when relevant states change
  useEffect(() => {
    localStorage.setItem("calcHistory", JSON.stringify(history.slice(-10)));
    localStorage.setItem("calcMemory", memory.toString());
    localStorage.setItem("calcDarkMode", isDarkMode.toString());
  }, [history, memory, isDarkMode]);

  const handleClick = (value) => {
    if (input === "Error" || input === "Infinity") {
      setInput(value);
    } else {
      setInput((prev) => prev + value);
    }
  };

  const calculate = () => {
    try {
      let expression = input;
      
      // Handle angle mode conversion for trig functions
      if (angleMode === "DEG") {
        expression = expression
          .replace(/sin\(/g, "sin(" + Math.PI / 180 + "*")
          .replace(/cos\(/g, "cos(" + Math.PI / 180 + "*")
          .replace(/tan\(/g, "tan(" + Math.PI / 180 + "*")
          .replace(/asin\(/g, "asin(") + ")*" + (180 / Math.PI)
          .replace(/acos\(/g, "acos(") + ")*" + (180 / Math.PI)
          .replace(/atan\(/g, "atan(") + ")*" + (180 / Math.PI);
      }

      // Replace symbols with mathjs equivalents
      expression = expression
        .replace(/√/g, "sqrt")
        .replace(/π/g, "pi")
        .replace(/÷/g, "/")
        .replace(/×/g, "*")
        .replace(/−/g, "-")
        .replace(/e/g, Math.E.toString())
        .replace(/²/g, "^2")
        .replace(/³/g, "^3");

      const result = evaluate(expression);
      const formattedResult = parseFloat(result.toFixed(10));
      
      setPrevResult(input);
      setInput(formattedResult.toString());
      
      // Add to history
      setHistory(prev => [...prev, { 
        expression: input, 
        result: formattedResult,
        timestamp: new Date().toLocaleTimeString() 
      }]);
    } catch (error) {
      setInput("Error");
    }
  };

  const clear = () => setInput("");
  const del = () => setInput((prev) => prev.slice(0, -1));
  const clearAll = () => {
    setInput("");
    setHistory([]);
  };

  // Memory functions
  const memoryClear = () => setMemory(0);
  const memoryRecall = () => handleClick(memory.toString());
  const memoryAdd = () => {
    try {
      const current = evaluate(input) || 0;
      setMemory(prev => prev + current);
    } catch (error) {
      // If input can't be evaluated, do nothing
    }
  };
  const memorySubtract = () => {
    try {
      const current = evaluate(input) || 0;
      setMemory(prev => prev - current);
    } catch (error) {
      // If input can't be evaluated, do nothing
    }
  };
  const memoryStore = () => {
    try {
      const current = evaluate(input) || 0;
      setMemory(current);
    } catch (error) {
      // If input can't be evaluated, do nothing
    }
  };

  // Special functions
  const handleSquare = () => {
    try {
      const result = evaluate(input) ** 2;
      setInput(result.toString());
    } catch (error) {
      handleClick("^2");
    }
  };

  const handleSquareRoot = () => {
    try {
      const result = Math.sqrt(evaluate(input));
      setInput(result.toString());
    } catch (error) {
      handleClick("√(");
    }
  };

  const handleInverse = () => {
    try {
      const result = 1 / evaluate(input);
      setInput(result.toString());
    } catch (error) {
      handleClick("1/");
    }
  };

  const handlePercentage = () => {
    try {
      const result = evaluate(input) / 100;
      setInput(result.toString());
    } catch (error) {
      handleClick("/100");
    }
  };

  const handleFactorial = () => {
    try {
      let num = Math.floor(evaluate(input));
      if (num < 0) throw new Error("Negative factorial");
      let result = 1;
      for (let i = 2; i <= num; i++) result *= i;
      setInput(result.toString());
    } catch (error) {
      handleClick("!");
    }
  };

  const handleExponential = () => handleClick(Math.E.toString() + "^");
  const handleLog10 = () => handleClick("log10(");
  const handleLogBase = () => handleClick("log(");

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;
      
      if (key >= '0' && key <= '9') handleClick(key);
      else if (key === '.') handleClick('.');
      else if (key === '+') handleClick('+');
      else if (key === '-') handleClick('−');
      else if (key === '*') handleClick('×');
      else if (key === '/') {
        e.preventDefault();
        handleClick('÷');
      }
      else if (key === 'Enter' || key === '=') calculate();
      else if (key === 'Escape') clear();
      else if (key === 'Backspace') del();
      else if (key === '(') handleClick('(');
      else if (key === ')') handleClick(')');
      else if (key === '^') handleClick('^');
      else if (key === 'p' && e.ctrlKey) {
        e.preventDefault();
        handleClick('π');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input]);

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="calculator-container">
        <div className="header">
          <h1>Scientific Calculator</h1>
          <div className="controls">
            <button 
              className="mode-toggle"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <button 
              className="angle-toggle"
              onClick={() => setAngleMode(angleMode === "DEG" ? "RAD" : "DEG")}
            >
              {angleMode}
            </button>
          </div>
        </div>

        <div className="display-container">
          <div className="previous-expression">
            {prevResult && <span>{prevResult} =</span>}
          </div>
          <div className="display">{input || "0"}</div>
          <div className="memory-indicator">
            {memory !== 0 && `M: ${memory}`}
          </div>
        </div>

        {history.length > 0 && (
          <div className="history-panel">
            <h3>History</h3>
            <div className="history-list">
              {history.slice().reverse().map((item, index) => (
                <div key={index} className="history-item">
                  <div className="history-expression">{item.expression}</div>
                  <div className="history-result">= {item.result}</div>
                  <div className="history-time">{item.timestamp}</div>
                </div>
              ))}
            </div>
            <button className="clear-history" onClick={() => setHistory([])}>
              Clear History
            </button>
          </div>
        )}

        <div className="buttons-grid">
          <div className="row">
            <button className="btn-function" onClick={clearAll}>AC</button>
            <button className="btn-function" onClick={clear}>C</button>
            <button className="btn-function" onClick={del}>⌫</button>
            <button className="btn-function" onClick={memoryClear}>MC</button>
            <button className="btn-function" onClick={memoryRecall}>MR</button>
            <button className="btn-function" onClick={memoryAdd}>M+</button>
            <button className="btn-function" onClick={memorySubtract}>M-</button>
            <button className="btn-function" onClick={memoryStore}>MS</button>
          </div>

          <div className="row">
            <button className="btn-operator" onClick={() => handleClick("(")}>(</button>
            <button className="btn-operator" onClick={() => handleClick(")")}>)</button>
            <button className="btn-operator" onClick={handlePercentage}>%</button>
            <button className="btn-operator" onClick={handleInverse}>1/x</button>
            <button className="btn-operator" onClick={handleSquare}>x²</button>
            <button className="btn-operator" onClick={handleSquareRoot}>√x</button>
            <button className="btn-operator" onClick={handleFactorial}>x!</button>
            <button className="btn-operator" onClick={() => handleClick("^")}>x^y</button>
          </div>

          <div className="row">
            <button className="btn-scientific" onClick={() => handleClick("sin(")}>sin</button>
            <button className="btn-scientific" onClick={() => handleClick("cos(")}>cos</button>
            <button className="btn-scientific" onClick={() => handleClick("tan(")}>tan</button>
            <button className="btn-scientific" onClick={() => handleClick("asin(")}>sin⁻¹</button>
            <button className="btn-scientific" onClick={() => handleClick("acos(")}>cos⁻¹</button>
            <button className="btn-scientific" onClick={() => handleClick("atan(")}>tan⁻¹</button>
            <button className="btn-scientific" onClick={handleLog10}>log₁₀</button>
            <button className="btn-scientific" onClick={handleLogBase}>logₓ</button>
          </div>

          <div className="row">
            <button className="btn-scientific" onClick={() => handleClick(Math.PI.toString())}>π</button>
            <button className="btn-scientific" onClick={handleExponential}>eˣ</button>
            <button className="btn-scientific" onClick={() => handleClick("ln(")}>ln</button>
            <button className="btn-scientific" onClick={() => handleClick("abs(")}>|x|</button>
            <button className="btn-number" onClick={() => handleClick("7")}>7</button>
            <button className="btn-number" onClick={() => handleClick("8")}>8</button>
            <button className="btn-number" onClick={() => handleClick("9")}>9</button>
            <button className="btn-operator" onClick={() => handleClick("÷")}>÷</button>
          </div>

          <div className="row">
            <button className="btn-scientific" onClick={() => handleClick(Math.E.toString())}>e</button>
            <button className="btn-scientific" onClick={() => handleClick("10^")}>10ˣ</button>
            <button className="btn-scientific" onClick={() => handleClick("2^")}>2ˣ</button>
            <button className="btn-scientific" onClick={() => handleClick("√(")}>√</button>
            <button className="btn-number" onClick={() => handleClick("4")}>4</button>
            <button className="btn-number" onClick={() => handleClick("5")}>5</button>
            <button className="btn-number" onClick={() => handleClick("6")}>6</button>
            <button className="btn-operator" onClick={() => handleClick("×")}>×</button>
          </div>

          <div className="row">
            <button className="btn-scientific" onClick={() => handleClick("(-)")}>±</button>
            <button className="btn-scientific" onClick={() => handleClick("³√(")}>∛</button>
            <button className="btn-scientific" onClick={() => handleClick("³")}>x³</button>
            <button className="btn-scientific" onClick={() => handleClick("°")}>°</button>
            <button className="btn-number" onClick={() => handleClick("1")}>1</button>
            <button className="btn-number" onClick={() => handleClick("2")}>2</button>
            <button className="btn-number" onClick={() => handleClick("3")}>3</button>
            <button className="btn-operator" onClick={() => handleClick("−")}>−</button>
          </div>

          <div className="row">
            <button className="btn-number" onClick={() => handleClick(".")}>.</button>
            <button className="btn-number" onClick={() => handleClick("0")}>0</button>
            <button className="btn-number" onClick={() => handleClick("00")}>00</button>
            <button className="btn-number" onClick={() => handleClick("000")}>000</button>
            <button className="btn-operator" onClick={() => handleClick("+")}>+</button>
            <button className="btn-equals" onClick={calculate}>=</button>
          </div>
        </div>

        <div className="keyboard-hint">
          <small>Keyboard support enabled: Use number keys, +, -, *, /, Enter, Esc, Backspace</small>
        </div>
      </div>
    </div>
  );
}

export default App;