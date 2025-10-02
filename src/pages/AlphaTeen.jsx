import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CosmicBackground from '../components/CosmicBackground';
import './AlphaTeen.css';

const AlphaTeen = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(250);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [lastAnswer, setLastAnswer] = useState(null);

  const challenges = [
    {
      id: 1,
      category: '📈 Stocks',
      question: 'A company announces record profits. Should you buy their stock?',
      correctAnswer: true,
      explanation: 'Generally yes! Record profits often lead to stock price increases. However, always research more factors.',
      reward: 50,
    },
    {
      id: 2,
      category: '💳 Credit',
      question: 'Is it smart to only pay the minimum on your credit card?',
      correctAnswer: false,
      explanation: 'No! Paying only minimum means high interest charges. Always pay full balance when possible.',
      reward: 50,
    },
    {
      id: 3,
      category: '🏠 Real Estate',
      question: 'Real estate is always a safe investment that never loses value.',
      correctAnswer: false,
      explanation: 'False! The 2008 housing crisis proved real estate can lose value. Diversification is key.',
      reward: 75,
    },
    {
      id: 4,
      category: '💰 Savings',
      question: 'You should save at least 3-6 months of expenses for emergencies.',
      correctAnswer: true,
      explanation: 'Correct! An emergency fund protects you from unexpected expenses and job loss.',
      reward: 50,
    },
    {
      id: 5,
      category: '📊 Investment',
      question: 'Diversifying your portfolio helps reduce risk.',
      correctAnswer: true,
      explanation: 'Yes! "Don\'t put all eggs in one basket" - spread investments across different assets.',
      reward: 75,
    },
  ];

  const currentChallenge = challenges[currentChallengeIndex];

  const handleSwipe = (answer) => {
    const isCorrect = answer === currentChallenge.correctAnswer;
    setLastAnswer({ correct: isCorrect, answer });
    setShowResult(true);

    if (isCorrect) {
      setPoints(points + currentChallenge.reward);
    }

    setTimeout(() => {
      setShowResult(false);
      setLastAnswer(null);
      if (currentChallengeIndex < challenges.length - 1) {
        setCurrentChallengeIndex(currentChallengeIndex + 1);
      } else {
        setCurrentChallengeIndex(0); // Loop back
      }
    }, 3000);
  };

  return (
    <div className="alpha-teen">
      <CosmicBackground />

      <div className="teen-container">
        <motion.header
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="teen-header"
        >
          <button className="back-button" onClick={() => navigate('/')}>
            ← Back to Cosmos
          </button>
          <h1 className="teen-title">⚡ Alpha Teen Explorer ⚡</h1>
          <div className="points-display">
            <span className="points-label">Power Points:</span>
            <span className="points-value">⭐ {points}</span>
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="teen-content"
        >
          <div className="exploration-section">
            <h2 className="section-title">🎯 Financial Product Challenges</h2>
            <p className="section-subtitle">Swipe Right ✅ for True | Swipe Left ❌ for False</p>

            <div className="challenge-container">
              <AnimatePresence mode="wait">
                {!showResult ? (
                  <motion.div
                    key={currentChallenge.id}
                    initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
                    animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                    exit={{ scale: 0.8, opacity: 0, rotateY: 90 }}
                    transition={{ duration: 0.5 }}
                    className="challenge-card"
                  >
                    <div className="challenge-category">{currentChallenge.category}</div>
                    <h3 className="challenge-question">{currentChallenge.question}</h3>
                    <div className="challenge-reward">Reward: ⭐ {currentChallenge.reward}</div>

                    <div className="swipe-buttons">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="swipe-btn swipe-left"
                        onClick={() => handleSwipe(false)}
                      >
                        <span className="swipe-icon">👈</span>
                        <span>FALSE</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="swipe-btn swipe-right"
                        onClick={() => handleSwipe(true)}
                      >
                        <span>TRUE</span>
                        <span className="swipe-icon">👉</span>
                      </motion.button>
                    </div>

                    <div className="progress-indicator">
                      Challenge {currentChallengeIndex + 1} of {challenges.length}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className={`result-card ${lastAnswer?.correct ? 'correct' : 'incorrect'}`}
                  >
                    <div className="result-icon">
                      {lastAnswer?.correct ? '🎉' : '😅'}
                    </div>
                    <h3 className="result-title">
                      {lastAnswer?.correct ? 'Correct!' : 'Not Quite!'}
                    </h3>
                    <p className="result-explanation">{currentChallenge.explanation}</p>
                    {lastAnswer?.correct && (
                      <div className="points-earned">+{currentChallenge.reward} points!</div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="roadmap-section">
            <h2 className="section-title">🗺️ Exploration Roadmap</h2>
            <div className="roadmap-grid">
              <div className="roadmap-item completed">
                <div className="roadmap-icon">💳</div>
                <div className="roadmap-title">Credit Basics</div>
                <div className="roadmap-status">✅</div>
              </div>
              <div className="roadmap-item completed">
                <div className="roadmap-icon">📈</div>
                <div className="roadmap-title">Stock Market Intro</div>
                <div className="roadmap-status">✅</div>
              </div>
              <div className="roadmap-item active">
                <div className="roadmap-icon">🎯</div>
                <div className="roadmap-title">Smart Investing</div>
                <div className="roadmap-status">🔄</div>
              </div>
              <div className="roadmap-item locked">
                <div className="roadmap-icon">🏦</div>
                <div className="roadmap-title">Banking Products</div>
                <div className="roadmap-status">🔒</div>
              </div>
              <div className="roadmap-item locked">
                <div className="roadmap-icon">💼</div>
                <div className="roadmap-title">Business Finance</div>
                <div className="roadmap-status">🔒</div>
              </div>
              <div className="roadmap-item locked">
                <div className="roadmap-icon">🌐</div>
                <div className="roadmap-title">Global Markets</div>
                <div className="roadmap-status">🔒</div>
              </div>
            </div>
          </div>

          <div className="achievements-section">
            <h2 className="section-title">🏆 Your Achievements</h2>
            <div className="achievements-grid">
              <div className="achievement-badge earned">🥇 Quick Learner</div>
              <div className="achievement-badge earned">💎 Credit Expert</div>
              <div className="achievement-badge earned">📊 Market Observer</div>
              <div className="achievement-badge locked">🔒 Future Badge</div>
              <div className="achievement-badge locked">🔒 Future Badge</div>
              <div className="achievement-badge locked">🔒 Future Badge</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AlphaTeen;
