# Railway CLI Direct Deployment Guide 🚀

Complete guide to deploy DrawKaro directly from terminal to Railway.

---

## ✅ Step 1: Login to Railway

```bash
railway login
```

**What happens:**
- Opens browser for authentication
- Click "Login" on Railway
- Authorize with GitHub
- Returns to terminal (authenticated)

---

## ✅ Step 2: Create Railway Project

```bash
cd C:\Users\Ram\OneDrive\Desktop\files

# Initialize Railway project
railway init
```

**What happens:**
- Asks: "Which existing project?" or "Create new?"
- Choose: "Create new project"
- Name: "drawkaro" (or your preferred name)
- Creates `.railway/config.json`

---

## ✅ Step 3: Add Environment Variables

```bash
# Add Gemini API key (if using AI features)
railway variables set GEMINI_API_KEY your_actual_key_here

# Add Node environment
railway variables set NODE_ENV production
```

---

## ✅ Step 4: Deploy to Railway

```bash
# Deploy directly
railway up
```

**What happens:**
- Builds your project
- Deploys to Railway servers
- Shows deployment progress
- Returns public URL when done

**Expected output:**
```
🚀 Deploying DrawKaro
   [████████████████████] 100%
   
✅ Deployed successfully!
   Public URL: https://drawkaro-prod-abc123.up.railway.app
   WebSocket: wss://drawkaro-prod-abc123.up.railway.app
```

---

## ✅ Step 5: Verify Deployment

```bash
# Check deployment status
railway status

# View logs
railway logs

# View variables
railway variables
```

---

## 📋 Complete Terminal Commands (Copy-Paste)

```bash
# 1. Navigate to project
cd C:\Users\Ram\OneDrive\Desktop\files

# 2. Login
railway login

# 3. Initialize Railway project
railway init

# 4. Set environment variables
railway variables set NODE_ENV production

# 5. Deploy!
railway up

# 6. Check status
railway status
```

---

## 🎯 After Deployment

Once deployed, you'll get a URL like:
```
https://drawkaro-prod-xyz.up.railway.app
```

### Use in Game:

1. Open `drawkaro.html` locally
2. Click "🌐 Multiplayer Server Setup"
3. Enter: `wss://drawkaro-prod-xyz.up.railway.app`
4. Click Connect
5. Create room and test!

---

## 🔍 Troubleshooting

### Error: "Not authenticated"
```bash
railway logout
railway login
# Try again
```

### Error: "Cannot find module"
```bash
# Push latest changes first
git add .
git commit -m "Fix dependencies"
git push

# Then deploy
railway up
```

### Error: "PORT not set"
```bash
railway variables set PORT 8080
railway up
```

### View Real-Time Logs
```bash
railway logs --follow
```

---

## 📊 Useful Railway Commands

```bash
# Login/Logout
railway login
railway logout

# Project management
railway init              # Create new project
railway list              # List projects
railway project           # Switch project

# Deployment
railway up                # Deploy
railway down              # Remove deployment
railway redeploy          # Redeploy current version

# Information
railway status            # Show status
railway logs              # View logs
railway logs --follow     # Live logs
railway variables         # Show env vars

# Environment
railway variables set KEY value     # Set variable
railway variables delete KEY        # Delete variable
railway environment                 # Manage environments

# Domain
railway domain            # Add custom domain
railway domain --remove   # Remove domain
```

---

## 🌐 Custom Domain (Optional)

If you want a custom domain like `drawkaro.com`:

```bash
# Add domain
railway domain add drawkaro.com

# Update DNS records (Railway will show instructions)
# Point your domain to Railway's servers

# Verify
railway domain
```

---

## 🚨 If Deployment Fails

### Check These:

1. **package.json**
   ```bash
   cat package.json
   # Verify: "type": "module"
   # Verify: "start": "node drawkaro-server.js"
   ```

2. **Node version**
   ```bash
   railway variables set NODE_VERSION 18
   ```

3. **Port binding**
   ```bash
   # In drawkaro-server.js verify:
   const PORT = process.env.PORT || 8080;
   server.listen(PORT, '0.0.0.0', () => {...});
   ```

4. **Import/Require errors**
   ```bash
   # Verify first line of drawkaro-server.js:
   import { WebSocketServer } from 'ws';  # ✅ ES6
   # NOT:
   const WebSocket = require('ws');       # ❌ CommonJS
   ```

---

## 📈 Monitor Deployment

After deploying, monitor with:

```bash
# Real-time logs
railway logs --follow

# Metrics
railway status

# Check if server is responding
# Visit: https://drawkaro-prod-xyz.up.railway.app
# Should load DrawKaro game ✅
```

---

## ✅ Deployment Checklist

- [ ] Railway CLI installed
- [ ] Logged in to Railway (`railway login`)
- [ ] Project initialized (`railway init`)
- [ ] Environment variables set
- [ ] Git repo is clean (committed changes)
- [ ] Ran `railway up`
- [ ] Got public URL
- [ ] Tested URL in browser
- [ ] Game loads ✅
- [ ] Can configure server in game
- [ ] Can create room

---

## 🎉 Success Indicators

When deployment is successful:

```
✅ railway status shows "Running"
✅ URL is accessible in browser
✅ Game page loads (drawkaro.html)
✅ Can configure server URL
✅ No upstream error
✅ Logs show: "🎨 DrawKaro server listening"
```

---

## 🔗 After Deployment

Share with friends:

```
Game URL: https://drawkaro-prod-xyz.up.railway.app
Server URL: wss://drawkaro-prod-xyz.up.railway.app

OR

Full invite link:
https://drawkaro.vercel.app#room=ABC123

(if deploying frontend to Vercel)
```

---

## 🚀 Full Workflow

```
1. Local Development
   npm start
   Test at http://localhost:3000

2. Commit Changes
   git add .
   git commit -m "message"
   git push

3. Deploy to Railway
   railway up

4. Share URL with Friends
   https://drawkaro-prod-xyz.up.railway.app

5. Invite to Game
   Server Setup: wss://drawkaro-prod-xyz.up.railway.app
   Create room → Share link
```

---

## 💡 Pro Tips

```
✅ Keep sensitive keys in environment variables
✅ Monitor logs regularly
✅ Use railway logs --follow for real-time debugging
✅ Set up custom domain for professional look
✅ Use railway down when not using (saves money)
✅ Check railway status before debugging
```

---

## 📞 Quick Reference

**Deploy in 3 Commands:**
```bash
railway login
railway init
railway up
```

**Get URL:**
```bash
railway status
# Look for "Public URL:"
```

**View Logs:**
```bash
railway logs --follow
```

**Update Code:**
```bash
git push
railway up
```

---

**Ready to deploy? Start with `railway login`!** 🚀
