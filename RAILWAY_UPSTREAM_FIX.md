# Railway Upstream Error - Fix Guide 🚀

Upstream error means your Node.js server isn't starting or responding. Here's how to fix it.

---

## 🔍 What Causes Upstream Error?

```
❌ Server not starting
❌ Port not listening
❌ Module import error
❌ Environment variable missing
❌ Crash on startup
❌ Timeout
❌ Out of memory
```

---

## ✅ Step 1: Check Local First

### Run locally to see real error:
```bash
cd C:\Users\Ram\OneDrive\Desktop\files
npm install
npm start
```

Look for any error messages. Common ones:

```
Error: Cannot find module 'ws'
→ Solution: npm install

Error: EADDRINUSE: address already in use :::8080
→ Solution: Kill process on port 8080 or use different PORT

TypeError: require is not a function
→ Solution: Check if using ES6 imports correctly

Error: Cannot read property of undefined
→ Solution: Check environment variables
```

---

## ✅ Step 2: Verify package.json

Your `package.json` should have:

```json
{
  "type": "module",
  "main": "drawkaro-server.js",
  "scripts": {
    "start": "node drawkaro-server.js",
    "dev": "node drawkaro-server.js"
  },
  "dependencies": {
    "ws": "^8.15.0"
  }
}
```

---

## ✅ Step 3: Check drawkaro-server.js

### Verify imports at top:
```javascript
import { WebSocketServer } from 'ws';
import http from 'http';
```

### Should NOT have:
```javascript
const WebSocket = require('ws');  // ❌ OLD SYNTAX
```

### Verify server starts:
```javascript
server.listen(PORT, () => {
  console.log(`🎨 DrawKaro server listening on ws://localhost:${PORT}`);
});
```

---

## ✅ Step 4: Fix Common Issues

### Issue 1: Module Import Error
```javascript
// ❌ WRONG (CommonJS)
const WebSocket = require('ws');
const http = require('http');

// ✅ CORRECT (ES6 modules)
import { WebSocketServer } from 'ws';
import http from 'http';
```

### Issue 2: Missing Environment Variable
```javascript
// Check if PORT env var works
const PORT = process.env.PORT || 8080;
console.log(`Starting on port ${PORT}`);
```

### Issue 3: Server Not Listening
```javascript
// Make sure this is at the end of file:
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## ✅ Step 5: Railway-Specific Fixes

### Check Procfile
```
web: node drawkaro-server.js
```

Should be exactly this. ✅

### Check Build Logs in Railway
```
1. Go to Railway dashboard
2. Click your deployment
3. Go to "Deployments" tab
4. Click the failed deployment
5. Scroll down to "Build logs"
6. Look for error messages
```

### Common Railway Issues

**Issue: "Could not find module"**
```
Fix: Delete node_modules, commit package-lock.json
→ Railway will reinstall
```

**Issue: "Start script failed"**
```
Fix: Check PORT is accessible
→ Railway assigns PORT automatically
```

**Issue: "Application error"**
```
Fix: Check console.log messages in build logs
→ Look for import/require errors
```

---

## ✅ Step 6: Deploy Fix

### Option 1: Fix and Redeploy

```bash
# 1. Fix the error locally
# Edit drawkaro-server.js

# 2. Test locally
npm start
# Should print: "🎨 DrawKaro server listening"

# 3. Commit
git add .
git commit -m "Fix upstream error - fix server startup"

# 4. Push to GitHub
git push origin main

# 5. Railway auto-redeploys
# Check dashboard - should deploy successfully
```

### Option 2: Redeploy Without Changes

If you already fixed it:

```
1. Go to Railway dashboard
2. Click your deployment
3. Click "Redeploy"
4. Wait 2-3 minutes
```

---

## 🔧 Debugging Checklist

```
[ ] npm install works locally
[ ] npm start works locally (not error)
[ ] Procfile exists and is correct
[ ] package.json has correct scripts
[ ] drawkaro-server.js imports are ES6 (import, not require)
[ ] No syntax errors in server.js
[ ] Server listens on process.env.PORT || 8080
[ ] No console errors when starting
[ ] node_modules deleted before committing
[ ] package-lock.json committed
[ ] All changes committed to git
[ ] Pushed to GitHub successfully
```

---

## 📋 Verification Script

Test your server locally first:

```bash
# 1. Install dependencies
npm install

# 2. Start server
npm start

# Should see:
# 🎨 DrawKaro server listening on ws://localhost:8080
# 📡 DrawKaro multiplayer server running
```

If you see that message, server is working! ✅

---

## 🚨 If Still Getting Error

### Check Railway Build Logs

```
Dashboard → Deployments → Failed deployment → Build logs
```

Copy the error and show me, or:

**Common errors:**

```
"Cannot find module 'ws'"
→ Fix: npm install (make sure ws is in package.json)

"SyntaxError: Unexpected token import"
→ Fix: Make sure package.json has "type": "module"

"Error: Cannot bind to 0.0.0.0:8080"
→ Fix: Use process.env.PORT instead of hardcoded 8080

"ReferenceError: require is not defined"
→ Fix: Use import instead of require
```

---

## 🔄 Complete Fix Workflow

```
1. Check local error
   npm start

2. Fix the issue

3. Test locally
   npm start
   # Should work without errors

4. Commit fix
   git add .
   git commit -m "Fix: resolve startup error"

5. Push
   git push origin main

6. Railway redeploys automatically
   Check dashboard after 2-3 minutes

7. If still failing
   Check build logs in Railway dashboard
```

---

## ⚡ Quick Fixes (Try These First)

### Fix 1: Delete and Reinstall Dependencies
```bash
rm -rf node_modules package-lock.json
npm install
npm start
```

### Fix 2: Check package.json
```bash
cat package.json
# Should have:
# "type": "module"
# "scripts": { "start": "node drawkaro-server.js" }
# "dependencies": { "ws": "^8.15.0" }
```

### Fix 3: Verify Imports
```bash
head -5 drawkaro-server.js
# Should be:
# import { WebSocketServer } from 'ws';
# import http from 'http';
```

### Fix 4: Commit and Push
```bash
git add .
git commit -m "Fix: deployment dependencies"
git push origin main
# Railway auto-redeploys
```

---

## ✅ Success Indicators

When fixed, you should see:

```
Railway Dashboard:
✅ Status: "Success" or "Running"
✅ Last deployment: Green checkmark
✅ No error logs

When accessing the app:
✅ No "Upstream error" message
✅ Game loads in browser
✅ Can configure server URL
✅ Can create rooms
```

---

## 🆘 Need More Help?

If still stuck:

```
1. Run npm start locally
2. Copy the error message
3. Show me the error
4. I'll help fix it

Or check:
- package.json (correct dependencies?)
- drawkaro-server.js (correct imports?)
- Procfile (correct command?)
- Build logs in Railway (what's the error?)
```

---

## 📞 Quick Diagnostic Command

Run this to see what's wrong:

```bash
cd C:\Users\Ram\OneDrive\Desktop\files
npm install
npm start
```

If it works → Problem is Railway, not code
If it fails → Shows you the real error

---

**Try the fixes above! If still broken, show me the error output from `npm start`.** 🚀
