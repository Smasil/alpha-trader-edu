import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AlphaTrader.css';

const AlphaTrader = () => {
  const navigate = useNavigate();
  const [balance] = useState(10000);

  return (
    <div className="alpha-trader">
      <div className="trader-container">
        <header className="trader-header">
          <button className="back-button-trader" onClick={() => navigate('/')}>
            ← Exit
          </button>
          <h1 className="trader-title">ALPHIN TRADER</h1>
        </header>

        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '20px' }}>Welcome to Alphin Trader</h2>
          <p style={{ marginBottom: '20px' }}>Account Balance: ${balance.toFixed(2)}</p>
          <p>Trading simulator loading...</p>
        </div>
      </div>
    </div>
  );
};

export default AlphaTrader;
