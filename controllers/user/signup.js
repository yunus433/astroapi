const mongoose = require('mongoose');

const User = require('../../models/user/User');

module.exports = (req, res) => {
  if (!req.body || !req.body.id || !req.body.phone)
    return res.status(400).json({ error: "bad request" });

  User.find({
    firebase_id: req.body.id
  }, (err, user) => {
    if (err) return res.status(500).json({ error: "Mongo Error: " + err });

    if (user && user.length) {
      return res.status(200).json({ "user": user[0]  });
    } else {
      const newUserData = {
        firebase_id: req.body.id,
        phone: req.body.phone,
        last_active: (new Date()).getTime(),
        created_at: (new Date()).getTime()
      };
    
      const newUser = new User(newUserData);
  
      newUser.save((err, user) => {
        if (err || !user) return res.status(500).json({ error: "mongo error: " + err });
  
        return res.status(200).json({ "user": user });
      });
    }
  });
}
