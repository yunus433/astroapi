const mongoose = require('mongoose');

const User = require('../../models/user/User');

module.exports = (req, res) => {
  if (!req.body || !req.body.id || !req.body.phone)
    return res.status(400).json({ error: "bad request" });

  User.findOne({
    firebase_id: req.body.id
  }, (err, user) => {
    if (err) return res.status(500).json({ error: "mongo Error: " + err });

    if (user) {
      return res.status(200).json({ "user": user });
    } else {
      const newUserData = {
        firebase_id: req.body.id,
        phone: req.body.phone,
        last_active: (new Date()).getTime(),
        created_at: (new Date()).getTime()
      };
    
      const newUser = new User(newUserData);
  
      newUser.save((err, user) => {
        if (err && err.code == 11000) {
          User.findOne({
            firebase_id: req.body.id
          }, (err, user) => {
            if (err) return res.status(500).json({ error: "mongo Error: " + err });

            if (user)
              return res.status(200).json({ "user": user });
            
            User.findOneAndUpdate({
              phone: req.body.phone
            }, {
              firebase_id: req.body.firebase_id
            }, {new: true}, (err, user) => {
              if (err) return res.status(500).json({ error: "mongo Error: " + err });

              return res.status(200).json({ "user": user });
            });
          });
        } else {
          if (err || !user) return res.status(500).json({ error: "mongo error: " + err });
  
          return res.status(200).json({ "user": user });
        }
      });
    }
  });
}
