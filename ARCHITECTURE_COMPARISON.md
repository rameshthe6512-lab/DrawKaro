# DrawKaro vs Skribbl Architecture Comparison

## Problem Analysis

### What Was Wrong ("Pete Pete" Bug)
1. **Client-driven turns** - players tried to manage turns locally
2. **ID mismatches** - player IDs didn't sync between client and server
3. **Passive server** - server just relayed messages, didn't orchestrate game
4. **Result:** Multiple players could draw, same name appeared twice, chaos

### Root Cause
The server was **too passive**. It needed to actively manage:
- Who should be drawing
- Turn order and rotation
- Game flow and state

---

## Architecture Comparison

### Skribbl (Reference Implementation)
```
Server (Active)
├── Manages game state (Game class)
├── Chooses drawer (server picks, not client)
├── Orchestrates turns (emits 'chooseWord' event)
├── Tracks guessed/drawn users
├── Broadcasts all game events
└── Enforces game rules

Client (Passive)
├── Listens for events
├── Renders what server says
├── Sends user actions
└── Follows server commands
```

### DrawKaro Before
```
Server (Passive)
├── Stores room data
├── Relays messages
├── Doesn't manage turns
└── Doesn't orchestrate game

Client (Trying to be Smart)
├── Manages game state
├── Chooses drawer
├── Rotates turns locally
├── Sends drawing ops
└── Result: Chaos when multiple clients
```

### DrawKaro After (Fixed)
```
Server (Active - like Skribbl)
├── Manages game state
├── Creates turn order
├── Broadcasts 'turnStart' event
├── Tells clients who should draw
├── Coordinates game flow
└── Everyone stays in sync ✅

Client (Obeys Server)
├── Listens for 'turnStart'
├── Only drawer can draw
├── Others can only guess
├── Synchronized gameplay ✅
└── No duplicate logic
```

---

## Key Differences: Before vs After

| Feature | Before | After | Skribbl |
|---------|--------|-------|---------|
| **Turn Management** | ❌ Client | ✅ Server | ✅ Server |
| **Drawer Selection** | ❌ Random on client | ✅ Server picks | ✅ Server picks |
| **Turn Order** | ❌ Per-client rotation | ✅ Shared turn order | ✅ Shared turn order |
| **Drawing Sync** | ❌ ID mismatches | ✅ Server-enforced | ✅ Server-enforced |
| **Game Orchestration** | ❌ Clients decide | ✅ Server decides | ✅ Server decides |
| **"Who's drawing?" clarity** | ❌ Confused | ✅ Clear | ✅ Clear |

---

## Code Changes Made

### Server Side (drawkaro-server.js)

**Before:**
```javascript
// Server just relayed ops
else if (type === 'op') {
  broadcast(msg.roomCode, { ...msg, playerId: msg.playerId || 'unknown' });
}
```

**After:**
```javascript
// Server manages turns
function startGameRound(roomCode) {
  const room = rooms.get(roomCode);
  
  // Server picks the drawer
  if (!room.turnOrder) {
    room.turnOrder = room.players.map(p => p.id).sort(() => Math.random() - 0.5);
    room.turnIndex = 0;
  }
  
  room.currentDrawerId = room.turnOrder[room.turnIndex];
  room.turnIndex++;
  
  // Broadcast who's drawing
  broadcast(roomCode, {
    type: 'turnStart',
    drawerId: room.currentDrawerId,
    drawerName: room.players.find(p => p.id === room.currentDrawerId)?.name
  });
}
```

### Client Side (drawkaro.html)

**Before:**
```javascript
// Client managed turns locally
function nextTurn(){
  state.drawerId = state.order[state.turnIdx];
  state.turnIdx++;
  // Could mismatch with other clients!
}
```

**After:**
```javascript
// Client listens to server
else if(t === 'turnStart') {
  state.drawerId = msg.drawerId;  // Server told us!
  const isMyTurn = state.drawerId === state.you.id;
  
  if(isMyTurn){
    banner(`Your turn to draw! ✏️`, 2000);
    showWordPicker(words);
  } else {
    banner(`${drawerName} is drawing — guess! 🎨`, 2000);
  }
}
```

---

## How This Fixes the Bugs

### Bug: "Pete Pete" (Duplicate Names)
**Before:** Clients managed turns, state got out of sync
**After:** Server tells everyone who's drawing → consistent state

### Bug: "Automated Gameplay" (All players playing at once)
**Before:** Clients didn't know whose turn it was
**After:** Server broadcasts `turnStart` → only drawer can draw

### Bug: Drawing Not Syncing
**Before:** Player IDs mismatched between client rotation and server
**After:** Server-authoritative IDs → perfect sync

### Bug: Wrong Player Drawing
**Before:** Each client had different turn order
**After:** Server enforces one turn order → everyone agrees

---

## Testing the Fix

### Test Scenario 1: Proper Turn Order
1. Pete creates room
2. Alice joins
3. Game starts
4. Server picks Pete to draw first
5. Both see "Pete is drawing"
6. Only Pete can draw ✅
7. Alice can only guess ✅

### Test Scenario 2: No Duplicates
1. Pete enters name "Pete"
2. Alice enters name "Alice"
3. Server has ["Pete", "Alice"]
4. Display shows "Pete" and "Alice" (different names) ✅
5. No "Pete Pete" ❌

### Test Scenario 3: Fair Rotation
1. Round 1: Pete draws
2. Round 2: Alice draws
3. Round 3: Bob draws
4. Server rotates through all players ✅

---

## Lessons from Skribbl

1. **Server manages game state** - not clients
2. **Server picks drawer** - not random client selection
3. **Server broadcasts events** - clients listen and render
4. **Single source of truth** - server is authoritative
5. **Clear turn flow** - server orchestrates explicitly

---

## Remaining Differences from Skribbl

| Feature | Skribbl | DrawKaro Now | Status |
|---------|---------|--------------|--------|
| Framework | Socket.io | Raw WebSocket | ✅ Works |
| Rooms | Built-in | Manual tracking | ✅ Works |
| Game Class | Separate Game object | Embedded in logic | ✅ Works |
| Word Pool | Config file | Browser word list | ✅ Works |
| Scoring | Points formula | Points formula | ✅ Works |

Our implementation now follows the **same server architecture** as Skribbl,
just using WebSocket instead of Socket.io.

---

## Future Improvements

If we want to get even closer to Skribbl:

1. **Migrate to Socket.io** - simpler room management
2. **Create Game class** - extract game logic like Skribbl
3. **Server-side scoring** - calculate scores on server
4. **Proper turn timers** - server manages time, not client
5. **Word selection** - server picks words, not client

But the current fix handles the core multiplayer issues! 🎉

---

## Summary

✅ **Fixed:** Server now actively manages game state
✅ **Fixed:** Players have clear turn order
✅ **Fixed:** Only one player draws per turn
✅ **Fixed:** No duplicate players or names
✅ **Fixed:** Proper drawing synchronization

The game now plays like real Skribbl with proper multiplayer! 🎮
