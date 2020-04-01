const mongoose = require('mongoose');

const User = require('../../../models/user/User');

module.exports = (req, res) => {
  const req_time = Date.now();
  const five_min = 300000;

  if (!req.body || !req.body.code || !req.body.id)
    return res.status(400).json({ error: "bad request" });

  User.findById(mongoose.Types.ObjectId(req.body.id), (err, user) => {
    if (err || !user) return res.status(500).json({ error: "user not found" });

    if (user.phone_auth_code == req.body.code && user.created_at - req_time <= five_min) {
      User.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.id), {$set: {
        phone_auth_code: null,
        verified: true
      }}, {new: true}, (err, user) => {
        if (err) return res.status(500).json({ error: "unknown error" });

        return res.status(200).json({ user });
      });
    } else {
      return res.status(400).json({
        error: "wrong auth code",
        user_id: user._id
      });
    }
  })
}
