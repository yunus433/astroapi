const mongoose = require('mongoose');

const User = require('../../models/user/User');
const Chat = require('../../models/chat/Chat');

const getUserObject = require('../../utils/getUserObject');
const sendNotification = require('../../utils/sendNotification');

module.exports = (req, res) => {
  if (!req.body || !req.body.id || !req.body.user || !req.body.accept)
    return res.status(400).json({ error: "bad request" });

  User.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.id), { $push: {
    "old_matches": req.body.user
  }}, (err, user) => {
    if (err) return res.status(500).json({ error: "Mongo Error: " + err });

    User.findById(mongoose.Types.ObjectId(req.body.user), (err, user_two) => {
      if (err) return res.status(500).json({ error: "Mongo Error: " + err });

      if (req.body.accept) {
        if (user.matched_users.filter(each_user => each_user._id.toString() == req.body.user).length) { 
          const newChatData = {
            user_one: getUserObject(user),
            user_two: getUserObject(user_two),
            access_permission: (user.is_premium || user.chat_list.length < (user.gender == "male" ? 5 : 10)) ? true : false
          };
          
          const newChat = new Chat(newChatData);
    
          newChat.save((err, chat) => {
            if (err) return res.status(500).json({ error: "Mongo Error: " + err });
    
            Chat.collection.createIndex({ created_at: 1 }, (err, result) => {
              if (err) return res.status(500).json({ error: "Mongo Error: " + err });
            
              User.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.id), {
                $pull: {
                  "matched_users": {
                    "_id": mongoose.Types.ObjectId(req.body.user)
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
          
                    sendNotification({
                      to: req.body.user,
                      message: {
                        title: "You have a new match!",
                        content: "Click to start to chat now."
                      }
                    }, (err, response) => {
                      if (err) return res.status(500).json({ error: "Notification Error: " + err });
                      
                      return res.status(200).json({
                        "new_match": true,
                        "chat_id": chat._id.toString()
                      });
                    });
                });
              });
            });
          });
        } else {
          User.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.user), { $push: {
            "matched_users": getUserObject(user),
            "old_matches": user._id.toString()
          }}, {}, err => {
            if (err) return res.status(500).json({ error: "Mongo Error: " + err });
    
            return res.status(200).json({ "new_match": false });
          });
        }
      } else {
        if (user.matched_users.filter(each_user => each_user._id.toString() == req.body.user).length) {
          User.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.id), {
            $pull: {
              "matched_users": {
                "_id": mongoose.Types.ObjectId(req.body.user)
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
  });
}
