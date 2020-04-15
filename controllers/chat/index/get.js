const mongoose = require('mongoose');

const User = require('../../../models/user/User');
const Chat = require('../../../models/chat/Chat');

const getMessageObject = require('../../../utils/getMessageObject');

const getChatObjects = (chat_list, tz, user_id) => {
  const new_list = [];

  chat_list.forEach(chat => {
    new_list.push({
      _id: chat._id,
      user_one: chat.user_one,
      user_two: chat.user_two,
      last_message: chat.messages.length ? getMessageObject(chat.messages[chat.messages.length-1], tz) : null,
      total_message_number: chat.messages.filter(message => {return (message.sended_by != user_id && !message.read)}).length,
      access_permission: chat.access_permission
    });
  });

  return new_list;
}

module.exports = (req, res) => {
  if (!req.query || !req.query.id)
    return res.status(400).json({ error: "bad request" });

  User.findById(mongoose.Types.ObjectId(req.query.id), (err, user) => {
    if (err || !user) return res.status(400).json({ error: "user not found" });

    Chat.find({
      $or: [
        {"user_one._id": mongoose.Types.ObjectId(req.query.id)},
        {"user_two._id": mongoose.Types.ObjectId(req.query.id)}
      ]
    })
    .sort({created_at: 1})
    .then(chat_list => {
      return res.status(200).json({ chat_list: getChatObjects(chat_list, user.time_zone, user._id.toString()) });
    })
    .catch(err => {
      return res.status(500).json({ error: "Mongo Error: " + err });
    });
  });
}
