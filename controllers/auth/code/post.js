const mongoose = require('mongoose');

const User = require('../../../models/user/User');

const getUserObject = require('../../../utils/getUserObject');

module.exports = (req, res) => {
  const req_time = Date.now();
  const five_min = 300000;

  if (!req.body || !req.body.code || !req.body.id)
    return res.status(400).json({ error: "bad request" });

  User.findById(mongoose.Types.ObjectId(req.body.id), (err, user) => {
    if (err || !user) return res.status(500).json({ error: "user not found" });

    if (user.phone_auth_code == req.body.code) {
      if (user.last_active - req_time > five_min)
        return res.status(400).json({ error: "time limit exceeded" });

      User.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.id), {$set: {
        phone_auth_code: null
      }}, {new: true}, (err, user) => {
        if (err) return res.status(500).json({ error: "unknown error" });

        return res.status(200).json({ user: getUserObject(user) });
      });
    } else {
      return res.status(400).json({ error: "wrong auth code" });
    }
  })
}
