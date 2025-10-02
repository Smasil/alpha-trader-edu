# 🚀 Alpha Cosmos Trading Education App

An educational trading application for young traders with three age-appropriate learning paths and AI-powered features.

## 🌟 Features

### 🌈 Alpha Junior (Ages 6-12)
- **Educational Roadmap**: Step-by-step missions teaching basic financial concepts
- **Colorful & Interactive**: Engaging cosmic theme with lots of icons and animations
- **Reward System**: Collect star points and badges for completing missions
- **Topics Covered**: Money basics, saving, spending, banks, smart choices, and more

### ⚡ Alpha Teen (Ages 13-15)
- **Swiper Challenges**: AI-driven interactive challenges (swipe right/left)
- **Financial Products**: Learn about stocks, credit, real estate, savings, and investing
- **Exploration Roadmap**: Progress through different financial topics
- **Achievement System**: Earn badges and power points

### 📈 Alpha Trader (Ages 16-17)
- **Real-Time Trading Simulator**: Practice trading with demo account
- **Live Charts**: Interactive candlestick charts powered by lightweight-charts
- **Order Entry**: Market and limit orders for Forex and SPX
- **Watchlist**: Track S&P 500 stocks with real-time data
- **Account Summary**: Monitor balance, equity, and P/L
- **Alphin AI Guide**: AI assistant that explains trades and provides feedback
- **Scenario Simulator**: Practice in different market conditions:
  - Historical scenarios (2008 Crisis, 2020 Tech Boom)
  - Hypothetical scenarios (Alien Invasion, etc.)
  - AI-generated market conditions and challenges

## 🤖 AI Features (Ready for Integration)

The app is built with placeholders for five major AI features:

1. **AI Trading Assistant/Tutor**: Conversational helper for learning
2. **Trade Analysis & Feedback**: Reviews trades and suggests improvements
3. **Personalized Learning Paths**: Adapts lessons based on progress
4. **Market Scenario Generation**: Creates realistic trading scenarios
5. **Portfolio Analysis**: Analyzes diversification and risk

All AI service functions are in `src/services/aiService.js` with detailed integration instructions.

## 🎨 Design

- **Color Palette**: Dark violet, blue, and yellow cosmic theme
- **Animations**: Floating planets, rockets, satellites, and astronauts
- **Responsive**: Works on desktop and mobile devices
- **Age-Appropriate Styling**:
  - Alpha Junior: Most colorful with large icons
  - Alpha Teen: Medium styling with balanced design
  - Alpha Trader: Professional dark theme mimicking real trading platforms

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone or navigate to the project directory:
```bash
cd alpha-trader-edu
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## 🔧 Enabling AI Features

### Step 1: Get API Keys
Choose one or both:
- **OpenAI**: Get API key from https://platform.openai.com/api-keys
- **Anthropic Claude**: Get API key from https://console.anthropic.com/

### Step 2: Configure Environment
1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Add your API key(s) to `.env`:
```
VITE_OPENAI_API_KEY=your_key_here
# OR
VITE_ANTHROPIC_API_KEY=your_key_here
```

### Step 3: Install SDK
Choose based on your API preference:
```bash
# For OpenAI
npm install openai

# For Anthropic Claude
npm install @anthropic-ai/sdk
```

### Step 4: Enable AI Service
1. Open `src/services/aiService.js`
2. Uncomment the API client initialization (lines 18-22 or 24-27)
3. Replace mock implementations with real API calls (examples provided in comments)

## 📁 Project Structure

```
alpha-trader-edu/
├── src/
│   ├── components/
│   │   └── CosmicBackground.jsx    # Animated cosmic background
│   ├── pages/
│   │   ├── StarterPage.jsx         # Login/signup page
│   │   ├── AlphaJunior.jsx         # Kids section (6-12)
│   │   ├── AlphaTeen.jsx           # Teen section (13-15)
│   │   └── AlphaTrader.jsx         # Young adult section (16-17)
│   ├── services/
│   │   └── aiService.js            # AI integration service
│   ├── App.jsx                     # Main app router
│   └── App.css                     # Global styles
├── .env.example                    # Environment variables template
└── README.md                       # This file
```

## 🛠️ Technologies Used

- **React**: UI framework
- **Vite**: Build tool and dev server
- **React Router**: Navigation
- **Framer Motion**: Animations
- **Lightweight Charts**: Trading charts
- **AI Integration Ready**: OpenAI GPT-4 or Anthropic Claude

## 🎯 Current Status

**Prototype Version** ✅
- ✅ Full UI/UX implementation
- ✅ All three age group pages
- ✅ Cosmic theme and animations
- ✅ Trading simulator with charts
- ✅ Scenario simulator framework
- ✅ AI service placeholders
- ✅ Virtual points system
- ⏳ AI features (ready for API integration)
- ⏳ Backend authentication (prototype uses mock)
- ⏳ Real-time market data (prototype uses mock)

## 🔐 Parent Hub

The Parent Hub feature is accessible from the starter page but not yet fully implemented. Future features will include:
- Monitor child's progress
- Set time limits
- View learning achievements
- Control access to different sections

## 📊 Virtual Points System

Each age group has its own point system:
- **Alpha Junior**: Star Points ⭐ (earned from missions)
- **Alpha Teen**: Power Points ⚡ (earned from challenges)
- **Alpha Trader**: Trading P/L 💰 (based on demo trading)

## 🤝 Contributing

This is an educational prototype. To extend it:
1. Add more missions/challenges for each age group
2. Integrate real AI APIs (see `aiService.js`)
3. Add backend authentication and user profiles
4. Integrate real market data APIs (Yahoo Finance, Alpha Vantage, etc.)
5. Implement parent hub functionality

## 📝 License

This is a prototype educational project.

## 🌟 Future Enhancements

- Real-time market data integration
- More scenario types and difficulty levels
- Social features (leaderboards, challenges with friends)
- Progress tracking and analytics
- Mobile app versions (React Native)
- Gamification elements (achievements, streaks, levels)
- Multi-language support
- Video tutorials and interactive lessons

---

Built with ❤️ for young traders learning to navigate the financial cosmos! 🚀🌌
