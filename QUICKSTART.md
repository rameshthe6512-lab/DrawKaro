# DrawKaro Quick Start Guide 🚀

## Play Right Now (No Setup)
1. Open `drawkaro.html` in your browser
2. Enter your name and pick an avatar
3. Click **"Quick Play!"** 
4. Play against AI opponents instantly!

## Play with Real Friends 👥

### Step 1: Start the Server
```bash
npm install
npm start
```
The server will print: `ws://localhost:8080`

### Step 2: Open the Game
Open `drawkaro.html` in your browser

### Step 3: Configure Multiplayer
1. Click **"🌐 Multiplayer Server Setup"**
2. Enter: `ws://localhost:8080`
3. Click **Connect**

### Step 4: Create a Room
1. Click **"🔒 Create private room"**
2. Share the **invite link** with friends (use the Copy button)
3. Wait for them to join
4. Click **"Start game!"**

### Step 5: Enable Voice (Optional)
- Click the 🎙️ button during the game
- Friends will hear you!

---

## Deploy Online 🌐

### Heroku (Easiest)
```bash
git init
git add .
git commit -m "Initial commit"

heroku login
heroku create your-drawkaro-app
git push heroku main
```

Then in the game, use server URL: `wss://your-drawkaro-app.herokuapp.com`

### Railway.app
1. Connect your GitHub repo
2. Deploy automatically
3. Copy the WSS URL from the dashboard
4. Use it in the game's multiplayer setup

### Render.com
1. Create a new Web Service
2. Deploy from your GitHub repo
3. Copy the WSS URL
4. Use it in the game

---

## Troubleshooting

**"Could not connect to server"**
- Is the server running? Try `npm start`
- Is the URL correct? Check it starts with `ws://` or `wss://`
- Are you on the same network?

**"Mic not working"**
- Click the 🎙️ button first
- Check browser microphone permissions
- Must use HTTPS or localhost

**"Drawing not syncing"**
- Server must be connected (check console)
- Wait for the green checkmark

**"Friends can't join my room"**
- Share the full **invite link**, not just the code
- They must have the server URL configured
- Both must be in the room before clicking Start

---

## Features Overview

| Feature | Solo | Local Multiplayer | Online Multiplayer |
|---------|------|-------------------|-------------------|
| Play with AI | ✅ | ✅ | ✅ |
| Real players | ❌ | ❌ | ✅ |
| Voice chat | ❌ | ❌ | ✅ |
| Custom words | ✅ | ✅ | ✅ |
| Multiple languages | ✅ | ✅ | ✅ |

---

**Ready to play?** Open `drawkaro.html` and start drawing! 🎨
