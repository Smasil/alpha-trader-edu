import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { createChart } from 'lightweight-charts';
import './AlphaTrader.css';

const AlphaTrader = () => {
  const navigate = useNavigate();
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const [viewMode, setViewMode] = useState('trading'); // 'trading' or 'scenario'

  // Trading state
  const [balance, setBalance] = useState(10000);
  const [positions, setPositions] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState('SPX');
  const [orderType, setOrderType] = useState('market');
  const [orderAmount, setOrderAmount] = useState(100);
  const [currentPrice, setCurrentPrice] = useState(4500.50);
  const [showAlphin, setShowAlphin] = useState(false);
  const [alphinMessage, setAlphinMessage] = useState('');

  // Scenario simulator state
  const [currentScenario, setCurrentScenario] = useState(null);
  const [scenarioActive, setScenarioActive] = useState(false);

  const scenarios = [
    {
      id: 1,
      name: '2008 Financial Crisis',
      icon: '📉',
      description: 'Navigate through the housing market collapse and global financial meltdown.',
      difficulty: 'Hard',
      aiPrompt: 'Simulate 2008 financial crisis market conditions',
    },
    {
      id: 2,
      name: 'Tech Boom 2020',
      icon: '🚀',
      description: 'Ride the wave of pandemic-era tech stock surge.',
      difficulty: 'Medium',
      aiPrompt: 'Simulate 2020 tech stock boom conditions',
    },
    {
      id: 3,
      name: 'Alien Invasion',
      icon: '👽',
      description: 'Unprecedented event: How would markets react to first contact?',
      difficulty: 'Extreme',
      aiPrompt: 'Simulate alien invasion market scenario with extreme volatility',
    },
  ];

  const watchlist = [
    { symbol: 'SPX', name: 'S&P 500', price: 4500.50, change: 1.2 },
    { symbol: 'AAPL', name: 'Apple Inc.', price: 178.32, change: -0.5 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 242.84, change: 2.8 },
    { symbol: 'GOOGL', name: 'Alphabet', price: 138.21, change: 0.9 },
    { symbol: 'MSFT', name: 'Microsoft', price: 378.91, change: 1.5 },
  ];

  useEffect(() => {
    if (chartContainerRef.current && viewMode === 'trading') {
      try {
        // Initialize chart
        const chart = createChart(chartContainerRef.current, {
          width: chartContainerRef.current.clientWidth,
          height: 400,
          layout: {
            background: { color: '#0a0e27' },
            textColor: '#d1d5db',
          },
          grid: {
            vertLines: { color: '#1a1f4f' },
            horzLines: { color: '#1a1f4f' },
          },
          timeScale: {
            borderColor: '#4b5563',
          },
        });

        const lineSeries = chart.addLineSeries({
          color: '#6366f1',
          lineWidth: 2,
        });

        // Generate mock data
        const data = [];
        let basePrice = 4500;
        for (let i = 0; i < 100; i++) {
          const time = Math.floor(Date.now() / 1000) - (100 - i) * 86400;
          basePrice = basePrice + (Math.random() - 0.5) * 50;

          data.push({
            time: time,
            value: basePrice,
          });
        }

        lineSeries.setData(data);
        chart.timeScale().fitContent();
        chartRef.current = chart;

        // Cleanup
        return () => {
          chart.remove();
        };
      } catch (error) {
        console.error('Chart error:', error);
      }
    }
  }, [viewMode]);

  const handleTrade = (side) => {
    if (orderAmount <= 0) {
      showAlphinHelp('Order amount must be greater than zero!');
      return;
    }

    const cost = orderAmount * currentPrice;

    if (side === 'buy') {
      if (cost > balance) {
        showAlphinHelp(`Insufficient funds! You need $${cost.toFixed(2)} but only have $${balance.toFixed(2)}.`);
        return;
      }

      setBalance(balance - cost);
      setPositions([...positions, {
        symbol: selectedSymbol,
        quantity: orderAmount,
        entryPrice: currentPrice,
        side: 'LONG',
        timestamp: new Date().toLocaleString(),
      }]);
      showAlphinHelp(`Great! You bought ${orderAmount} shares of ${selectedSymbol} at $${currentPrice}. Remember to set a stop loss!`);
    } else {
      setBalance(balance + cost);
      showAlphinHelp(`Position closed! You sold ${orderAmount} shares of ${selectedSymbol} at $${currentPrice}.`);
    }
  };

  const showAlphinHelp = (message) => {
    setAlphinMessage(message);
    setShowAlphin(true);
    setTimeout(() => setShowAlphin(false), 5000);
  };

  const startScenario = (scenario) => {
    setCurrentScenario(scenario);
    setScenarioActive(true);
    showAlphinHelp(`Scenario started: ${scenario.name}! AI is generating market conditions...`);
    // In production, this would call the AI API with scenario.aiPrompt
  };

  const exitScenario = () => {
    setScenarioActive(false);
    setCurrentScenario(null);
    setViewMode('trading');
  };

  return (
    <div className="alpha-trader">
      <div className="trader-container">
        <header className="trader-header">
          <button className="back-button-trader" onClick={() => navigate('/')}>
            ← Exit
          </button>
          <h1 className="trader-title">ALPHA TRADER</h1>
          <div className="mode-toggle">
            <button
              className={`mode-btn ${viewMode === 'trading' ? 'active' : ''}`}
              onClick={() => setViewMode('trading')}
            >
              Trading
            </button>
            <button
              className={`mode-btn ${viewMode === 'scenario' ? 'active' : ''}`}
              onClick={() => setViewMode('scenario')}
            >
              Scenarios
            </button>
          </div>
        </header>

        {viewMode === 'trading' && (
          <div className="trading-view">
            <div className="main-panel">
              <div className="chart-section">
                <div className="chart-header">
                  <h2>{selectedSymbol} - Live Chart</h2>
                  <div className="chart-price">
                    ${currentPrice.toFixed(2)}
                    <span className="price-change positive">+1.2%</span>
                  </div>
                </div>
                <div ref={chartContainerRef} className="chart-container"></div>
              </div>

              <div className="order-panel">
                <h3>Order Entry</h3>
                <div className="order-form">
                  <div className="form-group">
                    <label>Symbol</label>
                    <select
                      value={selectedSymbol}
                      onChange={(e) => setSelectedSymbol(e.target.value)}
                      className="trader-input"
                    >
                      {watchlist.map((item) => (
                        <option key={item.symbol} value={item.symbol}>
                          {item.symbol}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Order Type</label>
                    <select
                      value={orderType}
                      onChange={(e) => setOrderType(e.target.value)}
                      className="trader-input"
                    >
                      <option value="market">Market</option>
                      <option value="limit">Limit</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Quantity</label>
                    <input
                      type="number"
                      value={orderAmount}
                      onChange={(e) => setOrderAmount(Number(e.target.value))}
                      className="trader-input"
                      min="1"
                    />
                  </div>

                  <div className="order-buttons">
                    <button className="buy-btn" onClick={() => handleTrade('buy')}>
                      BUY
                    </button>
                    <button className="sell-btn" onClick={() => handleTrade('sell')}>
                      SELL
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="side-panel">
              <div className="account-summary">
                <h3>Account Summary</h3>
                <div className="account-item">
                  <span>Balance:</span>
                  <span className="account-value">${balance.toFixed(2)}</span>
                </div>
                <div className="account-item">
                  <span>Equity:</span>
                  <span className="account-value">${balance.toFixed(2)}</span>
                </div>
                <div className="account-item">
                  <span>P/L:</span>
                  <span className="account-value positive">+$0.00</span>
                </div>
              </div>

              <div className="watchlist">
                <h3>Watchlist - S&P 500</h3>
                <div className="watchlist-items">
                  {watchlist.map((item) => (
                    <div
                      key={item.symbol}
                      className="watchlist-item"
                      onClick={() => {
                        setSelectedSymbol(item.symbol);
                        setCurrentPrice(item.price);
                      }}
                    >
                      <div className="watchlist-symbol">
                        <div className="symbol-name">{item.symbol}</div>
                        <div className="symbol-desc">{item.name}</div>
                      </div>
                      <div className="watchlist-price">
                        <div className="price-value">${item.price}</div>
                        <div className={`price-change ${item.change >= 0 ? 'positive' : 'negative'}`}>
                          {item.change >= 0 ? '+' : ''}{item.change}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="positions">
                <h3>Open Positions</h3>
                {positions.length === 0 ? (
                  <p className="no-positions">No open positions</p>
                ) : (
                  positions.map((pos, idx) => (
                    <div key={idx} className="position-item">
                      <div>{pos.symbol} {pos.side}</div>
                      <div>Qty: {pos.quantity}</div>
                      <div>Entry: ${pos.entryPrice}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {viewMode === 'scenario' && (
          <div className="scenario-view">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="scenario-content"
            >
              <h2 className="scenario-title">⚡ Market Scenario Simulator ⚡</h2>
              <p className="scenario-subtitle">
                Enter different market conditions and test your trading skills!
              </p>

              {!scenarioActive ? (
                <div className="scenarios-grid">
                  {scenarios.map((scenario) => (
                    <motion.div
                      key={scenario.id}
                      className="scenario-card"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => startScenario(scenario)}
                    >
                      <div className="scenario-icon">{scenario.icon}</div>
                      <h3 className="scenario-name">{scenario.name}</h3>
                      <p className="scenario-description">{scenario.description}</p>
                      <div className="scenario-difficulty">
                        Difficulty: <span className="difficulty-badge">{scenario.difficulty}</span>
                      </div>
                      <button className="start-scenario-btn">Enter Scenario</button>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="active-scenario">
                  <div className="scenario-header-active">
                    <h3>{currentScenario.icon} {currentScenario.name}</h3>
                    <button className="exit-scenario-btn" onClick={exitScenario}>
                      Exit Scenario
                    </button>
                  </div>
                  <div className="scenario-simulation">
                    <p className="ai-placeholder">
                      🤖 AI Scenario Simulation Active
                      <br />
                      <br />
                      In the full version, the AI would:
                      <br />
                      • Generate realistic market data for this scenario
                      <br />
                      • Create dynamic news events
                      <br />
                      • Adjust market volatility
                      <br />
                      • Provide real-time guidance
                      <br />
                      • Score your performance
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}

        {/* Alphin AI Guide */}
        {showAlphin && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="alphin-guide"
          >
            <div className="alphin-avatar">🤖</div>
            <div className="alphin-content">
              <h4>Alphin Says:</h4>
              <p>{alphinMessage}</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AlphaTrader;
