const mongoose = require('mongoose');

const Block = require('../../models/block/Block');
const Chat = require('../../models/chat/Chat');
const User = require('../../models/user/User');

module.exports = (req, res) => {
  if (!req.body || !req.body.user_id || !req.body.name || !req.body.profile_photo_list || !req.body.user_two_id)
    return res.status(400).json({ error: 'bad request' });

  const newBlockData = {
    user_id: req.body.user_id,
    name: req.body.name,
    profile_photo_list: req.body.profile_photo_list,
    user_two_id: req.body.user_two_id,
    chat_id: req.body.chat_id || "",
    on_chat: req.body.on_chat
  };
  
  const newBlock = new Block(newBlockData);

  newBlock.save((err, block) => {
    if (err) return res.status(500).json({ error: 'mongo error: ' + err });

    if (!req.body.chat_id && !req.body.on_chat)
      return res.status(200).json({ success: true });

    Chat.findByIdAndDelete(mongoose.Types.ObjectId(req.body.chat_id), (err, chat) => {
      if (err) return res.status(500).json({ error: 'mongo error: ' + err });

      User.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.user_id), {$pull: {
        chat_list: req.body.chat_id.toString()
      }}, {}, err => {
        if (err) return res.status(500).json({ error: 'mongo error: ' + err });

        User.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.user_two_id), {$pull: {
          chat_list: req.body.chat_id.toString()
        }}, {}, err => {
          if (err) return res.status(500).json({ error: 'mongo error: ' + err });
          
          return res.status(200).json({ success: true });
        });
      });
    });
  });
}
