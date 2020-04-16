const mongoose = require('mongoose');
const geotz = require('geo-tz');

const User = require('../../models/user/User');

const getUserObject = require('../../utils/getUserObject');

module.exports = (req, res) => {
  if (!req.body || !req.body.id || !req.body.country || !req.body.city || !req.body.location || !req.body.language)
    return res.status(400).json({ error: "bad request" });

  User.findById(mongoose.Types.ObjectId(req.body.id), (err, user) => {
    if (err || !user) return res.status(500).json({ error: "Mongo Error: " + err });

    User.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.id), {$set: {
      last_active: (new Date()).getTime(),
      country: req.body.country,
      city: req.body.city,
      time_zone: geotz(parseFloat(req.body.location.lat), parseFloat(req.body.location.lon))[0],
      language_preference: req.body.language,
      is_premium: (user.is_premium && user.premium_exp_date < (new Date()).getTime()) ? true : false,
      premium_exp_date: (user.premium_exp_date < (new Date()).getTime()) ? user.premium_exp_date : null
    }}, {new: true}, (err, user) => {
      if (err || !user) return res.status(500).json({ error: "Mongo Error: " + err });
      
      User.collection.createIndex({ last_active: 1 }, (err, result) => {
        if (err) return res.status(500).json({ error: "Mongo Error: " + err });
      
        return res.status(200).json({ user: getUserObject(user) });
      });
    });
  });
};
