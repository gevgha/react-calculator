import React, { useState, useEffect } from 'react';
import './Calculator.css';
import { evaluate } from 'mathjs';


function Calculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const handleKeyDown = (event) => {
    const key = event.key;

    if (/[\d+\-*/.]/.test(key)) {
      setExpression((prev) => prev + key);
    } else if (key === 'Enter') {
      calculate();
    } else if (key === 'Backspace') {
      setExpression((prev) => prev.slice(0, -1));
    } else if (key === 'Escape') {
      clear();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expression]);

  const handleClick = (value) => {
    setExpression((prev) => prev + value);
  };

  const clear = () => {
    setExpression('');
    setResult('');
  };

  const calculate = () => {
    try {
      const res = evaluate(expression);
      setResult(res);
    } catch {
      setResult('Սխալ');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
      <div className={`calculator ${darkMode ? 'dark' : 'light'}`}>
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>

      <div className="display">
        <div>{expression || '0'}</div>
        <div className="result">{result !== '' ? `= ${result}` : ''}</div>
      </div>

      <div className="buttons">
        {['7', '8', '9', '/'].map((btn) => (
          <button key={btn} onClick={() => handleClick(btn)}>{btn}</button>
        ))}
        {['4', '5', '6', '*'].map((btn) => (
          <button key={btn} onClick={() => handleClick(btn)}>{btn}</button>
        ))}
        {['1', '2', '3', '-'].map((btn) => (
          <button key={btn} onClick={() => handleClick(btn)}>{btn}</button>
        ))}
        {['0', '.', 'C', '+'].map((btn) =>
          btn === 'C' ? (
            <button key={btn} onClick={clear}>{btn}</button>
          ) : (
            <button key={btn} onClick={() => handleClick(btn)}>{btn}</button>
          )
        )}
        <button className="equal" onClick={calculate}>=</button>
      </div>
    </div>
  );
}

export default Calculator;
