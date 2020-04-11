const Chat = require('../../../models/chat/Chat');

const getCharObjects = (chat_list) => {
  const new_list = [];

  chat_list.forEach(chat => {
    new_list.push({
      _id: chat._id,
      user_one: chat.user_one,
      user_two: chat.user_two,
      last_message: chat.messages[chat.messages.size()-1]
    })
  });

  return new_list;
}

module.exports = (req, res) => {
  if (!req.query || !req.query.id)
    return res.status(400).json({ error: "bad request" });

  Chat.find({
    $or: [
      {user_one: {
        _id: req.query.id
      }},
      {user_two: {
        _id: req.query.id
      }},
    ]
  })
  .sort({created_at: 1})
  .then(chat_list => {
    return res.status(200).json({ chat_list: getCharObjects(chat_list) });
  })
  .catch(err => {
    return res.status(500).json({ error: "Mongo Error: " + err });
  });
}
