# DrawKaro 🎨
*Draw it. Guess it. Rub it in.*

A multiplayer drawing game with real-time voice chat, inspired by Skribbl.io. Play with AI players locally, or deploy the server to invite real friends!

## Features ✨

- **🎨 Live Drawing** - Draw in real-time, everyone sees it instantly
- **🎙️ Voice Chat** - WebRTC peer-to-peer audio communication
- **🌍 Multiplayer** - Create rooms and invite friends via code
- **🤖 AI Players** - Play solo or with bot opponents
- **🎯 Smart Guessing** - Guess words based on sketches
- **🌐 Multi-language** - English, Spanish, French, German, Hindi, Tamil
- **📱 Mobile-friendly** - Works on phones and tablets
- **⚡ Zero Database** - Rooms are ephemeral, no setup needed

## Quick Start (Local)

### 1. Play in Browser
Open `drawkaro.html` in any modern web browser. You can play with AI opponents immediately — no server needed.

```bash
# On macOS/Linux:
open drawkaro.html

# Or just drag it to your browser
```

### 2. Add Multiplayer (Optional)
To play with real friends online, set up a server:

```bash
# Install dependencies
npm install

# Start the server (default: ws://localhost:8080)
npm start
```

Then in the game:
1. Click **"🌐 Multiplayer Server Setup"** in the lobby
2. Enter `ws://localhost:8080`
3. Create a private room and share the invite link with friends

## Deploy to Cloud 🚀

### Option 1: Heroku (Easiest)

```bash
# Create Heroku app
heroku create your-drawkaro-app

# Deploy
git push heroku main

# Get your server URL (replace YOUR-APP with your app name)
# Server URL: wss://your-drawkaro-app.herokuapp.com
```

Then in the game, enter the server URL in multiplayer setup.

### Option 2: Railway.app

1. Connect your GitHub repo to Railway
2. Set the start command: `npm start`
3. Railway auto-assigns a public URL like `wss://your-service.up.railway.app`
4. Use that URL in the game's multiplayer setup

### Option 3: Render.com

1. Create a new "Web Service"
2. Connect your GitHub repo
3. Set start command: `npm start`
4. Set environment variable: `PORT=3000` (optional)
5. Get your WSS URL from the dashboard
6. Use it in the game

### Option 4: Docker

```dockerfile
FROM node:18-slim
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8080
CMD ["npm", "start"]
```

Build and deploy:
```bash
docker build -t drawkaro .
docker run -p 8080:8080 drawkaro
```

## How to Play 🎮

### Lobby
- Choose an avatar and name
- Select language and game settings
- **Quick Play**: Play against AI (no server needed)
- **Private Room**: Invite friends (needs server)

### Game
1. Players take turns being the **Drawer**
2. Drawer gets 3 word choices and draws one
3. Other players **guess** what's being drawn
4. First to guess correctly gets points
5. Drawer gets points for each correct guess
6. Play multiple rounds, highest score wins!

### Voice Chat
- Tap the 🎙️ button in the top-right during the game
- Your voice will be sent to other players
- Bars show your live audio level

## Configuration 🔧

### Server Settings (drawkaro-server.js)
```javascript
const PORT = process.env.PORT || 8080; // Change port here
```

### Game Settings (drawkaro.html)
Inside the HTML, modify these defaults:
```javascript
const state = {
  settings: {
    players: 5,          // Max players per room
    drawTime: 60,        // Seconds per turn
    rounds: 3,           // Rounds to play
    wordCount: 3,        // Words to choose from
    hints: 2,            // Hint reveals per turn
    mode: 'normal',      // 'normal', 'hidden', or 'combo'
    customWords: [],     // Add custom word pools
  },
  // ... more settings
};
```

## Customization 🎨

### Add Custom Words
In the private room settings, you can paste comma-separated words:
```
pizza,biryani,cricket,autorickshaw,monsoon
```

Toggle **"Use custom words only"** to play with just your words.

### Change Colors & Fonts
Edit the CSS variables in the `<style>` tag:
```css
:root {
  --ink: #22254a;      /* dark background */
  --paper: #fff9ef;    /* canvas background */
  --teal: #35ccb0;     /* accent color */
  /* ... more colors */
}
```

## Architecture 🏗️

```
drawkaro.html          Frontend (game UI, canvas, voice)
    ↓ (WebSocket)
drawkaro-server.js     Backend (room management, broadcasting)
    ↓ (WebRTC)
[Real Players] ←→ [Real Players]  (peer-to-peer voice)
```

**Frontend**: ~1600 lines of vanilla JS + Canvas API
**Backend**: ~200 lines of Node.js + `ws` library
**Database**: None! Rooms auto-delete when empty

## Browser Support 🌐

✅ Chrome/Edge 90+
✅ Firefox 88+
✅ Safari 14+
✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting 🔧

### "Connection lost" message
- Check if your server URL is correct (should start with `ws://` or `wss://`)
- Make sure the server is running
- For local testing, ensure both clients are on the same network

### Mic not working
- Check browser permissions (Settings → Privacy → Microphone)
- Make sure you tapped the 🎙️ button
- Use HTTPS or localhost (browsers require secure context for media)

### Drawing not syncing
- Make sure the server is connected (check console for "🔗 connected")
- Only the drawing player's strokes sync automatically
- Chat always syncs to all players

### Players not joining my room
- Share the full **invite link** from the copy button (not just the code)
- Make sure they have the same server URL configured
- Both players must be in the same room before starting the game

## Development 💻

### Run locally
```bash
npm install
npm start
# Server runs on ws://localhost:8080
# Open drawkaro.html and configure server
```

### Inspect network traffic
Open browser DevTools (F12) → Console to see:
```
🔗 connected to drawkaro server
✓ room created: ABCD12 (host: PlayerName)
✓ PlayerName joined ABCD12 (2/5)
🎮 game started in ABCD12
```

### Performance
- Single server handles ~100 concurrent rooms (500+ players)
- Add Redis pub/sub for 1000+ rooms (see SERVER_SETUP.md)
- Rooms auto-clean when the last player leaves

## Credits & License 📄

Created with ❤️ for drawing game enthusiasts.

Licensed under MIT — feel free to fork, modify, and deploy!

---

**Questions?** Open an issue or check the SERVER_SETUP.md for detailed deployment docs.

Happy drawing! 🎨✨
