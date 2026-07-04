# Deployment Checklist ✅

## Pre-Deployment

- [ ] Local testing works (`npm start` → `ws://localhost:8080`)
- [ ] Multiplayer room creation works
- [ ] Drawing sync is working
- [ ] Chat messages broadcast
- [ ] Voice chat negotiates
- [ ] All players see the same game state
- [ ] Late joiners get replay of drawings

---

## Heroku Deployment

### Prerequisites
```bash
npm install -g heroku
heroku login
```

### Deploy
```bash
# One-time setup
git init
git add .
git commit -m "Initial DrawKaro deploy"

heroku create your-app-name
git push heroku main

# Get your URL
heroku apps:info your-app-name
```

### Post-Deploy Checklist
- [ ] `heroku logs` shows no errors
- [ ] Server running message appears
- [ ] Copy WSS URL from dashboard
- [ ] Test game with server URL: `wss://your-app-name.herokuapp.com`
- [ ] Create room and verify multiplayer works
- [ ] Share invite link with friends

### Troubleshooting
```bash
# View logs
heroku logs --tail

# Restart app
heroku restart

# Check dyno status
heroku ps

# Scale dynos if needed (costs money)
heroku ps:scale web=2
```

---

## Railway.app Deployment

### Prerequisites
- GitHub account connected
- Repository created

### Deploy
1. Go to railway.app
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Choose your DrawKaro repo
5. Click Deploy

### Post-Deploy Checklist
- [ ] Build completes without errors
- [ ] Copy the public URL from dashboard
- [ ] Ensure URL starts with `wss://`
- [ ] Test game with server URL
- [ ] Create room and verify players join
- [ ] Voice chat works

---

## Render.com Deployment

### Prerequisites
- GitHub account connected
- Repository created

### Deploy
1. Go to render.com
2. Click "New +"
3. Select "Web Service"
4. Choose your GitHub repo
5. Set build command: `npm install`
6. Set start command: `npm start`
7. Click Deploy

### Post-Deploy Checklist
- [ ] Deployment completes successfully
- [ ] Copy the Public URL from dashboard
- [ ] Ensure URL starts with `wss://`
- [ ] Test with server URL in game
- [ ] Verify multiplayer functionality

---

## Docker Deployment

### Build
```bash
docker build -t drawkaro .
```

### Run Locally
```bash
docker run -p 8080:8080 drawkaro
# Server on ws://localhost:8080
```

### Push to Docker Hub
```bash
docker login
docker tag drawkaro yourusername/drawkaro
docker push yourusername/drawkaro
```

### Deploy to Cloud
- **AWS ECS**: Use Docker image
- **Google Cloud Run**: Use Docker image
- **Digital Ocean**: Deploy Docker image
- **Azure**: Use Container Instances

---

## Custom Domain (Optional)

### Heroku
```bash
heroku domains:add yourdomain.com
# Update DNS records as shown by Heroku
```

### Railway/Render
- Both support custom domains in dashboard
- Update DNS CNAME to point to their servers

---

## SSL/TLS (WSS Protocol)

✅ **Heroku** - Automatic SSL
✅ **Railway** - Automatic SSL
✅ **Render** - Automatic SSL
✅ **Docker on Cloud** - Use reverse proxy (nginx)

---

## Environment Variables

```bash
# Optional (defaults to 8080)
PORT=3000

# Add to .env file (not version controlled)
# Or set in cloud platform dashboard
```

---

## Performance Optimization

### Server-Side
```javascript
// In drawkaro-server.js
// Limit room ops storage to prevent memory issues
if(room.ops.length > 500) room.ops.shift();
if(room.messages.length > 100) room.messages.shift();
```

### Client-Side
```javascript
// In drawkaro.html
// Limit chat history rendering
while(list.children.length > 60) list.firstChild.remove();
```

### Scaling (If Needed)
```bash
# Heroku - scale web dynos
heroku ps:scale web=2

# Render/Railway - auto-scaling available in paid plans
```

---

## Monitoring

### Logs
```bash
# Heroku
heroku logs --tail

# Docker (local)
docker logs -f container_id
```

### Metrics to Watch
- WebSocket connections active
- Room count
- Memory usage
- Error rates
- Average response time

### Common Errors

**"Connection refused"**
- Server not running
- Wrong port in URL
- Firewall blocking

**"Cannot find module 'ws'"**
```bash
npm install
```

**"Port already in use"**
```bash
# Change PORT env var or kill process
PORT=3001 npm start
```

**"WSS URL not working"**
- Must use `wss://` for HTTPS domains
- Certificate must be valid
- Not valid for `localhost`

---

## Security Considerations

✅ **Currently Safe:**
- No user data stored
- No authentication required (intended for friends)
- WebRTC is peer-to-peer (no server sees voice)
- No sensitive info in messages

⚠️ **If Adding Auth:**
- Validate all input server-side
- Hash passwords (bcrypt)
- Use HTTPS/WSS only
- Implement rate limiting
- Add CORS headers

---

## Testing the Deployment

### Test Multiplayer
```javascript
// Open 2 browser tabs with different names
// Room A: Player1
// Room A: Player2
// Start game and verify:
// ✓ Drawing syncs
// ✓ Chat broadcasts
// ✓ Scores update for all players
// ✓ Game ends at the same time
```

### Test Voice Chat
```javascript
// With both players in game:
// ✓ Click 🎙️ button
// ✓ Bars show voice level
// ✓ Other player hears audio
// ✓ Mute works properly
```

### Test Edge Cases
```javascript
// ✓ Join mid-game (should see replay)
// ✓ Leave and rejoin (cleans up properly)
// ✓ Refresh page (reconnects to room)
// ✓ Mobile browser (responsive layout)
// ✓ Slow network (graceful degradation)
```

---

## Post-Launch

- [ ] Share game URL with friends
- [ ] Monitor server logs daily
- [ ] Document any issues
- [ ] Plan enhancements
- [ ] Gather user feedback

---

## Rollback (If Needed)

### Heroku
```bash
heroku releases
heroku rollback v5  # Go to previous version
```

### Railway/Render
- Deployments tab shows all versions
- Click "Revert" to previous version

### Docker
```bash
docker run -p 8080:8080 drawkaro:previous-version
```

---

## Success Criteria ✅

You've successfully deployed DrawKaro when:

1. ✅ Server is running on cloud platform
2. ✅ Game opens in browser without errors
3. ✅ Multiplayer room creation works
4. ✅ Real players can join via code/link
5. ✅ Drawing syncs to all players
6. ✅ Chat messages broadcast correctly
7. ✅ Voice chat (WebRTC) negotiates
8. ✅ Multiple concurrent rooms work
9. ✅ Invite links work for new players
10. ✅ Game works on mobile browsers

---

**You're ready to go live! Have fun playing DrawKaro with friends!** 🎨🚀
