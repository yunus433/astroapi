const mongoose = require('mongoose');

const User = require('../../models/user/User');

const getUserObject = require('../../utils/getUserObject');

module.exports = (req, res) => {
  if (!req.body || !req.body.id || !req.body.token)
    return res.status(400).json({ error: 'bad request' });

  User.findByIdAndUpdate(
    mongoose.Types.ObjectId(req.body.id),
    {
      notification_token: req.body.token,
      notification_permission: req.body.permission
    },
    {new: true},
    (err, user) => {
      if (err) return res.status(500).json({ error: 'mongo error: ' + err });

      return res.status(200).json({ user: getUserObject(user) });
    }
  );
}
