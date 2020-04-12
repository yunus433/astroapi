const mongoose = require('mongoose');

const User = require('../../../models/user/User');

const getUserObject = require('../../../utils/getUserObject');
const uploadPhotoToAWS = require('../../../utils/uploadPhotoToAWS');

module.exports = (req, res) => {
  if (!req.file || !req.query || !req.query.id)
    return res.status(400).json({ error: "bad request" });

  User.findById(mongoose.Types.ObjectId(req.query.id), (err, user) => {
    if (err || !user)
      return res.status(500).json({ error: "Mongo Error: " + err });

    if (user.profile_photo_list.size > 5)
      return res.status(400).json({ error: "user already have 6 photos" });

    uploadPhotoToAWS(req.file.filename, (err, location) => {
      if (err) return res.status(500).json({ error: "AWS Error: " + err });
    
      User.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {
        $push: {
          "profile_photo_list": location,
          "photo_completed": true
        }
      }, {new: true}, (err, user) => {
        if (err || !user)
          return res.status(500).json({ error: "Mongo Error: " + err });

        return res.status(200).json({user: getUserObject(user)});
      });
    });
  });
}
