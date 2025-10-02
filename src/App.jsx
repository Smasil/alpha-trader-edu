import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StarterPage from './pages/StarterPage';
import AlphaJunior from './pages/AlphaJunior';
import AlphaTeen from './pages/AlphaTeen';
import AlphaTrader from './pages/AlphaTrader';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StarterPage />} />
        <Route path="/alpha-junior" element={<AlphaJunior />} />
        <Route path="/alpha-teen" element={<AlphaTeen />} />
        <Route path="/alpha-trader" element={<AlphaTrader />} />
      </Routes>
    </Router>
  );
}

export default App;
