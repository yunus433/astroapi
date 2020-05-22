const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlockSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  profile_photo_list: {
    type: Array,
    required: true
  },
  user_two_id: {
    type: String,
    required: true
  },
  chat_id: {
    type: String,
    default: ""
  },
  on_chat: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Block', BlockSchema);
