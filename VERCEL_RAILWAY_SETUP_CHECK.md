# Vercel + Railway Setup Verification ✅

Complete checklist to verify your Vercel (Frontend) + Railway (Backend) setup.

---

## 📋 What You Should Have

### Vercel (Frontend - drawkaro.html)
```
URL: https://drawkaro-XXXXXXX.vercel.app
Shows: DrawKaro game interface
```

### Railway (Backend - Server)
```
URL: wss://drawkaro-prod-XXXXXXX.up.railway.app
Serves: drawkaro.html on HTTP
Handles: WebSocket connections
```

---

## ✅ Step 1: Test Vercel Frontend

**Visit your Vercel URL:**
```
https://drawkaro-XXXXXXX.vercel.app
```

Should see:
- ✅ DrawKaro game loads
- ✅ "Draw it. Guess it. Rub it in." tagline
- ✅ Avatar selector
- ✅ Name input
- ✅ Buttons: "Quick Play!", "Create private room", "Join"

If you see this → **Vercel is working! ✅**

---

## ✅ Step 2: Configure Server URL in Game

In the Vercel game:
```
1. Click "🌐 Multiplayer Server Setup"
2. Enter your Railway WSS URL: wss://drawkaro-prod-XXXXXXX.up.railway.app
3. Click "Connect"
4. Should see: "✅ Server URL saved"
```

If this works → **Connection is working! ✅**

---

## ✅ Step 3: Test Multiplayer

```
1. Click "🔒 Create private room"
2. Get the room code (e.g., ABC123)
3. Open a NEW browser tab/window
4. Visit same Vercel URL
5. Click "Join" and enter room code
6. Both tabs should show game loading
```

If both see the game → **Multiplayer is working! ✅**

---

## ✅ Step 4: Test Drawing Sync

```
In Tab 1: Draw something on the canvas
Watch Tab 2: Should see drawing appear in real-time

If drawing syncs → **WebSocket is working! ✅**
```

---

## 🔍 Verification Checklist

- [ ] Vercel URL loads game
- [ ] Game UI is visible
- [ ] Buttons work (Quick Play, Create Room, Join)
- [ ] Configure Server URL option works
- [ ] Can set Railway WSS URL
- [ ] Connection saved successfully
- [ ] Can create private room
- [ ] Can join room from another tab
- [ ] Both tabs see same game state
- [ ] Drawing syncs between tabs
- [ ] Chat messages appear
- [ ] No console errors (F12)

---

## 🚨 If Something Isn't Working

### Issue 1: Vercel URL shows 404
```
Problem: Game not deployed to Vercel
Solution: 
  1. Make sure drawkaro.html is in repo
  2. Push to GitHub
  3. Redeploy on Vercel dashboard
```

### Issue 2: Cannot set server URL
```
Problem: Game code might be outdated
Solution:
  1. Clear browser cache (Ctrl+Shift+Del)
  2. Hard refresh (Ctrl+F5)
  3. Try incognito window
```

### Issue 3: WebSocket connection fails
```
Problem: Wrong Railway URL or server not running
Solution:
  1. Copy EXACT URL from Railway dashboard
  2. Check: starts with wss:// (not https)
  3. Check: no trailing slash
  4. Check: railway logs show "server listening"
```

### Issue 4: Drawing doesn't sync
```
Problem: Server not broadcasting
Solution:
  1. Check Railway logs: railway logs --follow
  2. Look for: "🎨 DrawKaro server listening"
  3. Look for: "📡 DrawKaro multiplayer server running"
  4. Redeploy if needed: railway up
```

---

## 📞 Share Your Status

To help you further, please tell me:

```
1. Your Vercel URL: https://drawkaro-XXXXXXX.vercel.app
2. Your Railway URL: wss://drawkaro-prod-XXXXXXX.up.railway.app
3. What's working: (Vercel loads / Server connects / Drawing syncs / etc)
4. What's NOT working: (specific issue)
```

---

## 🎯 Perfect Setup = All Green ✅

```
✅ Vercel loads game
✅ Game connects to Railway
✅ Can create rooms
✅ Can join rooms
✅ Drawing syncs
✅ Chat works
✅ Multiple players can play together
```

If all above are ✅, you're ready to share with friends!

---

## 🚀 Share with Friends

Once everything works:

```
1. Give them Vercel URL: https://drawkaro-XXXXXXX.vercel.app
2. They visit the URL
3. They configure same Railway URL
4. You create a room
5. They join with your room code
6. Play together! 🎮
```

---

**Please share your Vercel and Railway URLs so I can check them directly!** 🔍
