import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num) => {
    if (newNumber) {
      setDisplay(String(num));
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const handleOperation = (op) => {
    const currentValue = parseFloat(display);
    
    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }
    
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (prev, current, op) => {
    switch (op) {
      case '+':
        return prev + current;
      case '-':
        return prev - current;
      case '×':
        return prev * current;
      case '÷':
        return prev / current;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const result = calculate(previousValue, parseFloat(display), operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay('0.');
      setNewNumber(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const buttons = [
    ['7', '8', '9', '÷'],
    ['4', '5', '6', '×'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+']
  ];

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-slate-900 rounded-xl p-6 mb-4">
        <div className="text-right text-4xl font-bold text-white mb-2 break-all">
          {display}
        </div>
        {operation && (
          <div className="text-right text-slate-400 text-sm">
            {previousValue} {operation}
          </div>
        )}
      </div>

      <div className="space-y-2 mb-4">
        {buttons.map((row, i) => (
          <div key={i} className="grid grid-cols-4 gap-2">
            {row.map((btn) => (
              <button
                key={btn}
                onClick={() => {
                  if (btn === '=') handleEquals();
                  else if (btn === '.') handleDecimal();
                  else if (['+', '-', '×', '÷'].includes(btn)) handleOperation(btn);
                  else handleNumber(btn);
                }}
                className={`p-4 rounded-lg text-xl font-semibold transition-all ${
                  btn === '='
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : ['+', '-', '×', '÷'].includes(btn)
                    ? 'bg-slate-700 hover:bg-slate-600 text-blue-400'
                    : 'bg-slate-700 hover:bg-slate-600 text-white'
                }`}
              >
                {btn}
              </button>
            ))}
          </div>
        ))}
      </div>

      <button
        onClick={handleClear}
        className="w-full p-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all"
      >
        Clear
      </button>
    </div>
  );
                 }
