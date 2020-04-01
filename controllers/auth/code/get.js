const mongoose = require('mongoose');

const User = require('../../../models/user/User');

module.exports = (req, res) => {
  if (!req.query || !req.query.id)
    return res.status(400).json({ error: "bad request" });

  User.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {$set: {
    phone_auth_code: Math.floor(100000 + Math.random() * 900000),
    created_at: Date.now()
  }}, {new: true}, (err, user) => {
    if (err | !user) return res.status(500).json({ error: "mongodb error" });

    sendSMS({
      phone: user.phone,
      subject: "AstroApp",
      message: `Your Astro app verification code is ${user.phone_auth_code}`
    }, (err, result) => {
      if (err) return res.status(500).json({ error: "aws sns error" });

      return res.status(200).json({ user_id: user._id });
    });
  });
}
