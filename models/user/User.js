const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  last_active: {
    type: Number,
    required: true
  },
  created_at: {
    type: Number,
    required: true
  },
  phone: {
    type: String,
    required: true,
    minlength: 1,
    unique: true
  },
  phone_auth_code: {
    type: String,
    required: true
  },
  name: {
    type: String,
    default: null
  },
  verified: {
    type: Boolean,
    default: false
  },
  completed: {
    type: Boolean,
    default: false
  },
  sunSign: {
    type: String,
  },
  risingSign: {
    type: String,
  },
  profilePhoto: {
    type: String,
    default: ""
  },
  best_match_combination: {
    type: String
  },
  mid_match_combinations: {
    type: Array,
    default: []
  },
  old_matches: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model('User', UserSchema);
