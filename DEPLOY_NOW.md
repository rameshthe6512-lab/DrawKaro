# Deploy DrawKaro NOW 🚀

## ⚠️ Important: Vercel vs Node.js Server

**Vercel** is great for static sites but **NOT ideal for WebSocket servers** because:
- Vercel serverless functions have 60-second timeouts
- WebSocket connections need persistent connections
- Vercel doesn't support long-lived WebSocket servers

**Best Options for DrawKaro:**
1. **Railway.app** ⭐ (Easiest, recommended)
2. **Render.com** (Also good)
3. **Heroku** (Still works, but paid)
4. **Vercel + External Server** (Complex setup)

---

## Option 1: Railway.app (EASIEST) ⭐

### Step 1: Create Railway Account
```
https://railway.app
→ Sign up with GitHub
→ Authorize Railway
```

### Step 2: Create New Project
```
Click "New Project"
→ "Deploy from GitHub"
→ Select your DrawKaro repo
→ Click Deploy
```

### Step 3: Wait for Deployment
- Railway auto-detects Node.js project
- Builds and deploys automatically
- Takes ~2-3 minutes

### Step 4: Get Your Server URL
```
Dashboard → Deployments → Click your deployment
→ Copy the "Public URL" 
→ Should look like: https://drawkaro-prod-abc123.up.railway.app
→ CHANGE TO: wss://drawkaro-prod-abc123.up.railway.app
```

### Step 5: Test in Game
1. Open `drawkaro.html` in browser
2. Click **"🌐 Multiplayer Server Setup"**
3. Enter the WSS URL from above
4. Click **Connect**
5. Create a private room and test!

---

## Option 2: Render.com

### Step 1: Create Account
```
https://render.com
→ Sign up with GitHub
```

### Step 2: Create Web Service
```
Dashboard → New → Web Service
→ Select your DrawKaro repo
→ Set start command: npm start
→ Click Deploy
```

### Step 3: Get Server URL
```
Dashboard → your-service
→ Copy the URL under "Environments"
→ Add wss:// prefix
```

### Step 4: Test in Game
Same as Railway above

---

## Option 3: Heroku (Manual)

### Step 1: Install Heroku CLI
```bash
# macOS
brew tap heroku/brew && brew install heroku

# Or download from heroku.com/download
```

### Step 2: Login to Heroku
```bash
heroku login
# Opens browser for authentication
```

### Step 3: Create App
```bash
cd /path/to/drawkaro
heroku create your-drawkaro-app
```

### Step 4: Deploy
```bash
git init
git add .
git commit -m "Initial DrawKaro deployment"
git push heroku main
```

### Step 5: Get Your URL
```bash
heroku logs --tail
# Look for: "ws://localhost:8080"
# Your URL: wss://your-drawkaro-app.herokuapp.com
```

---

## Option 4: Vercel (Static Frontend Only)

If you want Vercel for the **frontend only**, you can:

### Step 1: Create Separate Backend
- Use Railway/Render for backend (steps above)
- Use Vercel for frontend hosting

### Step 2: Deploy Frontend to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from project directory
vercel

# Follow prompts
```

### Step 3: Frontend URL
```
https://drawkaro.vercel.app
```

### Step 4: Use with External Server
- Open drawkaro.vercel.app in browser
- Server Setup → Enter Railway/Render WSS URL

---

## QUICK COMPARISON

| Option | Setup Time | Cost | Ease | Best For |
|--------|-----------|------|------|----------|
| **Railway** | 5 min | Free/Paid | ⭐⭐⭐ | **RECOMMENDED** |
| **Render** | 5 min | Free/Paid | ⭐⭐⭐ | Good alternative |
| **Heroku** | 10 min | $7+/mo | ⭐⭐ | If you prefer it |
| **Vercel** | 5 min | Free | ⭐⭐ | Frontend only |

---

## 🎯 RECOMMENDED: Railway.app Setup (5 Minutes)

### Full Walkthrough

1. **Go to railway.app**
   ```
   https://railway.app
   ```

2. **Click "Start New Project"**
   - Select "GitHub Repo"
   - Authorize Railway
   - Find your DrawKaro repo
   - Click "Deploy"

3. **Wait for Build** (2-3 minutes)
   - Watch the logs
   - Should see: "🎨 DrawKaro server listening on ws://..."

4. **Copy Your URL**
   - Go to Dashboard
   - Click your deployment
   - Copy the Public URL
   - Example: `https://drawkaro-prod-abc123.up.railway.app`
   - Change `https://` to `wss://`

5. **Test Locally First**
   - Open `drawkaro.html` locally
   - Server Setup → `wss://drawkaro-prod-abc123.up.railway.app`
   - Create room → Join in another browser

6. **Test with Friends**
   - Share the game URL
   - Both enter the same WSS URL
   - Create room → Send invite link
   - Test drawing sync + voice! 🎉

---

## Testing Checklist

After deployment, verify:

- [ ] Server is running (check logs)
- [ ] You can access the game URL
- [ ] Server URL connects in game
- [ ] Can create private room
- [ ] Can join room in another browser
- [ ] Drawing syncs between browsers
- [ ] Chat messages broadcast
- [ ] Voice chat negotiates
- [ ] Invite link works for new players

---

## Troubleshooting

### "Connection refused"
```
✓ Check server URL format (must be wss://)
✓ Check server is running (check deployment logs)
✓ Wait 30 seconds after deployment
✓ Refresh page
```

### "Server returned 502/503"
```
✓ Deployment still building (wait 2-3 minutes)
✓ Check build logs for errors
✓ Redeploy if needed
```

### "Invite link doesn't work"
```
✓ Make sure to copy FULL link (not just code)
✓ Friends must have same server URL configured
✓ Both must be in same room before starting
```

### "Drawing not syncing"
```
✓ Check server is connected (look for 🔗 message)
✓ Verify server URL is correct
✓ Check browser console for errors (F12)
```

---

## Next Steps

1. **Choose your platform**: Railway (easiest) or Render
2. **Deploy in 5 minutes**: Follow the steps above
3. **Copy server URL**: Get the WSS URL from dashboard
4. **Test locally**: Configure URL in game, create room
5. **Invite friends**: Share the invite link
6. **Have fun!** 🎨

---

## Still Want to Use Vercel?

If you prefer Vercel for the frontend + external server:

```bash
# 1. Deploy backend to Railway/Render (see above)

# 2. Deploy frontend to Vercel
npm install -g vercel
cd /path/to/drawkaro
vercel

# 3. When you deploy, exclude server
# Vercel will only host drawkaro.html

# 4. In game, use Railway/Render WSS URL
```

This gives you:
- **Frontend**: `https://drawkaro.vercel.app`
- **Backend**: `wss://drawkaro-prod.up.railway.app`

---

**Ready to deploy? Choose Railway above and you'll be live in 5 minutes!** 🚀
