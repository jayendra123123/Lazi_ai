const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://my-i075y1gpz-jayendra123123s-projects.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

app.use(cors({
  origin: ["http://localhost:3000", "https://my-i075y1gpz-jayendra123123s-projects.vercel.app"]
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.log('❌ MongoDB Error:', err.message));

// Make io accessible to routes
app.set('io', io);

// Import routes
const pollRoutes = require('./routes/polls');
app.use('/api/polls', pollRoutes);

io.on('connection', (socket) => {
  console.log('👤 User connected:', socket.id);

  socket.on('joinPoll', (pollId) => {
    socket.join(`poll_${pollId}`);
    console.log(`User ${socket.id} joined poll ${pollId}`);
  });
  socket.on('vote', async (data) => {
    const { pollId, optionId, userId } = data;
    try {
      const Poll = require('./models/Poll');
      const poll = await Poll.findById(pollId);
      
      if (!poll) return;
      if (poll.votedBy.includes(userId)) return;
      const option = poll.options.id(optionId);
      if (option) {
        option.votes += 1;
        poll.totalVotes += 1;
        poll.votedBy.push(userId);
        await poll.save();
        io.emit('pollUpdated', poll);
      }
    } catch (error) {
      console.error('Vote error:', error);
    }
  });
  socket.on('toggleLike', async (data) => {
    const { pollId, userId } = data;
    try {
      const Poll = require('./models/Poll');
      const poll = await Poll.findById(pollId);
      
      if (!poll) return;

      const isLiked = poll.likedBy.includes(userId);
      if (isLiked) {
        poll.likes -= 1;
        poll.likedBy = poll.likedBy.filter(id => id !== userId);
      } else {
        poll.likes += 1;
        poll.likedBy.push(userId);
      }
      await poll.save();
      io.emit('pollUpdated', poll);
    } catch (error) {
      console.error('Like error:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('👋 User disconnected:', socket.id);
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
