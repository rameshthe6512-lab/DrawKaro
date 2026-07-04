# Google AI Studio for Development 🚀

Complete guide to using Google AI Studio (Google's AI development platform) for building applications.

---

## 📋 What is Google AI Studio?

```
Google AI Studio = Google's platform for building with AI
├─ Test Gemini models
├─ Build prompts
├─ Generate API keys
├─ Integrate into code
├─ No coding needed initially
└─ Can export to code
```

**Access:** https://aistudio.google.com

---

## 🎯 Step 1: Setup Google AI Studio

### Step 1.1: Go to AI Studio
```
https://aistudio.google.com
```

### Step 1.2: Sign In
```
Sign in with your Google account
(same account with Gemini Pro subscription)
```

### Step 1.3: Create New Project
```
Click "Create new project"
OR
Click "New chat" to start immediately
```

### Step 1.4: Verify API Access
```
Go to: https://aistudio.google.com/app/apikey
Click "Create API key"
Save your API key somewhere safe
```

---

## 🛠️ Step 2: Basic Workflow

### For Testing/Prototyping

```
1. Go to aistudio.google.com
2. Click "New chat" or "New project"
3. Type your prompt/question
4. Gemini responds
5. Iterate and refine
6. When satisfied → Export to code
```

### For Code Integration

```
1. Create API key (above)
2. Install Gemini SDK in your project
3. Use API key to authenticate
4. Call Gemini from your code
5. Parse responses
6. Integrate into your app
```

---

## 💻 Step 3: Install Gemini SDK

### For Node.js (DrawKaro Backend)

```bash
npm install @google/generative-ai
```

### For Python

```bash
pip install google-generativeai
```

### For JavaScript (Browser)

```html
<script src="https://cdn.jsdelivr.net/npm/@google/generative-ai"></script>
```

---

## 🔑 Step 4: Get Your API Key

### Method 1: From AI Studio
```
1. Go to: https://aistudio.google.com/app/apikey
2. Click "Create API key"
3. Copy the key
4. Save securely
```

### Method 2: From Google Cloud Console
```
1. Go to: https://console.cloud.google.com
2. APIs & Services → Credentials
3. Create API key
4. Enable Generative AI API
```

---

## 📝 Step 5: Use Gemini in Your Code

### Example 1: Node.js Backend

```javascript
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function askGemini(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

// Usage
const answer = await askGemini("What is DrawKaro?");
console.log(answer);
```

### Example 2: Browser JavaScript

```javascript
const { GoogleGenerativeAI } = window;
const genAI = new GoogleGenerativeAI("YOUR_API_KEY");

async function chat(userMessage) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(userMessage);
  return result.response.text();
}
```

### Example 3: Python

```python
import google.generativeai as genai

genai.configure(api_key="YOUR_API_KEY")
model = genai.GenerativeModel("gemini-pro")

response = model.generate_content("What is DrawKaro?")
print(response.text)
```

---

## 🎮 Step 6: Real-World Examples

### Example A: Chat Bot in DrawKaro

```javascript
// Add AI-powered game guide to DrawKaro
async function getGameTip() {
  const prompt = `I'm playing DrawKaro and stuck on drawing a ${currentWord}. 
                  Give me a 1-sentence tip.`;
  const tip = await askGemini(prompt);
  return tip;
}
```

### Example B: AI Game Master

```javascript
// AI suggests words
async function suggestWords() {
  const prompt = `Suggest 5 easy words to draw for a party game. 
                  Return as comma-separated list.`;
  const words = await askGemini(prompt);
  return words.split(",");
}
```

### Example C: AI Chat in Game

```javascript
// AI players chat in game
async function botChat() {
  const prompt = `You're playing DrawKaro and someone drew something confusing. 
                  Write a funny 1-line reaction.`;
  const message = await askGemini(prompt);
  return message;
}
```

---

## 🔐 Step 7: Secure Your API Key

### ⚠️ NEVER Expose API Key

```javascript
// ❌ WRONG - Exposes key publicly
const API_KEY = "sk-xyz123...";

// ✅ CORRECT - Use environment variables
const API_KEY = process.env.GOOGLE_API_KEY;
```

### Setup Environment Variables

#### For Node.js

Create `.env` file:
```
GOOGLE_API_KEY=your_actual_key_here
```

Load in code:
```javascript
require('dotenv').config();
const apiKey = process.env.GOOGLE_API_KEY;
```

#### For Cloud Deployment

Railway/Render:
```
1. Go to dashboard
2. Environment variables section
3. Add: GOOGLE_API_KEY = your_key
4. Deploy
```

Heroku:
```bash
heroku config:set GOOGLE_API_KEY=your_key
```

---

## 📊 Step 8: Available Models

### Gemini Models

| Model | Speed | Quality | Cost | Best For |
|-------|-------|---------|------|----------|
| **gemini-pro** | Fast | Good | Free | Text chat, general |
| **gemini-pro-vision** | Medium | Excellent | Low | Image understanding |
| **gemini-1.5-pro** | Medium | Excellent | Low | Complex tasks |
| **gemini-1.5-flash** | Very Fast | Good | Free | Quick responses |

### Which to Use?

```
For DrawKaro:
├─ gemini-pro (good for chat)
├─ gemini-1.5-flash (fastest for quick tips)
└─ gemini-pro-vision (if analyzing drawings)
```

---

## 🧪 Step 9: Testing in AI Studio

### Test Before Coding

```
1. Go to aistudio.google.com
2. Type your prompt
3. See Gemini's response
4. Refine prompt if needed
5. When happy → Copy code
6. Paste into your project
```

### Prompt Engineering Tips

```
Good prompt:
"You are a DrawKaro game master. 
 Suggest 3 easy words for beginners.
 Return as comma-separated list."

Bad prompt:
"Give me words"
```

---

## 🚀 Step 10: Integration with DrawKaro

### Add AI Features to Your Game

```javascript
// drawkaro-server.js - Add AI support

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// AI suggests words
async function suggestGameWords(language) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = `Suggest 10 easy drawing words in ${language} 
                  for a party game. Return as comma-separated list.`;
  const result = await model.generateContent(prompt);
  return result.response.text();
}

// AI analyzes drawings (if using gemini-pro-vision)
async function analyzeDrawing(imageBase64) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
  const prompt = "What object is drawn in this image?";
  const result = await model.generateContent([
    { inlineData: { data: imageBase64, mimeType: "image/png" } },
    prompt
  ]);
  return result.response.text();
}

export { suggestGameWords, analyzeDrawing };
```

---

## 📈 Step 11: Rate Limits & Quotas

### Free Tier Limits

```
Gemini Pro: 60 requests per minute
Gemini Pro Vision: 60 requests per minute
No daily limit
No billing required
```

### For DrawKaro

```
Your game needs: ~1-5 requests per game
With free tier: Can handle 1000s of concurrent games
Plenty of capacity!
```

---

## 💰 Step 12: Pricing

### Free Tier
```
✅ 60 requests per minute
✅ No credit card needed
✅ Unlimited requests per day
✅ Full Gemini Pro access
✅ Perfect for most projects
```

### Paid Tier
```
If you exceed free limits:
- $1.50 per 1 million input tokens
- $6 per 1 million output tokens
- Usually very cheap
```

### For DrawKaro
```
Estimate: 100 games/day
Each game: 1-5 API calls
Total: 500 calls/day
Cost: Less than $0.01/day
```

---

## 🎯 Step 13: Common Use Cases

### Use Case 1: Game Tips

```javascript
app.post("/api/game-tip", async (req, res) => {
  const { word } = req.body;
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(
    `Give a 1-sentence hint for drawing: ${word}`
  );
  res.json({ tip: result.response.text() });
});
```

### Use Case 2: Word Suggestions

```javascript
app.get("/api/suggest-words", async (req, res) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(
    "Suggest 5 fun words for drawing game"
  );
  res.json({ words: result.response.text().split(",") });
});
```

### Use Case 3: AI Opponent

```javascript
async function getAIGuess(drawingDescription) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(
    `A drawing looks like: ${drawingDescription}. 
     Guess what it is in 1 word.`
  );
  return result.response.text();
}
```

---

## 🔄 Step 14: Error Handling

```javascript
async function safeAskGemini(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    if (error.code === "RATE_LIMIT_EXCEEDED") {
      return "Too many requests. Try again later.";
    }
    console.error("AI Error:", error);
    return "AI service unavailable";
  }
}
```

---

## 📚 Step 15: Resources & Documentation

### Official Resources

```
Google AI Studio: https://aistudio.google.com
API Docs: https://ai.google.dev
Node.js SDK: https://www.npmjs.com/package/@google/generative-ai
Python SDK: https://pypi.org/project/google-generativeai
```

### Learning

```
Getting Started: https://ai.google.dev/tutorials
API Reference: https://ai.google.dev/api
Prompt Guide: https://ai.google.dev/tips_prompt_engineering
```

---

## ✅ Step 16: Complete Workflow Summary

```
1. Sign up at aistudio.google.com
2. Generate API key from aistudio.google.com/app/apikey
3. Install SDK: npm install @google/generative-ai
4. Create .env file with API key
5. Write code using Gemini
6. Test in AI Studio first
7. Deploy to Railway/Render
8. Set environment variables in cloud
9. Monitor API usage
10. Scale as needed
```

---

## 🎮 For Your DrawKaro Project

### Add AI Features

1. **AI Word Suggestions**
   - Generate random words for games
   - Suggest words by difficulty level
   - Language-specific words

2. **AI Game Tips**
   - Give drawing hints
   - Suggest guessing strategies
   - Provide game analysis

3. **AI Chat Bot**
   - AI players chat in game
   - Funny reactions to drawings
   - Game commentary

4. **AI Drawing Analysis**
   - Analyze sketches (with vision model)
   - Verify correct guesses
   - Suggest what drawing looks like

### Implementation

```javascript
// In drawkaro-server.js

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Add to your message handlers
if (msg.type === 'ai-tip') {
  const tip = await getDrawingTip(msg.word);
  broadcast(msg.roomCode, { type: 'ai-response', tip });
}
```

---

## 🚀 Quick Start (5 Minutes)

```bash
# 1. Get API key
Visit: https://aistudio.google.com/app/apikey
Copy key

# 2. Setup project
npm install @google/generative-ai

# 3. Create .env
GOOGLE_API_KEY=your_key_here

# 4. Test code
node -e "
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
model.generateContent('Hello!').then(r => console.log(r.response.text()));
"

# 5. Works? Start building!
```

---

## 📞 Troubleshooting

### "API key not found"
```
✓ Check .env file has: GOOGLE_API_KEY=...
✓ Check key is copied correctly
✓ Restart your app after setting env var
```

### "Rate limit exceeded"
```
✓ You're exceeding 60 requests/minute
✓ Add delay between requests
✓ Cache responses when possible
✓ Upgrade to paid tier if needed
```

### "Invalid model"
```
✓ Use: gemini-pro (text)
✓ Or: gemini-pro-vision (images)
✓ Or: gemini-1.5-flash, gemini-1.5-pro
```

---

## 🎓 Learning Path

### Beginner (30 minutes)
1. Sign up at aistudio.google.com
2. Try "New chat"
3. Ask questions
4. Get API key

### Intermediate (1-2 hours)
1. Install SDK
2. Write simple Node.js script
3. Call Gemini from code
4. Parse responses

### Advanced (2-4 hours)
1. Build full feature with AI
2. Error handling
3. Rate limiting
4. Production deployment

### Expert (4+ hours)
1. Fine-tune prompts
2. Multi-turn conversations
3. Streaming responses
4. Vision analysis
5. Complex workflows

---

## 💡 Pro Tips

```
✅ Test prompts in AI Studio first
✅ Use environment variables for keys
✅ Cache responses to save API calls
✅ Add error handling
✅ Monitor API usage in cloud dashboard
✅ Use free tier generously (60 req/min is plenty)
✅ Prompt engineering matters - iterate!
✅ Use specific, clear prompts
✅ Keep conversations in context
✅ Set system prompts for consistency
```

---

## 🎯 Next Steps

1. **Get API Key** → https://aistudio.google.com/app/apikey
2. **Try AI Studio** → https://aistudio.google.com
3. **Install SDK** → `npm install @google/generative-ai`
4. **Add to DrawKaro** → Use examples above
5. **Deploy** → Set env var in Railway/Render
6. **Test** → Call AI from your game
7. **Share** → Show friends your AI features!

---

**You're ready to build with AI!** 🚀✨
