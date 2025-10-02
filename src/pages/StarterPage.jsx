import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CosmicBackground from '../components/CosmicBackground';
import './StarterPage.css';

const StarterPage = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [showParentForm, setShowParentForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAuth = (e, type) => {
    e.preventDefault();
    console.log('Auth attempt:', { type, email });

    if (type === 'parent') {
      alert('Parent Hub - Coming Soon!');
    }

    // Close forms after submission
    setShowLoginForm(false);
    setShowSignupForm(false);
    setShowParentForm(false);
  };

  const handleAgeSelect = (path) => {
    navigate(path);
  };

  return (
    <div className="starter-page">
      <CosmicBackground />

      {/* Top Navigation Bar */}
      <nav className="top-nav">
        {/* Parent Hub - Top Left */}
        <div className="nav-left">
          <button
            className="parent-hub-btn clay-btn"
            onClick={() => {
              setShowParentForm(!showParentForm);
              setShowLoginForm(false);
              setShowSignupForm(false);
            }}
          >
            👪 Parent Hub
          </button>
        </div>

        {/* Logo - Center */}
        <div className="nav-center">
          <div className="logo-container">
            <div className="alpha-logo">α</div>
            <span className="app-name">ALPHIN</span>
          </div>
        </div>

        {/* Login/Signup - Top Right */}
        <div className="nav-right">
          <button
            className="login-btn-nav clay-btn"
            onClick={() => {
              setShowLoginForm(!showLoginForm);
              setShowSignupForm(false);
              setShowParentForm(false);
            }}
          >
            Login
          </button>
          <button
            className="signup-btn-nav clay-btn"
            onClick={() => {
              setShowSignupForm(!showSignupForm);
              setShowLoginForm(false);
              setShowParentForm(false);
            }}
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Login Form Dropdown */}
      {showLoginForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="auth-dropdown login-dropdown"
        >
          <h3>Welcome Back!</h3>
          <form onSubmit={(e) => handleAuth(e, 'login')}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="auth-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-input"
            />
            <button type="submit" className="auth-submit clay-btn">
              Launch!
            </button>
          </form>
        </motion.div>
      )}

      {/* Signup Form Dropdown */}
      {showSignupForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="auth-dropdown signup-dropdown"
        >
          <h3>Join Alphin!</h3>
          <form onSubmit={(e) => handleAuth(e, 'signup')}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="auth-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-input"
            />
            <button type="submit" className="auth-submit clay-btn">
              Start Journey!
            </button>
          </form>
        </motion.div>
      )}

      {/* Parent Hub Form Dropdown */}
      {showParentForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="auth-dropdown parent-dropdown"
        >
          <h3>Parent Hub Login</h3>
          <form onSubmit={(e) => handleAuth(e, 'parent')}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="auth-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-input"
            />
            <button type="submit" className="auth-submit clay-btn">
              Access Hub
            </button>
          </form>
        </motion.div>
      )}

      {/* Main Content - Age Selection */}
      <div className="main-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="tagline-section"
        >
          <p className="tagline">Your Journey to Financial Mastery Starts Here</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="age-select-container"
        >
          <h2 className="age-select-title">Choose Your Path</h2>
          <div className="age-buttons">
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="age-btn junior-btn clay-card"
              onClick={() => handleAgeSelect('/alpha-junior')}
            >
              <div className="age-icon">🌈</div>
              <h3>Alphin Junior</h3>
              <p className="age-range">Ages 6-12</p>
              <span className="age-desc">Discover the Money Universe!</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="age-btn teen-btn clay-card"
              onClick={() => handleAgeSelect('/alpha-teen')}
            >
              <div className="age-icon">⚡</div>
              <h3>Alphin Teen</h3>
              <p className="age-range">Ages 13-15</p>
              <span className="age-desc">Explore Financial Products!</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="age-btn trader-btn clay-card"
              onClick={() => handleAgeSelect('/alpha-trader')}
            >
              <div className="age-icon">📈</div>
              <h3>Alphin Trader</h3>
              <p className="age-range">Ages 16-17</p>
              <span className="age-desc">Master Real Trading!</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StarterPage;
