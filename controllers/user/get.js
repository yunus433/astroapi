const mongoose = require('mongoose');

const User = require('../../models/user/User');

const getUserObject = require('../../utils/getUserObject');

module.exports = (req, res) => {
  if (!req.query || !req.query.id)
    return res.status(400).json({ error: "Bad request" });

  User.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {$set: {
    last_active: Date.now()
  }}, {new: true}, (err, user) => {
    if (err) return res.status(500).json({ error: "Mongo Error: " + err });

    User.collection.createIndex({ last_active: 1 }, (err, result) => {
      if (err) return res.status(500).json({ error: "Mongo Error: " + err });

      return res.status(200).json({ user: getUserObject(user) });
    });
  });
};
