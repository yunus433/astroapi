const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  user_one: {
    type: String,
    required: true
  },
  user_two: {
    type: String,
    required: true
  },
  messages: {
    type: Array,
    default: []
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Chat', ChatSchema);
