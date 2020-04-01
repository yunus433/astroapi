const User = require('../../../models/user/User');

const sendSMS = require('../../../utils/sendSMS')

module.exports = (req, res) => {
  if (!req.body || !req.body.phone)
    return res.status(400).json({ error: "bad request" });

  const newUserData = {
    phone: req.body.phone,
    phone_auth_code: Math.floor(100000 + Math.random() * 900000),
    last_active: Date.now(),
    created_at: Date.now()
  };

  const newUser = new User(newUserData);

  newUser.save((err, user) => {
    if (err && err.code == 11000)
      return res.status(400).json({ error: "phone number already in use" });
    
    if (err || !user) return res.status(500).json({ error: "mongodb error" });

    sendSMS({
      phone: user.phone,
      subject: "AstroApp",
      message: `Your Astro app verification code is ${user.phone_auth_code}`
    }, (err, result) => {
      if (err) return res.status(500).json({ error: "aws sns error" });

      return res.status(200).json({ user_id: user._id });
    });
  });
}
