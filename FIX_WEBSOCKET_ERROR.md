# Fix WebSocket Connection Error 🔧

Your WebSocket URL format is wrong. Here's how to fix it.

---

## 🔍 Step 1: Get Your ACTUAL Railway URL

The URL `wss://drawkaro-prod-abc123.up.railway.app` is just an example.
Your real URL will be different!

### Option A: Check Railway Dashboard
```
1. Go to: https://railway.app
2. Click your project
3. Look for "Public URL" or "Domains"
4. Copy the exact URL (something like: https://drawkaro-prod-xyz789.up.railway.app)
```

### Option B: Check Terminal
```bash
railway status
```

**Look for:**
```
Status: Running ✅
URL: https://drawkaro-prod-XXXXXX.up.railway.app
```

---

## ✅ Step 2: Format the WebSocket URL Correctly

Once you have the Railway URL:

**HTTP URL from Railway:**
```
https://drawkaro-prod-xyz789.up.railway.app
```

**Convert to WebSocket URL:**
```
wss://drawkaro-prod-xyz789.up.railway.app
```

**Simple rule:**
```
https://  →  wss://  (just replace https with wss)
http://   →  ws://   (just replace http with ws)
```

---

## 🎯 Step 3: Test the Connection

In game:
```
1. Open drawkaro.html locally
2. Click "🌐 Multiplayer Server Setup"
3. Paste YOUR actual WebSocket URL (from Step 1)
   Example: wss://drawkaro-prod-xyz789.up.railway.app
4. Click "Connect"
5. Should see: "✅ Server URL saved"
```

---

## 🚨 If Still Getting Connection Error

### Error 1: "Connection refused"
```
Problem: Server not running
Solution: 
  railway logs --follow
  Check if server shows: "📡 DrawKaro multiplayer server running"
```

### Error 2: "Cannot GET /"
```
Problem: Server is running but doesn't serve the route
Solution:
  You're visiting https://url directly in browser
  That's correct! Should see the game page
  If 404, the fix wasn't deployed yet, wait 2-3 minutes
```

### Error 3: "WebSocket connection failed"
```
Problem: WebSocket endpoint doesn't exist
Solution:
  Check the URL format: must be wss:// (with 's')
  Remove any trailing slashes: wss://url (not wss://url/)
```

---

## 📋 Complete Checklist

- [ ] Got actual Railway URL (not the example)
- [ ] Converted to WebSocket URL (https → wss)
- [ ] No trailing slashes (wss://url not wss://url/)
- [ ] Copied exact URL to game
- [ ] Clicked "Connect"
- [ ] See "✅ Server URL saved"
- [ ] Can create room
- [ ] Can join from another tab

---

## 🔗 What Should Happen

```
1. Game loads at: https://drawkaro-prod-xyz789.up.railway.app ✅
2. Configure server: wss://drawkaro-prod-xyz789.up.railway.app ✅
3. Create room ✅
4. Join in another tab ✅
5. Both see each other ✅
6. Drawing syncs ✅
```

---

## 💡 Pro Tips

```
✅ https://url loads the game in browser
✅ wss://url is for WebSocket connections (no browser, used by game code)
✅ Both point to same Railway service
✅ Game internally uses wss://url to sync multiplayer
```

---

## 📞 Quick Reference

**Your URL will look like:**
```
https://drawkaro-prod-RANDOM-CHARACTERS.up.railway.app
```

**Replace RANDOM-CHARACTERS with your actual deployment ID**

**To convert to WebSocket:**
```
https://drawkaro-prod-RANDOM-CHARACTERS.up.railway.app
    ↓ (replace https with wss)
wss://drawkaro-prod-RANDOM-CHARACTERS.up.railway.app
```

---

**Get your real Railway URL first!** That's the issue. 🚀
