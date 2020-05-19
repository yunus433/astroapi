const mongoose = require('mongoose');
const fs = require('fs');
const jimp = require('jimp');

const User = require('../../../models/user/User');

const getUserObject = require('../../../utils/getUserObject');

module.exports = (req, res) => {
  if (!req.file || !req.query || !req.query.id)
    return res.status(400).json({ error: "bad request" });

  User.findById(mongoose.Types.ObjectId(req.query.id), async (err, user) => {
    if (err || !user)
      return res.status(500).json({ error: "Mongo Error: " + err });

    if (user.profile_photo_list.length > 5)
      return res.status(400).json({ error: "user already have 6 photos" });

    req.cloudinary.v2.uploader.upload(
      "./public/res/uploads/" + req.file.filename,
      {
        public_id: "astro/profile_photo/" + req.file.filename,
        format: "JPG",
        secure: true,
        quality: "auto:low"
      },
      (err, result) => {
        if (err) return res.status(400).json({ error: err });
  
        fs.unlink("./public/res/uploads/" + req.file.filename, err => {
          User.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {
            $push: {
              "profile_photo_list": result.secure_url,
            },
            $set: {
              "photo_completed": true
            }
          }, {new: true}, (err, user) => {
            if (err || !user)
              return res.status(500).json({ error: "Mongo Error: " + err });
    
            return res.status(200).json({user: getUserObject(user)});
          });
        });
      });
  });
}
