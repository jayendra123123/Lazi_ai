# QuickPoll - Real-Time Polling Platform

A full-stack real-time polling platform with React frontend and Node.js backend.

## 🚀 Features

### Backend (Node.js + Express + MongoDB + Socket.io)

- ✅ RESTful API for polls management
- ✅ Real-time updates using Socket.io
- ✅ MongoDB database for data persistence
- ✅ Vote tracking per user
- ✅ Like/Unlike functionality
- ✅ CORS enabled for frontend integration

### Frontend (React + Tailwind CSS + Socket.io-client)

- ✅ Create polls with multiple options (2-6)
- ✅ Real-time voting with live updates
- ✅ Like polls
- ✅ Sort by trending/recent/popular
- ✅ Responsive design
- ✅ Live connection status indicator
- ✅ Beautiful dark theme UI

## 📋 Prerequisites

Before running the application, ensure you have:

1. **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
2. **MongoDB** - Choose one option:
   - **Option A**: Local MongoDB installation - [Download](https://www.mongodb.com/try/download/community)
   - **Option B**: MongoDB Atlas (Free Cloud) - [Sign up](https://www.mongodb.com/cloud/atlas)

## 🛠️ Installation & Setup

### Step 1: Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../my_app
npm install
```

### Step 2: Setup MongoDB

#### Option A: Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service:

   ```bash
   # Windows (run as Administrator)
   net start MongoDB

   # Mac/Linux
   sudo systemctl start mongod
   ```

3. MongoDB will run on `mongodb://localhost:27017`

#### Option B: MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier)
3. Get your connection string
4. Update `backend/.env` file:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/quickpoll
   ```

### Step 3: Configure Environment Variables

Backend `.env` file is already created at `backend/.env`:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quickpoll
NODE_ENV=development
```

Update `MONGODB_URI` if using MongoDB Atlas.

## 🚀 Running the Application

### Option 1: Run Both Servers Separately

**Terminal 1 - Backend Server:**

```bash
cd backend
npm start
# Server will run on http://localhost:5000
```

**Terminal 2 - Frontend Server:**

```bash
cd my_app
npm start
# App will open at http://localhost:3000
```

### Option 2: Use the Quick Start Scripts

**Windows (PowerShell):**

```powershell
# Backend
cd backend
npm start

# Frontend (in another terminal)
cd my_app
npm start
```

## 📡 API Endpoints

### REST API

- `GET /api/polls` - Get all polls
- `GET /api/polls/:id` - Get single poll
- `POST /api/polls` - Create new poll
- `POST /api/polls/:id/vote` - Vote on a poll
- `POST /api/polls/:id/like` - Like/unlike a poll
- `DELETE /api/polls/:id` - Delete a poll
- `GET /api/health` - Health check

### WebSocket Events

**Client → Server:**

- `vote` - Submit a vote
- `toggleLike` - Toggle like on a poll
- `joinPoll` - Join a specific poll room

**Server → Client:**

- `pollUpdated` - Broadcast when poll data changes

## 🧪 Testing the Application

1. Open http://localhost:3000 in your browser
2. You should see "Live" status indicator (green) in the header
3. Create a new poll using the "Create" button
4. Open the same URL in another browser/incognito window
5. Vote on the poll in one browser
6. Watch it update in real-time in the other browser! 🎉

## 📁 Project Structure

```
interview_ai/
├── backend/
│   ├── models/
│   │   └── Poll.js           # MongoDB Poll schema
│   ├── routes/
│   │   └── polls.js          # API routes
│   ├── server.js             # Express server + Socket.io
│   ├── package.json
│   └── .env
└── my_app/
    ├── src/
    │   ├── components/
    │   │   ├── Home.jsx              # Main poll container
    │   │   ├── PollCard.jsx          # Individual poll card
    │   │   ├── PollHeader.jsx        # Header with tabs
    │   │   ├── CreatePollModal.jsx   # Create poll modal
    │   │   └── AIInterviewPlatform.jsx
    │   ├── services/
    │   │   ├── api.js                # REST API calls
    │   │   └── socketService.js      # Socket.io client
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## 🔧 Troubleshooting

### MongoDB Connection Issues

- **Error**: `MongoNetworkError: failed to connect to server`
  - **Solution**: Make sure MongoDB is running. Check with `mongod --version`

### Port Already in Use

- **Error**: `Port 5000 is already in use`
  - **Solution**: Change PORT in `backend/.env` to another port (e.g., 5001)

### Socket Connection Failed

- **Error**: Connection status shows "Offline"
  - **Solution**:
    1. Ensure backend server is running
    2. Check that ports match in frontend and backend
    3. Check browser console for errors

### CORS Issues

- **Error**: `Access-Control-Allow-Origin`
  - **Solution**: CORS is already configured for `http://localhost:3000`
  - If using different port, update in `backend/server.js`

## 🎯 Assignment Completion Checklist

- ✅ Users can create polls with multiple options
- ✅ Users can submit votes for polls
- ✅ Users can like polls
- ✅ System reflects updates live across all users
- ✅ Backend manages polls, votes, likes, and interactions
- ✅ Frontend displays polls, results, and interactions in real-time
- ✅ Responsive and user-friendly design
- ✅ Visually clear interface

## 🌟 Features Implemented

1. **Real-time Updates**: Socket.io for instant synchronization
2. **Persistent Storage**: MongoDB for data persistence
3. **Vote Tracking**: Users can vote only once per poll
4. **Like System**: Like/unlike functionality with tracking
5. **Sorting Options**: Trending (by likes), Recent (by time), Popular (by votes)
6. **Responsive Design**: Works on mobile, tablet, and desktop
7. **Connection Status**: Live indicator showing real-time connection status
8. **Error Handling**: Graceful fallbacks and error messages
9. **Optimistic Updates**: Instant UI updates with server sync

## 📝 Technologies Used

**Frontend:**

- React 19
- Tailwind CSS
- Socket.io-client
- Axios
- Lucide React (icons)

**Backend:**

- Node.js
- Express.js
- MongoDB (Mongoose)
- Socket.io
- CORS

## 🚀 Deployment (Optional)

For production deployment:

**Backend:**

- Deploy to: Heroku, Railway, Render, or DigitalOcean
- Use MongoDB Atlas for database

**Frontend:**

- Deploy to: Vercel, Netlify, or GitHub Pages
- Update Socket.io URL to production backend URL

## 📧 Support

If you encounter any issues, check:

1. MongoDB is running
2. Both servers are running
3. Ports are correct
4. Dependencies are installed

---

**Made with ❤️ for the company assignment**
