const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hashPassword = require('./functions/hashPassword');
const verifyPassword = require('./functions/verifyPassword');

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
  password: {
    type: String,
    minlength: 6
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
    type: String,
    required: true
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

UserSchema.pre('save', hashPassword);

UserSchema.statics.findUser = function (email, password, callback) {
  let User = this;

  User.findOne({email}).then(user => { 
    if (!user) {
      return callback(true);
    }

    verifyPassword(password, user.password, (res) => {
      if (res) return callback(null, user);
      
      return callback(true);
    });
  });
};

module.exports = mongoose.model('User', UserSchema);
