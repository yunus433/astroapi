const validator = require('validator');

const User = require('../../../models/user/User');

const sendSMS = require('../../../utils/sendSMS')

module.exports = (req, res) => {
  if (!req.body || !req.body.phone)
    return res.status(400).json({ error: "bad request" });
  
  if (!validator.isMobilePhone(req.body.phone))
    return res.status(400).json({ error: "not valid phone number" });

  const newUserData = {
    phone: req.body.phone,
    phone_auth_code: Math.floor(100000 + Math.random() * 900000),
    last_active: (new Date()).getTime(),
    created_at: (new Date()).getTime()
  };

  const newUser = new User(newUserData);

  newUser.save((err, user) => {
    if (err && err.code == 11000) {
      User.findOneAndUpdate({
        "phone": req.body.phone
      }, {$set: {
        phone_auth_code: newUserData.phone_auth_code,
        last_active: Date.now()
      }}, {}, (err, user) => {
        if (err || !user) return res.status(500).json({ error: "mongo error: " + err });

        sendSMS({
          phone: user.phone,
          subject: "AstroApp",
          message: `Your Astro app verification code is ${newUserData.phone_auth_code}`
        }, (err, result) => {
          if (err) return res.status(500).json({ error: "aws sns error" });

          return res.status(200).json({ user_id: user._id });
        });
      })
    } else {
      if (err || !user) return res.status(500).json({ error: "mongo error: " + err });

      sendSMS({
        phone: user.phone,
        subject: "AstroApp",
        message: `Your Astro app verification code is ${newUserData.phone_auth_code}`
      }, (err, result) => {
        if (err) return res.status(500).json({ error: "aws sns error" });
  
        return res.status(200).json({ user_id: user._id });
      });
    }
  });
}
