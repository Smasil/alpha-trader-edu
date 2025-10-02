# 🤖 AI Integration Guide

This guide explains how to integrate AI features into the Alpha Cosmos Trading Education App.

## Overview

The app is built with 5 major AI features ready for integration:

1. **AI Trading Assistant** - Conversational helper (Alphin)
2. **Trade Analysis** - Analyzes trades and provides feedback
3. **Personalized Learning** - Adapts content based on progress
4. **Scenario Generation** - Creates market scenarios
5. **Portfolio Analysis** - Reviews diversification and risk

All AI functions are in `src/services/aiService.js` with mock implementations that you can replace with real API calls.

## Quick Start

### 1. Choose Your AI Provider

**Option A: OpenAI (GPT-4)**
- Best for: General-purpose AI features
- Cost: Pay per token
- Setup: Simple API calls
- Install: `npm install openai`

**Option B: Anthropic Claude**
- Best for: Detailed analysis and explanations
- Cost: Pay per token
- Setup: Simple API calls
- Install: `npm install @anthropic-ai/sdk`

**Option C: Both**
- Use OpenAI for quick responses
- Use Claude for detailed analysis

### 2. Get API Keys

1. **OpenAI**:
   - Go to https://platform.openai.com/api-keys
   - Create new secret key
   - Copy and save securely

2. **Anthropic**:
   - Go to https://console.anthropic.com/
   - Create API key
   - Copy and save securely

### 3. Configure Environment

```bash
# Copy example file
cp .env.example .env

# Edit .env and add your key(s)
VITE_OPENAI_API_KEY=sk-proj-...
# OR
VITE_ANTHROPIC_API_KEY=sk-ant-...
```

### 4. Install SDK

```bash
# For OpenAI
npm install openai

# For Anthropic
npm install @anthropic-ai/sdk

# For both
npm install openai @anthropic-ai/sdk
```

## Integration Examples

### Example 1: OpenAI Integration

Open `src/services/aiService.js` and uncomment:

```javascript
import OpenAI from 'openai';
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});
```

Then replace the mock in `aiTradingAssistant`:

```javascript
export const aiTradingAssistant = async (userMessage, context = {}) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are Alphin, a friendly AI trading assistant helping young traders learn. Explain concepts simply and provide constructive guidance."
      },
      {
        role: "user",
        content: userMessage
      }
    ],
    max_tokens: 200,
  });

  return {
    message: response.choices[0].message.content,
    suggestions: ['Learn more', 'Practice trading', 'Review concepts'],
  };
};
```

### Example 2: Anthropic Claude Integration

```javascript
import Anthropic from '@anthropic-ai/sdk';
const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
});

export const analyzeTradeDecision = async (tradeData) => {
  const message = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `Analyze this trade for a young trader: ${JSON.stringify(tradeData)}. Provide constructive feedback.`
      }
    ],
  });

  return {
    analysis: message.content[0].text,
    rating: 'Good',
    suggestions: ['Set stop-loss', 'Monitor volatility'],
  };
};
```

## Using AI Features in Components

### In Alpha Trader (Alphin Guide)

```javascript
import { aiTradingAssistant } from '../services/aiService';

// When user makes a trade
const handleTrade = async (side) => {
  // ... existing trade logic ...

  // Get AI feedback
  const feedback = await aiTradingAssistant(
    `I just ${side === 'buy' ? 'bought' : 'sold'} ${orderAmount} shares of ${selectedSymbol}`,
    { symbol: selectedSymbol, side, quantity: orderAmount, price: currentPrice }
  );

  showAlphinHelp(feedback.message);
};
```

### In Alpha Teen (Challenge Generation)

```javascript
import { generateSwiperChallenge } from '../services/aiService';

// Generate dynamic challenges
const loadNewChallenge = async () => {
  const challenge = await generateSwiperChallenge('stocks', 'medium');
  setCurrentChallenge(challenge);
};
```

### In Alpha Junior (Concept Explanation)

```javascript
import { explainConcept } from '../services/aiService';

// When user clicks a mission
const handleMissionClick = async (mission) => {
  const explanation = await explainConcept(mission.title, 'junior');
  showLearningContent(explanation);
};
```

## AI Feature Details

### 1. AI Trading Assistant (Alphin)

**Purpose**: Real-time conversational help for traders

**Inputs**:
- `userMessage`: Question or statement from user
- `context`: Trading context (positions, balance, etc.)

**Outputs**:
- `message`: AI response
- `suggestions`: Recommended actions

**Best Practices**:
- Keep system prompt focused on education
- Include user's age group in context
- Limit response length (200-300 tokens)
- Cache frequent questions

### 2. Trade Analysis

**Purpose**: Review and learn from trades

**Inputs**:
- `symbol`: Stock/asset symbol
- `side`: 'buy' or 'sell'
- `quantity`: Number of shares
- `price`: Entry price
- `timestamp`: When trade was made

**Outputs**:
- `analysis`: Detailed feedback
- `rating`: Quality score
- `suggestions`: Improvements
- `learningPoints`: Key lessons

**Best Practices**:
- Include market context (trend, volatility)
- Reference user's experience level
- Focus on educational value
- Suggest specific improvements

### 3. Personalized Learning Paths

**Purpose**: Adapt lessons to user progress

**Inputs**:
- `completedLessons`: Array of finished topics
- `currentLevel`: User's skill level
- `strengths`: What they're good at
- `weaknesses`: Areas to improve

**Outputs**:
- `nextTopics`: Recommended lessons
- `strengths`: What they excel at
- `areasToImprove`: Focus areas

**Best Practices**:
- Track user's learning speed
- Adjust difficulty dynamically
- Provide multiple path options
- Celebrate achievements

### 4. Market Scenario Generation

**Purpose**: Create realistic practice environments

**Inputs**:
- `scenarioType`: 'historical', 'hypothetical', etc.
- `difficulty`: 'easy', 'medium', 'hard', 'extreme'

**Outputs**:
- `scenarioName`: Title
- `marketConditions`: Volatility, trend, volume
- `newsEvents`: Simulated news with impact
- `challenges`: Tasks to complete
- `startingConditions`: Initial state

**Best Practices**:
- Use real historical events as templates
- Generate realistic price movements
- Include time pressure elements
- Vary difficulty progressively

### 5. Portfolio Analysis

**Purpose**: Review overall trading performance

**Inputs**:
- `positions`: Current holdings
- `balance`: Cash available
- `history`: Past trades
- `riskTolerance`: User's risk profile

**Outputs**:
- `overallRating`: Portfolio quality
- `diversificationScore`: How diversified
- `riskLevel`: Risk assessment
- `insights`: Key observations
- `recommendations`: Specific actions
- `performanceMetrics`: Returns, ratios, etc.

**Best Practices**:
- Consider user's age and experience
- Focus on education, not just returns
- Explain metrics in simple terms
- Provide actionable recommendations

## Security Best Practices

### ⚠️ Important Security Notes

1. **Never expose API keys in frontend code**
   - The current setup uses `dangerouslyAllowBrowser: true` for prototyping
   - For production, ALWAYS use a backend proxy

2. **Rate Limiting**
   - Implement rate limits to prevent abuse
   - Cache common responses
   - Set max token limits

3. **User Input Validation**
   - Sanitize all user inputs before sending to AI
   - Prevent prompt injection attacks
   - Validate response formats

### Production Architecture

For production, set up a backend:

```
User → Frontend → Your Backend API → AI Provider
                  (validates, logs,    (OpenAI/Claude)
                   rate limits)
```

Example backend endpoint (Node.js/Express):

```javascript
// backend/routes/ai.js
const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Server-side only!
});

router.post('/trading-assistant', async (req, res) => {
  const { message, context } = req.body;

  // Validate and sanitize inputs
  if (!message || message.length > 500) {
    return res.status(400).json({ error: 'Invalid message' });
  }

  // Call AI
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are Alphin..." },
      { role: "user", content: message }
    ],
    max_tokens: 200,
  });

  res.json({ message: response.choices[0].message.content });
});

module.exports = router;
```

## Cost Optimization

### Estimate Costs

**OpenAI GPT-4**:
- Input: ~$0.03 per 1K tokens
- Output: ~$0.06 per 1K tokens
- Average query: ~$0.01-0.05

**Anthropic Claude**:
- Input: ~$0.003 per 1K tokens (Haiku)
- Input: ~$0.015 per 1K tokens (Sonnet)
- Output: ~$0.015 per 1K tokens (Haiku)

### Tips to Reduce Costs

1. **Use Smaller Models When Possible**
   - GPT-3.5-turbo for simple tasks
   - Claude Haiku for quick responses
   - GPT-4 only for complex analysis

2. **Cache Common Responses**
   - Store frequently asked questions
   - Cache scenario templates
   - Save educational content

3. **Limit Token Usage**
   - Set `max_tokens` appropriately
   - Use shorter system prompts
   - Truncate long inputs

4. **Batch Processing**
   - Combine multiple requests
   - Generate content in bulk
   - Pre-generate scenarios

5. **Smart Triggering**
   - Don't call AI for every action
   - Use AI for significant events only
   - Provide manual fallbacks

## Testing AI Integration

### Test Checklist

- [ ] API keys configured correctly
- [ ] Environment variables loaded
- [ ] AI responses returning successfully
- [ ] Error handling works
- [ ] Response times acceptable (< 5 seconds)
- [ ] Costs within budget
- [ ] Rate limits configured
- [ ] User experience smooth

### Test Each Feature

```javascript
// Test in browser console
import aiService from './src/services/aiService';

// Test trading assistant
await aiService.aiTradingAssistant("What is a stop-loss?");

// Test trade analysis
await aiService.analyzeTradeDecision({
  symbol: 'AAPL',
  side: 'buy',
  quantity: 10,
  price: 178.50
});

// Test scenario generation
await aiService.generateMarketScenario('2008 Financial Crisis', 'hard');
```

## Troubleshooting

### Common Issues

**Error: API key not found**
- Check `.env` file exists
- Verify key format: `VITE_OPENAI_API_KEY=sk-...`
- Restart dev server after adding keys

**Error: 429 Too Many Requests**
- You hit rate limit
- Implement rate limiting on frontend
- Add delays between requests

**Error: Invalid request**
- Check request format matches API docs
- Verify model name is correct
- Check token limits

**Slow responses**
- Reduce `max_tokens`
- Use faster models (GPT-3.5, Claude Haiku)
- Add loading states in UI

## Next Steps

1. Start with ONE AI feature
2. Test thoroughly with mock data
3. Monitor costs closely
4. Gather user feedback
5. Expand to other features
6. Optimize based on usage patterns

## Resources

- [OpenAI API Docs](https://platform.openai.com/docs)
- [Anthropic API Docs](https://docs.anthropic.com/)
- [AI Safety Best Practices](https://platform.openai.com/docs/guides/safety-best-practices)
- [Rate Limiting Guide](https://platform.openai.com/docs/guides/rate-limits)

---

Need help? Check the main README.md or open an issue in the project repository.
