#!/usr/bin/env node
/**
 * DrawKaro Server
 * WebSocket-based multiplayer backend for DrawKaro game.
 * Handles: room management, player join/leave, game state sync, drawing ops, chat, voice signaling.
 *
 * Usage: npm install ws && node drawkaro-server.js
 * Connect from client: ws://localhost:8080
 */
import { WebSocketServer } from 'ws';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  // Serve HTML on root
  if (req.url === '/' || req.url === '/drawkaro.html') {
    fs.readFile(path.join(__dirname, 'drawkaro.html'), 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error loading drawkaro.html');
        console.error('Error reading drawkaro.html:', err);
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found - Visit / for DrawKaro game');
  }
});

const wss = new WebSocketServer({ server });

// State
const rooms = new Map(); // roomCode -> {code, host, players, gameState, currentDrawerId, turnIndex, ...}
const clients = new Map(); // ws -> {playerId, roomCode, playerData}
const socketsToRooms = new Map(); // ws -> roomCode (for broadcast)

console.log(`🎨 DrawKaro server listening on ws://localhost:${PORT}`);

wss.on('connection', (ws) => {
  const clientId = Math.random().toString(36).slice(2, 9);
  let joined = null; // { roomCode, playerId }

  ws.on('message', (data) => {
    try {
      const msg = JSON.parse(data);
      handleMessage(ws, msg, clientId);
    } catch (err) {
      ws.send(JSON.stringify({ type: 'error', msg: 'Invalid message' }));
    }
  });

  ws.on('close', () => {
    if (joined) {
      const room = rooms.get(joined.roomCode);
      if (room) {
        room.players = room.players.filter(p => p.id !== joined.playerId);
        broadcast(room.code, { type: 'playerLeft', playerId: joined.playerId });
        if (room.players.length === 0) {
          rooms.delete(room.code);
          console.log(`  room ${room.code} empty → deleted`);
        } else {
          console.log(`  ${joined.playerId} left ${room.code} (${room.players.length} remain)`);
        }
      }
    }
    clients.delete(ws);
  });

  ws.on('error', (err) => {
    console.error('  ws error:', err.message);
  });
});

function handleMessage(ws, msg, clientId) {
  const type = msg.type;

  if (type === 'joinRoom') {
    joinRoom(ws, msg, clientId);
  } else if (type === 'startGame') {
    startGame(ws, msg);
  } else if (type === 'op') {
    broadcast(msg.roomCode, { ...msg, playerId: msg.playerId || 'unknown' });
  } else if (type === 'chat') {
    broadcast(msg.roomCode, msg);
  } else if (type === 'guess') {
    broadcast(msg.roomCode, msg);
  } else if (type === 'rtc') {
    // WebRTC signaling: offer/answer/ice - forward directly to target player
    const client = clients.get(ws);
    if (client) {
      msg.fromPlayerId = client.playerId;
      forwardToPlayer(msg.roomCode, msg.targetPlayerId, msg);
    }
  } else {
    ws.send(JSON.stringify({ type: 'error', msg: 'Unknown message type: ' + type }));
  }
}

function joinRoom(ws, msg, clientId) {
  const { roomCode, playerData } = msg;
  let room = rooms.get(roomCode);

  if (!room) {
    room = {
      code: roomCode,
      host: playerData.id,
      settings: { players: 5, lang: 'en', drawTime: 60, rounds: 3, wordCount: 3, hints: 2, mode: 'normal', customWords: [], customOnly: false },
      players: [],
      gameState: 'lobby',
      ops: [],
      messages: [],
    };
    rooms.set(roomCode, room);
    console.log(`✓ room created: ${roomCode} (host: ${playerData.name})`);
  }

  if (room.players.length >= room.settings.players) {
    ws.send(JSON.stringify({ type: 'error', msg: 'Room is full' }));
    return;
  }

  // Add player to room
  const player = { ...playerData, joinedAt: Date.now() };
  room.players.push(player);
  clients.set(ws, { playerId: player.id, roomCode, playerData });

  console.log(`✓ ${playerData.name} joined ${roomCode} (${room.players.length}/${room.settings.players})`);

  // Send current room state to joiner
  const roomStateMsg = {
    type: 'roomState',
    roomCode,
    players: room.players,
    settings: room.settings,
    gameState: room.gameState,
    ops: room.ops.slice(-100), // last 100 ops for replay
    messages: room.messages.slice(-50),
  };
  console.log(`📤 Sending roomState to ${playerData.name}:`, {
    roomCode,
    playerCount: room.players.length,
    players: room.players.map(p => ({id: p.id, name: p.name}))
  });
  ws.send(JSON.stringify(roomStateMsg));

  // Broadcast join to others
  broadcast(roomCode, {
    type: 'playerJoined',
    player,
  });
}

function startGame(ws, msg) {
  const { roomCode, settings } = msg;
  const room = rooms.get(roomCode);
  if (!room) return;

  // Validate host
  const client = clients.get(ws);
  if (!client) return;

  // For now, allow any player to start (makes testing easier)
  // In production, you might want to validate host
  if (room.players.length < 1) {
    ws.send(JSON.stringify({ type: 'error', msg: 'Need at least 1 player to start' }));
    return;
  }

  room.settings = settings || room.settings;
  room.gameState = 'playing';
  room.ops = [];
  room.messages = [];
  room.turnOrder = room.players.map(p => p.id).sort(() => Math.random() - 0.5);
  room.turnIndex = 0;

  console.log(`🎮 game started in ${roomCode} (${room.players.length} players)`);

  broadcast(roomCode, {
    type: 'gameStarted',
    players: room.players,
    settings: room.settings,
  });

  // Start first turn
  setTimeout(() => startGameRound(roomCode), 500);
}

function broadcast(roomCode, msg) {
  const room = rooms.get(roomCode);
  if (!room) return;

  const payload = JSON.stringify(msg);
  for (const [ws, client] of clients) {
    if (client.roomCode === roomCode) {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(payload);
      }
    }
  }

  // Persist ops and chat for late joiners
  if (msg.type === 'op') {
    room.ops.push(msg);
    if (room.ops.length > 500) room.ops.shift();
  } else if (msg.type === 'chat') {
    room.messages.push(msg);
    if (room.messages.length > 100) room.messages.shift();
  }
}

function startGameRound(roomCode) {
  const room = rooms.get(roomCode);
  if (!room || room.gameState !== 'playing') return;

  // Set up turn order if not already done
  if (!room.turnOrder) {
    room.turnOrder = room.players.map(p => p.id).sort(() => Math.random() - 0.5);
    room.turnIndex = 0;
  }

  // Get current drawer
  if (room.turnIndex >= room.turnOrder.length) {
    room.turnIndex = 0;
  }

  room.currentDrawerId = room.turnOrder[room.turnIndex];
  room.turnIndex++;

  // Announce who's drawing
  broadcast(roomCode, {
    type: 'turnStart',
    drawerId: room.currentDrawerId,
    drawerName: room.players.find(p => p.id === room.currentDrawerId)?.name
  });

  console.log(`🎨 ${room.currentDrawerId} is drawing in room ${roomCode}`);
}

function forwardToPlayer(roomCode, targetPlayerId, msg) {
  for (const [ws, client] of clients) {
    if (client.roomCode === roomCode && client.playerId === targetPlayerId) {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(msg));
      }
      break;
    }
  }
}

server.listen(PORT, () => {
  console.log(`\n📡 DrawKaro multiplayer server running`);
  console.log(`   ws://localhost:${PORT}`);
  console.log(`\n   Rooms auto-clean when empty. Ops & chat replay for latecomers.\n`);
});
