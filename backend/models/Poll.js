const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  votes: {
    type: Number,
    default: 0
  }
});

const pollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true
  },
  options: [optionSchema],
  totalVotes: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  author: {
    type: String,
    default: 'Anonymous'
  },
  votedBy: [{
    type: String
  }],
  likedBy: [{
    type: String
  }],
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Poll', pollSchema);
