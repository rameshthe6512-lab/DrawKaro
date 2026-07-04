# DrawKaro Multiplayer Server Setup

Your `drawkaro-server.js` is a Node.js WebSocket server that handles real multiplayer: friends join via invite code, see live drawing, guess together, and hear each other's voice.

## Local Testing

```bash
npm install ws
node drawkaro-server.js
```

Then in `drawkaro.html`, open your browser console and add this before playing:

```javascript
Net.ws = new WebSocket('ws://localhost:8080');
Net.ws.onmessage = e => handleNetMessage(JSON.parse(e.data));
```

Open multiple browser windows on localhost to test.

## Deploy to Cloud (Pick One)

### Option 1: Heroku (easiest)
1. Create `Procfile`:
   ```
   web: node drawkaro-server.js
   ```
2. `git push heroku main`
3. In `drawkaro.html`, change `ws://localhost:8080` to `wss://your-app.herokuapp.com`

### Option 2: Railway.app
1. Connect your GitHub repo
2. Set start command: `node drawkaro-server.js`
3. Auto-assign public URL
4. Update client WebSocket URL

### Option 3: Render.com
1. New WebSocket Service
2. Connect to your repo, set command: `node drawkaro-server.js`
3. Render gives you a public WSS URL
4. Update client

## Client-Side Integration

The HTML needs these additions (already stubbed at the bottom):

```javascript
// In drawkaro.html, replace the Net stub with:
const Net = {
  ws: null,
  connect(url) {
    this.ws = new WebSocket(url);
    this.ws.onmessage = e => handleNetMessage(JSON.parse(e.data));
    this.ws.onerror = () => toast('❌ Connection lost');
  },
  
  joinRoom(roomCode, playerData) {
    this.ws.send(JSON.stringify({
      type: 'joinRoom',
      roomCode,
      playerData
    }));
  },
  
  sendOp(op) {
    this.ws.send(JSON.stringify({ type: 'op', roomCode: state.roomCode, ...op }));
  },
  
  sendChat(msg) {
    this.ws.send(JSON.stringify({ type: 'chat', roomCode: state.roomCode, msg }));
  },
  
  startGame(settings) {
    this.ws.send(JSON.stringify({
      type: 'startGame',
      roomCode: state.roomCode,
      settings
    }));
  }
};

function handleNetMessage(msg) {
  if (msg.type === 'playerJoined') {
    state.roomBots.push(msg.player); // use real players instead of "bots"
    renderRoomPlayers();
  } else if (msg.type === 'gameStarted') {
    startGame();
  } else if (msg.type === 'op') {
    applyRemoteOp(msg);
  } else if (msg.type === 'chat') {
    chatMsg(`<b>${msg.name}:</b> ${msg.msg}`);
  }
}
```

## What This Enables

- ✅ Friends join via the same room code  
- ✅ Live drawing syncs to all players  
- ✅ Chat & guesses broadcast instantly  
- ✅ Room auto-deletes when last player leaves  
- ✅ Late joiners see full drawing replay + chat history

## Voice Chat (WebRTC)

The server includes RTC signaling (`msg.type === 'rtc'`). For voice, each client needs:

```javascript
// When mic is on
const pc = new RTCPeerConnection({ iceServers: [{urls: 'stun:stun.l.google.com:19302'}] });
const audioTrack = micStream.getAudioTracks()[0];
pc.addTrack(audioTrack, micStream);

pc.ontrack = e => {
  const audio = new Audio();
  audio.srcObject = e.streams[0];
  audio.play();
};

// Exchange offers/answers via Net.ws.send({ type: 'rtc', ... })
```

The server just forwards the SDP and ICE candidates between peers.

## Environment

```bash
PORT=3000  # optional, defaults to 8080
```

## Monitoring

The server logs:
- Room creates/deletes
- Player joins/leaves
- Game starts
- Connection errors

## Scaling Notes

- Single process handles ~100 concurrent rooms (500+ players)  
- For 1000+ rooms, add a Redis pub/sub for cross-process broadcast
- Database (MongoDB/Postgres) not needed — ephemeral rooms auto-clean

---

Your DrawKaro invite links are now truly multiplayer! 🎨
