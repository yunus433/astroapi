const mongoose = require('mongoose');
const OneSignal = require('onesignal-node'); 

const User = require('../models/user/User');

module.exports = (data, callback) => {
  if (!data || !data.to || !data.message)
    return callback("bad request");

  User.findById(mongoose.Types.ObjectId(data.to), (err, user) => {
    if (err) return callback(err);

    if (!user.notication_permission || !user.notification_token)
      return callback(null, {
        success: false,
        reason: "Notifications not permitted or token not found."
      });

    return callback(null, { success: true });
  });
}
