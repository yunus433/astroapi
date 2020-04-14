const moment = require('moment-timezone');
const mongoose = require('mongoose');

const User = require('../../../models/user/User');
const Chat = require('../../../models/chat/Chat');

const getMessageObject = require('../../../utils/getMessageObject');

module.exports = (req, res) => {
  if (!req.query || !req.query.id || !req.query.chat_id || !req.query.message_start || !req.query.message_limit)
    return res.status(400).json({ error: "bad request" });

  User.findById(mongoose.Types.ObjectId(req.query.id), (err, user) => {
    if (err) return res.status(500).json({ error: "Mongo Error: " + err });
    Chat.findById(mongoose.Types.ObjectId(req.query.chat_id), async (err, chat) => {
      if (err) return res.status(500).json({ error: "Mongo Error: " + err });
  
      if (chat.user_one._id != req.query.id && chat.user_two._id != req.query.id)
        return res.status(400).json({ error: "user authentication failed" });
  
      const messages = [];
      const curr_user = (chat.user_one._id.toString() == req.query.id) ? "user_one" : "user_two";
  
      for (let i = chat.messages.length - parseInt(req.query.message_start) - parseInt(req.query.message_limit) - 1; i < chat.messages.length - parseInt(req.query.message_start) - 1; i++) {
        const new_message = getMessageObject(chat.messages[i], user.time_zone);
        if (curr_user != new_message.sended_by)
          new_message.read = true;
        messages.push(new_message);
      }

      return res.status(200).json({ chat: {
        messages,
        created_at: moment(chat.created_at).tz(user.time_zone).format("DD[.]MM[.]YYYY"),
        user_one: (curr_user == "user_one" ? chat.user_one : chat.user_two),
        user_two: (curr_user == "user_two" ? chat.user_one : chat.user_two)
      } });
    });
  });
}
