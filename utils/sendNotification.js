const mongoose = require('mongoose');
const FCM = require('fcm-node');

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

    const fcm = new FCM(process.env.FCM_SERVER_KEY);

    const message = { 
      to: user.notification_token, 
      collapse_key: process.env.FCM_COLLAPSE_KEY,
      
      notification: {
        title: data.message.title, 
        body: data.message.content 
      }
    };

    fcm.send(message, (err, response) => {
      if (err) return callback(err);

      return callback(null, { success: true });
    });
  });
}
