const mongoose = require('mongoose');
const jimp = require('jimp');

const User = require('../../../models/user/User');

const getUserObject = require('../../../utils/getUserObject');
const uploadPhotoToAWS = require('../../../utils/uploadPhotoToAWS');

module.exports = (req, res) => {
  if (!req.file || !req.query || !req.query.id)
    return res.status(400).json({ error: "bad request" });

  User.findById(mongoose.Types.ObjectId(req.query.id), async (err, user) => {
    if (err || !user)
      return res.status(500).json({ error: "Mongo Error: " + err });

    if (user.profile_photo_list.length > 5)
      return res.status(400).json({ error: "user already have 6 photos" });

    if (req.file.size > 200000) {
      const image_path = "./public/res/uploads/" + req.file.filename;
      const image = await jimp.read(image_path);
      const image_quality = 200000 * 100 / req.file.size;
      await image.quality(image_quality);
      await image.writeAsync(image_path);
    }

    uploadPhotoToAWS(req.file.filename, (err, location) => {
      if (err) return res.status(500).json({ error: "AWS Error: " + err });
    
      User.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {
        $push: {
          "profile_photo_list": location,
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
}
