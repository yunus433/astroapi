const mongoose = require('mongoose');

const User = require('../../models/user/User');

const getUserObject = require('../../utils/getUserObject');

module.exports = (req, res) => {
  if (!req.body || !req.body.id)
    return res.status(400).json({ error: "bad request" });

  User.findById(mongoose.Types.ObjectId(req.body.id), (err, user) => {
    if (err || !user) return res.status(500).json({ error: "Mongo Error: " + err });

    User.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.id), {$set: {
      "wanted_gender": req.body.wanted_gender || user.wanted_gender,
      "description": req.body.description || user.description
    }}, {new: true}, (err, user) => {
      if (err || !user) return res.status(500).json({ error: "Mongo Error: " + err });

      return res.status(200).json({ user: getUserObject(user) });
    });
  });
}
