const mongoose = require('mongoose');

const User = require('../../models/user/User');
const Chat = require('../../models/chat/Chat');

const getUserObject = require('../../utils/getUserObject');

module.exports = (req, res) => {
  if (!req.body || !req.body.id || !req.body.user || !req.body.accept)
    return res.status(400).json({ error: "bad request" });

  User.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.id), { $push: {
    "old_matches": req.body.user
  }}, (err, user) => {
    if (err) return res.status(500).json({ error: "Mongo Error: " + err });

    if (req.body.accept == true) {
      if (user.matched_users.includes(req.body.user)) {
        const newChatData = {
          user_one: req.body.user,
          user_two: req.body.id
        };
      
        const newChat = new Chat(newChatData);

        newChat.save((err, chat) => {
          if (err) return res.status(500).json({ error: "Mongo Error: " + err });

          User.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.id), {
            $pull: {
              "matched_users": {
                "_id": req.body.user
              }
            },
            $push: {
              "chat_list": chat._id.toString()
            }
          }, {}, err => {
            if (err) return res.status(500).json({ error: "Mongo Error: " + err });

            User.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.user), { $push: {
                "chat_list": chat._id.toString()
            }}, {}, err => {
              if (err) return res.status(500).json({ error: "Mongo Error: " + err });
    
              return res.status(200).json({
                "new_match": true,
                "chat_id": chat._id.toString()
              });
            });
          });
        });
      } else {
        User.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.user), { $push: {
          "matched_users": getUserObject(user)
        }}, {}, err => {
          if (err) return res.status(500).json({ error: "Mongo Error: " + err });
  
          return res.status(200).json({ "new_match": false });
        });
      }
    } else {
      if (user.matched_users.includes(req.body.user)) {
        User.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.id), {
          $pull: {
            "matched_users": {
              "_id": req.body.user
            }
          }
        }, {}, err => {
          if (err) return res.status(500).json({ error: "Mongo Error: " + err });
          
          return res.status(200).json({ "new_match": false });
        });
      } else {
        return res.status(200).json({ "new_match": false });
      }
    }
  });
}
