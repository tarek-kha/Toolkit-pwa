import { useState } from 'react';
import Calculator from './components/Calculator';
import UnitConverter from './components/UnitConverter';
import TextTools from './components/TextTools';
import ColorPicker from './components/ColorPicker';
import QRGenerator from './components/QRGenerator';
import ExpenseTracker from './components/ExpenseTracker';

function App() {
  const [activeTab, setActiveTab] = useState('calculator');

  const tabs = [
    { id: 'calculator', name: 'Calculator', icon: '🔢' },
    { id: 'converter', name: 'Converter', icon: '🔄' },
    { id: 'text', name: 'Text Tools', icon: '📝' },
    { id: 'color', name: 'Color Picker', icon: '🎨' },
    { id: 'qr', name: 'QR Code', icon: '📱' },
    { id: 'expense', name: 'Expenses', icon: '💰' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'calculator':
        return <Calculator />;
      case 'converter':
        return <UnitConverter />;
      case 'text':
        return <TextTools />;
      case 'color':
        return <ColorPicker />;
      case 'qr':
        return <QRGenerator />;
      case 'expense':
        return <ExpenseTracker />;
      default:
        return <Calculator />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🛠️ Toolkit PWA</h1>
          <p className="text-slate-300">Your everyday toolkit in one app</p>
        </header>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
          <div className="flex overflow-x-auto bg-slate-900/50 border-b border-slate-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-fit px-4 py-4 text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-slate-700 text-white border-b-2 border-blue-500'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>

          <div className="p-6">{renderContent()}</div>
        </div>

        <footer className="text-center mt-8 text-slate-400 text-sm">
          <p>Made with ❤️ | Install this app for offline access</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
