const mongoose = require('mongoose');

const User = require('../../models/user/User');

const getUserObject = require('../../utils/getUserObject');

module.exports = (req, res) => {
  if (!req.body || !req.body.id || !req.body.country || !req.body.city || !req.body.location || !req.body.language)
    return res.status(400).json({ error: "bad request" });

  User.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {$set: {
    last_active: Date.now(),
    country: req.body.country,
    city: req.body.city,
    time_zone: geotz(parseFloat(req.body.location.lat), parseFloat(req.body.location.lon))[0],
    language_preference: req.body.language,
  }}, {new: true}, (err, user) => {
    if (err) return res.status(500).json({ error: "Mongo Error: " + err });
    
    User.collection.createIndex({ last_active: 1 }, (err, result) => {
      if (err) return res.status(500).json({ error: "Mongo Error: " + err });
    
      return res.status(200).json({ user: getUserObject(user) });
    });
  });
};
