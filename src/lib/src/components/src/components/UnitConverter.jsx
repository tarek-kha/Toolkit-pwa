import { useState } from 'react';

export default function UnitConverter() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('km');
  const [category, setCategory] = useState('length');

  const conversions = {
    length: {
      units: { m: 'Meters', km: 'Kilometers', cm: 'Centimeters', ft: 'Feet', in: 'Inches' },
      toBase: { m: 1, km: 1000, cm: 0.01, ft: 0.3048, in: 0.0254 }
    },
    weight: {
      units: { kg: 'Kilograms', g: 'Grams', lb: 'Pounds', oz: 'Ounces' },
      toBase: { kg: 1, g: 0.001, lb: 0.453592, oz: 0.0283495 }
    },
    temperature: {
      units: { c: 'Celsius', f: 'Fahrenheit', k: 'Kelvin' },
      convert: (val, from, to) => {
        let celsius = from === 'c' ? val : from === 'f' ? (val - 32) * 5/9 : val - 273.15;
        return to === 'c' ? celsius : to === 'f' ? celsius * 9/5 + 32 : celsius + 273.15;
      }
    }
  };

  const convert = () => {
    const val = parseFloat(value);
    if (isNaN(val)) return '';

    if (category === 'temperature') {
      return conversions.temperature.convert(val, fromUnit, toUnit).toFixed(2);
    }

    const baseValue = val * conversions[category].toBase[fromUnit];
    return (baseValue / conversions[category].toBase[toUnit]).toFixed(4);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    const units = Object.keys(conversions[newCategory].units);
    setFromUnit(units[0]);
    setToUnit(units[1]);
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="flex gap-2">
        {['length', 'weight', 'temperature'].map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all capitalize ${
              category === cat
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="bg-slate-900 rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-slate-300 mb-2">From:</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter value"
              className="flex-1 bg-slate-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="bg-slate-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(conversions[category].units).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-center text-slate-400 text-2xl">⬇️</div>

        <div>
          <label className="block text-slate-300 mb-2">To:</label>
          <div className="flex gap-2">
            <div className="flex-1 bg-slate-800 text-white px-4 py-3 rounded-lg font-mono text-lg">
              {value ? convert() : '0'}
            </div>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="bg-slate-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(conversions[category].units).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
