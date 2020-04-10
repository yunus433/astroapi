const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  phone: {
    type: String,
    required: true,
    minlength: 1,
    unique: true
  },
  last_active: {
    type: Number,
    required: true
  },
  created_at: {
    type: Number,
    required: true
  },
  phone_auth_code: {
    type: String,
    required: true
  },
  name: {
    type: String,
    default: ""
  },
  gender: {
    type: String,
    default: ""
  },
  wanted_gender: {
    type: String,
    default: ""
  },
  city: {
    type: String,
    default: ""
  },
  country: {
    type: String,
    default: ""
  },
  age_interval: {
    type: Object,
    default: {}
  },
  birth_time: {
    type: Object,
    default: {}
  },
  birth_location: {
    type: Object,
    default: {}
  },
  completed: {
    type: Boolean,
    default: false
  },
  is_premium: {
    type: Boolean,
    default: false
  },
  sign: {
    type: String,
    default: ""
  },
  sign_id: {
    type: Number,
    default: -1
  },
  sign_combination: {
    type: String,
    default: ""
  },
  profile_photo_list: {
    type: Array,
    default:[] 
  },
  best_matches: {
    type: Array,
    default: []
  },
  mid_matches: {
    type: Array,
    default: []
  },
  old_matches: {
    type: Array,
    default: []
  },
  matched_users: {
    type: Array,
    default: []
  },
  chat_list: {
    type: Array,
    default: []
  },
  notification_permission: {
    type: Boolean,
    default: false
  },
  notification_token: {
    type: String,
    default: ""
  },
  language_preference: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model('User', UserSchema);
