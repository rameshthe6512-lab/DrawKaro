# Where to Find Your Railway URL 🔍

Step-by-step guide to find your Railway deployment URL.

---

## 🌐 Method 1: Railway Dashboard (EASIEST)

### Step 1: Go to Railway Website
```
https://railway.app
```

### Step 2: Sign In
- Click "Login"
- Sign in with your GitHub account
- Authorize Railway

### Step 3: Select Your Project
- You should see your projects listed
- Click on "drawkaro" project
- It shows your deployment

### Step 4: Find the URL
Look for one of these sections:

**Option A: "Domains" Tab**
```
Click on "Domains" tab at top
You'll see: https://drawkaro-prod-XXXXXX.up.railway.app
```

**Option B: "Public URL" in Overview**
```
Click "Overview" tab
Look for "Public URL:" section
Shows: https://drawkaro-prod-XXXXXX.up.railway.app
```

**Option C: Service Details**
```
Click on your service/deployment
Scroll down
Look for "Public URL" or "Domain"
Shows the full URL
```

### Step 5: Copy Your URL
- Hover over the URL
- Click copy button (or select and Ctrl+C)
- You have your Railway URL! ✅

---

## 🎯 What You're Looking For

The URL looks like:
```
https://drawkaro-prod-XXXXXX.up.railway.app
                    ↑
                 This changes
                 (your unique ID)
```

Examples:
```
✅ https://drawkaro-prod-a1b2c3d4.up.railway.app
✅ https://drawkaro-prod-xyz789klm.up.railway.app
✅ https://drawkaro-prod-abc123def456.up.railway.app
```

---

## 💻 Method 2: Terminal (If Logged In)

If you have Railway CLI installed and logged in:

```bash
cd C:\Users\Ram\OneDrive\Desktop\files
railway status
```

**Look for this line in the output:**
```
Status: Running ✅
URL: https://drawkaro-prod-XXXXXX.up.railway.app
```

Copy the URL shown there.

---

## ✅ Once You Have the URL

You'll need to convert it for WebSocket:

```
HTTP (for browser):
https://drawkaro-prod-XXXXXX.up.railway.app

WebSocket (for game):
wss://drawkaro-prod-XXXXXX.up.railway.app
     ↑ Just change https to wss
```

---

## 🚀 Complete Steps

1. **Go to:** https://railway.app
2. **Sign in** with GitHub
3. **Click** "drawkaro" project
4. **Find** the URL in Domains or Overview
5. **Copy** the exact URL
6. **Use in game:** Change https→wss and paste

---

## 🎯 Quick Visual Guide

```
railway.app
    ↓
[Sign In with GitHub]
    ↓
[Your Projects]
    ↓
[Click "drawkaro"]
    ↓
[Look for "Public URL" or "Domains" tab]
    ↓
https://drawkaro-prod-XXXXXX.up.railway.app  ← COPY THIS
    ↓
[Change to]
    ↓
wss://drawkaro-prod-XXXXXX.up.railway.app  ← USE THIS IN GAME
```

---

## 📝 Once You Find It

Post your URL here:
```
My Railway URL is: https://drawkaro-prod-XXXXXX.up.railway.app
```

Then I can check it directly and verify everything! ✅

---

**Still can't find it?**

Try these in order:
1. Go to railway.app → Refresh page
2. Make sure you're logged in (check top-right)
3. Look for project named "drawkaro"
4. Click the project name to open it
5. Find "Domains" or "Public URL" section
6. Copy the https:// URL

**The URL will always end with:** `.up.railway.app`
