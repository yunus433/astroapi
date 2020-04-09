const mongoose = require('mongoose');

const User = require('../../models/user/User');
const Chat = require('../../models/chat/Chat');

module.exports = (req, res) => {
  if (!req.body || !req.body.id || !req.body.user || !req.body.accept)
    return res.status(400).json({ error: "bad request" });

  User.findById(mongoose.Types.ObjectId(req.body.id), (err, user) => {
    if (err) return res.status(500).json({ error: "Mongo Error: " + err });

    if (req.body.accept == "yes") {
      if (user.matched_users.includes(req.body.user)) {

      } else {

        User.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.id), {
          $pull: {
            "matched_users": {
              "_id": req.body.user
            }
          },
          $push: {

          }
        }, {}, err => {
          if (err) return res.status(500).json({ error: "Mongo Error: " + err });


        })
      }
    } else {

    }
  });
}
