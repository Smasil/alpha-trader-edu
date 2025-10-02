import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CosmicBackground from '../components/CosmicBackground';
import './AlphaJunior.css';

const AlphaJunior = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(150);
  const [completedMissions, setCompletedMissions] = useState([0, 1]);

  const missions = [
    { id: 0, title: 'What is Money?', icon: '💰', reward: 50, completed: true },
    { id: 1, title: 'Saving & Spending', icon: '🏦', reward: 50, completed: true },
    { id: 2, title: 'Earning Money', icon: '💼', reward: 75, completed: false },
    { id: 3, title: 'Banks & Accounts', icon: '🏛️', reward: 75, completed: false },
    { id: 4, title: 'Wants vs Needs', icon: '🎯', reward: 100, completed: false },
    { id: 5, title: 'Making Smart Choices', icon: '🧠', reward: 100, completed: false },
    { id: 6, title: 'Money Around World', icon: '🌍', reward: 125, completed: false },
    { id: 7, title: 'Future Planning', icon: '🚀', reward: 150, completed: false },
  ];

  const handleMissionClick = (mission) => {
    if (mission.completed) {
      alert(`You already completed this mission! Earned ${mission.reward} star points! ⭐`);
    } else if (completedMissions.includes(mission.id - 1) || mission.id === 0) {
      // Can only do missions in order
      alert(`Mission unlocked! In full version, you'd learn about: ${mission.title}`);
      setCompletedMissions([...completedMissions, mission.id]);
      setPoints(points + mission.reward);
    } else {
      alert('Complete previous missions first! 🔒');
    }
  };

  return (
    <div className="alpha-junior">
      <CosmicBackground />

      <div className="junior-container">
        <motion.header
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="junior-header"
        >
          <button className="back-button" onClick={() => navigate('/')}>
            ← Back to Cosmos
          </button>
          <h1 className="junior-title">🌈 Alpha Junior Universe! 🚀</h1>
          <div className="points-display">
            <span className="points-label">Star Points:</span>
            <span className="points-value">⭐ {points}</span>
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="junior-content"
        >
          <div className="welcome-card">
            <h2>🎉 Welcome, Young Explorer! 🎉</h2>
            <p>Follow the roadmap and complete missions to collect star points!</p>
            <div className="mascot">🦸‍♂️</div>
          </div>

          <div className="roadmap-section">
            <h2 className="section-title">🗺️ Your Learning Journey</h2>
            <div className="roadmap">
              {missions.map((mission, index) => {
                const isLocked = !completedMissions.includes(mission.id - 1) && mission.id !== 0 && !mission.completed;
                const isCompleted = completedMissions.includes(mission.id);

                return (
                  <motion.div
                    key={mission.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`mission-node ${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : ''}`}
                    onClick={() => handleMissionClick(mission)}
                    whileHover={{ scale: isLocked ? 1 : 1.1 }}
                    whileTap={{ scale: isLocked ? 1 : 0.95 }}
                  >
                    <div className="mission-icon">{mission.icon}</div>
                    <h3 className="mission-title">{mission.title}</h3>
                    <div className="mission-reward">
                      {isLocked ? '🔒' : `⭐ ${mission.reward}`}
                    </div>
                    {isCompleted && <div className="completed-badge">✅</div>}
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="prizes-section">
            <h2 className="section-title">🏆 Your Collected Prizes</h2>
            <div className="prizes-grid">
              <div className="prize-item">🥇 Money Master Badge</div>
              <div className="prize-item">🌟 Savings Star</div>
              <div className="prize-item">🎖️ Smart Spender</div>
              <div className="prize-item locked-prize">🔒 Future Prize</div>
              <div className="prize-item locked-prize">🔒 Future Prize</div>
              <div className="prize-item locked-prize">🔒 Future Prize</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AlphaJunior;
