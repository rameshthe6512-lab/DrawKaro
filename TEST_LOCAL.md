# Test DrawKaro Multiplayer Locally 🧪

## Prerequisites
```bash
cd C:\Users\Ram\OneDrive\Desktop\files
npm install  # Already done if you followed earlier steps
```

## Quick Test (2 tabs, same computer)

### Step 1: Start Server
```bash
npm start
# Should print:
# 🎨 DrawKaro server listening on ws://localhost:8080
# 📡 DrawKaro multiplayer server running
```
**Leave this running!**

### Step 2: Open Game in Browser Tab 1
```
Open drawkaro.html in Chrome/Firefox
```

### Step 3: Configure Server URL
```
Click "🌐 Multiplayer Server Setup"
Enter: ws://localhost:8080
Click "Connect"
→ Should see: "✅ Server URL saved"
```

### Step 4: Create Private Room (Tab 1)
```
Click "🔒 Create private room"
→ Game shows room code (e.g., ABC123)
→ Copy the invite link
```

### Step 5: Open Game in Browser Tab 2
```
Open drawkaro.html in a NEW browser tab
(or open in different browser)
```

### Step 6: Configure Server in Tab 2
```
Same as Step 3:
→ "🌐 Multiplayer Server Setup"
→ ws://localhost:8080
→ Click "Connect"
```

### Step 7: Join Room in Tab 2
```
Click "🔒 Create private room"
→ In the input field, paste the room code from Tab 1
→ Click "Join"
→ You should appear as a player in Tab 1!
```

### Step 8: Start Game
```
In Tab 1, click "Start game!"
→ Both tabs should load the game
→ Player list should show both of you
```

### Step 9: Test Drawing Sync
```
In Tab 1 (if you're the drawer):
→ Draw something on the canvas
→ In Tab 2, you should see it appear in real-time!
→ Try drawing different shapes and colors
```

### Step 10: Test Chat
```
In Tab 2:
→ Type a guess in the chat box
→ Hit Enter
→ In Tab 1, you should see the message!
```

### Step 11: Test Voice Chat
```
In Tab 1:
→ Click 🎙️ button
→ Allow microphone access
→ You should see VU meters showing voice level
→ Speak and watch the bars move!
```

---

## Detailed Testing Checklist

### Server Connection ✅
- [ ] Server starts with `npm start`
- [ ] Shows `ws://localhost:8080` in console
- [ ] Game connects (see 🔗 message)
- [ ] Can create and join rooms

### Room Features ✅
- [ ] Room code displays (6 letters)
- [ ] Invite link copies correctly
- [ ] Second browser joins with code
- [ ] Player list updates when joining
- [ ] Player count shows correctly

### Game Play ✅
- [ ] Game starts for all players
- [ ] Both see same players
- [ ] Both see same timer
- [ ] Both get same word to draw
- [ ] Drawing appears instantly on other client

### Drawing Sync ✅
- [ ] Strokes sync in real-time
- [ ] Multiple strokes queue properly
- [ ] Fill bucket works on both
- [ ] Undo syncs
- [ ] Clear board syncs
- [ ] Color changes sync

### Chat ✅
- [ ] Messages broadcast to all
- [ ] Names display correctly
- [ ] Multiple messages work
- [ ] System messages appear (player joined, etc.)
- [ ] Chat history shows for late joiners

### Voice Chat ✅
- [ ] Mic button activates
- [ ] VU meters show voice level
- [ ] Speaking indicator works
- [ ] Both hear each other
- [ ] Audio quality is good
- [ ] Mic off stops audio

### Game Logic ✅
- [ ] Correct guess detected
- [ ] Points awarded correctly
- [ ] Drawer gets bonus points
- [ ] Scores update in real-time
- [ ] Round ends properly
- [ ] Next round starts automatically
- [ ] Final results show winner

---

## Common Issues & Fixes

### "Cannot connect to server"
```bash
1. Check server is running: npm start
2. Check URL: should be ws://localhost:8080
3. Check no firewall blocking port 8080
4. Restart server and refresh page
```

### "Drawing doesn't sync"
```bash
1. Verify server shows player joined
2. Check browser console (F12) for errors
3. Check drawing is from drawer (not guesser)
4. Verify WebSocket connection (Network tab)
```

### "Mic permission denied"
```bash
1. Check browser settings → Microphone
2. Allow microphone for localhost
3. Try different browser
4. Restart browser and try again
```

### "Voice chat doesn't work"
```bash
1. Verify mic is enabled (🎙️ button green)
2. Check both players have mic enabled
3. Verify same WebSocket server URL
4. Check browser console for WebRTC errors
```

### "Two browsers can't find each other"
```bash
1. Make sure BOTH configured same server URL
2. Make sure BOTH are in same room code
3. Check server logs show both joined
4. Try refreshing both browsers
```

---

## Performance Testing

### Test Bandwidth
```
Normal drawing stroke: ~2-5KB sent
Continuous drawing: ~10KB/sec
Full game: ~15-20KB/sec
Idle: ~0.1KB/sec
```

### Test Latency
```
- Draw on Tab 1
- Measure time until appears in Tab 2
- Should be <100ms on local network
- Could be 100-500ms on internet
```

### Test Stability
```
1. Play a full game (3 rounds)
2. Test with 4 browsers if possible
3. Leave game running 30+ minutes
4. Test mic on/off toggles
5. Verify no memory leaks
```

---

## Advanced Testing

### Test Late Joiner (Replay)
```
1. Tab 1: Create room, start game, draw for 10 sec
2. Tab 2: Join mid-game
3. Tab 2 should see the drawing that was already drawn
4. Verify chat history appears
```

### Test Reconnection
```
1. Create room, start game
2. Kill server with Ctrl+C
3. Game should show "Connection lost"
4. Restart server: npm start
5. Game should reconnect automatically
```

### Test Multiple Rooms
```
1. Tab 1 + Tab 2: Room ABC123
2. Tab 3 + Tab 4: Room XYZ789
3. Start game in both rooms
4. Verify they don't interfere with each other
5. Each room has separate game state
```

---

## Network Inspection

### Open Browser DevTools
```
F12 → Network tab → WS (WebSocket)
```

### Messages to Expect
```
Client sends:
  joinRoom: {"type":"joinRoom","roomCode":"ABC123",...}
  op: {"type":"op","roomCode":"ABC123","t":"s",...}
  chat: {"type":"chat","roomCode":"ABC123","msg":"hello"}
  startGame: {"type":"startGame","roomCode":"ABC123",...}

Server sends:
  roomState: {"type":"roomState","players":[...],"ops":[...]}
  playerJoined: {"type":"playerJoined","player":{...}}
  op: {"type":"op","playerId":"you",...}
  chat: {"type":"chat","playerName":"Bob","msg":"hello"}
```

---

## Server Logs to Check

### Expected Startup
```
🎨 DrawKaro server listening on ws://localhost:8080
📡 DrawKaro multiplayer server running
   ws://localhost:8080
   Rooms auto-clean when empty. Ops & chat replay for latecomers.
```

### Expected Runtime
```
✓ room created: ABC123 (host: Player1)
✓ Player2 joined ABC123 (2/5)
🎮 game started in ABC123
  room ABC123 empty → deleted
```

---

## Test Results Table

Create a table to track your tests:

```
Date: ___________

Test | Status | Notes
-----|--------|------
Server startup | ✅ PASS | Starts correctly
Room creation | ✅ PASS | Code generates
Player join | ✅ PASS | Appears in list
Game start | ✅ PASS | All players load game
Drawing sync | ✅ PASS | <100ms latency
Chat broadcast | ✅ PASS | Messages appear instantly
Voice chat | ✅ PASS | Audio quality good
Late joiner | ✅ PASS | Gets replay
Multiple rooms | ✅ PASS | No interference
Reconnection | ✅ PASS | Automatic
Game completion | ✅ PASS | Scores calculated
Final podium | ✅ PASS | Winner displayed
```

---

## Ready to Deploy?

After all tests pass:

1. ✅ Works locally with 2 browsers
2. ✅ Drawing syncs in real-time
3. ✅ Chat works
4. ✅ Voice chat works
5. ✅ Game completes successfully

**You're ready to deploy to Railway/Render!**

See DEPLOY_NOW.md for deployment instructions.

---

## Deployment Preview

Once deployed, you'll have:
```
Frontend URL: https://yourgame.vercel.app
Server URL: wss://server.railway.app
Invite Link: https://yourgame.vercel.app#room=ABC123
```

Share the frontend URL and invite link with friends!

---

**Test locally first, then deploy with confidence!** 🚀
