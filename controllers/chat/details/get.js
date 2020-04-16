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
    Chat.findById(mongoose.Types.ObjectId(req.query.chat_id), (err, chat) => {
      if (err) return res.status(500).json({ error: "Mongo Error: " + err });
  
      if (chat.user_one._id != req.query.id && chat.user_two._id != req.query.id)
        return res.status(400).json({ error: "user authentication failed" });
  
      Chat.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.chat_id), {$set: {
        messages: chat.messages.map(each => {
          if (each.sended_by != req.query.id && !each.read)
            each.read = true;
          return each;
        })
      }}, {new: true}, (err, chat) => {
        if (err) return res.status(500).json({ error: "Mongo Error: " + err });

        const messages = [];
        const curr_user = (chat.user_one._id.toString() == req.query.id) ? "user_one" : "user_two";
    
        const message_start = req.query.message_start;
        const message_limit = req.query.message_limit;
        const n = chat.messages.length - 1;
  
        for (let i = Math.max(0, (n-message_start)); i > n-message_start-message_limit; i--) {
          if (i < 0) break;
          const new_message = getMessageObject(chat.messages[i], user.time_zone);
          messages.push(new_message);
        }
  
        messages.reverse();
  
        return res.status(200).json({ chat: {
          messages,
          created_at: moment(chat.created_at).tz(user.time_zone).format("DD[.]MM[.]YYYY"),
          user_one: (curr_user == "user_one" ? chat.user_one : chat.user_two),
          user_two: (curr_user == "user_two" ? chat.user_one : chat.user_two)
        } });
      });
    });
  });
}
