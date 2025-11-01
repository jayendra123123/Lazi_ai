# 🚀 Quick Start Guide

## ⚡ Fastest Way to Run QuickPoll

### Step 1: MongoDB Setup (Choose One)

#### ⭐ RECOMMENDED: MongoDB Atlas (FREE Cloud - No Installation)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up (free)
3. Create FREE M0 cluster
4. Create database user (remember password!)
5. Add IP: 0.0.0.0/0 (allow all)
6. Get connection string
7. Update `backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/quickpoll
   ```

#### OR: Local MongoDB (If Already Installed)

```powershell
# Windows
net start MongoDB

# Keep default in backend/.env:
# MONGODB_URI=mongodb://localhost:27017/quickpoll
```

### Step 2: Start Backend

```powershell
cd backend
node server.js
```

✅ You should see:

```
🚀 Server running on port 5000
✅ MongoDB Connected
```

### Step 3: Start Frontend (New Terminal)

```powershell
cd my_app
npm start
```

✅ Browser opens at http://localhost:3000

### Step 4: Test Real-Time Features

1. **Check Connection**: Look for green "Live" badge in header
2. **Create Poll**: Click "Create" button
3. **Test Real-Time**:
   - Open http://localhost:3000 in another browser/incognito
   - Vote in one → See update in other! 🎉

## 🎯 What You Should See

### Backend Terminal:

```
🚀 Server running on port 5000
✅ MongoDB Connected
👤 User connected: abc123
```

### Frontend:

- Green "Live" indicator in header
- Sample polls or "Create First Poll" button
- Smooth, responsive interface

## ❌ Troubleshooting

### MongoDB Error?

- **Not using Atlas?** Install MongoDB or use MongoDB Atlas (easier!)
- **Using Atlas?** Check connection string format and password

### Port 5000 Already in Use?

```powershell
# Change backend port
# In backend/.env, change: PORT=5001

# Update frontend to match
# In my_app/src/services/api.js: change 5000 to 5001
# In my_app/src/services/socketService.js: change 5000 to 5001
```

### Still Issues?

1. Check both servers are running
2. Check console for errors (F12)
3. Try restarting both servers

## 📚 Full Documentation

- **Complete Setup**: See `README.md`
- **MongoDB Setup**: See `backend/SETUP.md`
- **Assignment Details**: See `ASSIGNMENT_REPORT.md`

---

**That's it! You're ready to demo! 🎉**
