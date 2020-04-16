const mongoose = require('mongoose');

const User = require('../../models/user/User');

const getUserObject = require('../../utils/getUserObject');

module.exports = (req, res) => {
  if (!req.body || !req.body.id || !req.body.month)
    return res.status(400).json({ error: "bad request" });

  User.findById(mongoose.Types.ObjectId(req.body.id), (err, user) => {
    if (err || !user) return res.status(500).json({ error: "Mongo Error: " + err });
    const time = parseInt(req.body.month) * 30 * 24 * 60 * 60 * 1000;

    User.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.id), {$set: {
      "is_premium": true,
      "premium_exp_date": (user.premium_exp_date || (new Date()).getTime()) + time
    }}, {new: true}, (err, user) => {
      if (err || !user) return res.status(500).json({ error: "Mongo Error: " + err });

      return res.status(200).json({ user: getUserObject(user) });
    });
  });
}
