const express = require('express');
const router = express.Router();
const Poll = require('../models/Poll');

router.get('/', async (req, res) => {
  try {
    const polls = await Poll.find().sort({ timestamp: -1 });
    res.json(polls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }
    res.json(poll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post('/', async (req, res) => {
  const { question, options, author } = req.body;
  if (!question || !options || options.length < 2) {
    return res.status(400).json({ 
      message: 'Question and at least 2 options are required' 
    });
  }
  const poll = new Poll({
    question,
    options: options.map(text => ({ text, votes: 0 })),
    author: author || 'Anonymous',
    totalVotes: 0,
    likes: 0,
    votedBy: [],
    likedBy: []
  });
  try {
    const newPoll = await poll.save();
    
    // Emit socket event for real-time updates
    const io = req.app.get('io');
    if (io) {
      io.emit('pollCreated', newPoll);
    }
    
    res.status(201).json(newPoll);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Vote on a polls
router.post('/:id/vote', async (req, res) => {
  const { optionId, userId } = req.body;

  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }
    if (poll.votedBy.includes(userId)) {
      return res.status(400).json({ message: 'Already voted' });
    }
    const option = poll.options.id(optionId);
    if (!option) {
      return res.status(404).json({ message: 'Option not found' });
    }
    option.votes += 1;
    poll.totalVotes += 1;
    poll.votedBy.push(userId);
    await poll.save();
    
    // Emit socket event for real-time updates
    const io = req.app.get('io');
    if (io) {
      io.emit('pollUpdated', poll);
    }
    
    res.json(poll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Like/Unlike a polls
router.post('/:id/like', async (req, res) => {
  const { userId } = req.body;
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }
    const isLiked = poll.likedBy.includes(userId);
    if (isLiked) {
      poll.likes -= 1;
      poll.likedBy = poll.likedBy.filter(id => id !== userId);
    } else {
      poll.likes += 1;
      poll.likedBy.push(userId);
    }
    await poll.save();
    
    // Emit socket event for real-time updates
    const io = req.app.get('io');
    if (io) {
      io.emit('pollUpdated', poll);
    }
    
    res.json(poll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Delete a poll
router.delete('/:id', async (req, res) => {
  try {
    const poll = await Poll.findByIdAndDelete(req.params.id);
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }
    res.json({ message: 'Poll deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
