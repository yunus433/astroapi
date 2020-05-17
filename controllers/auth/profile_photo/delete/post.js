const fs = require('fs');
const mongoose = require('mongoose');

const User = require('../../../../models/user/User');

const getUserObject = require('../../../../utils/getUserObject');

module.exports = (req, res) => {
  if (!req.body || !req.body.id || !req.body.image)
    return res.status(400).json({ error: "bad request" });

  User.findById(mongoose.Types.ObjectId(req.body.id), (err, user) => {
    if (err || !user)
      return res.status(500).json({ error: "Mongo Error: " + err });

    if (!user.profile_photo_list.includes(req.body.image))
      return res.status(400).json({ error: "photo not found" });

    if (user.profile_photo_list.length == 1)
      return res.status(400).json({ error: "user has only one photo" });
  
    req.cloudinary.v2.uploader.destroy(
      "astro/profile_photo/" +
        req.body.image
          .split("/")
          [req.body.image.split("/").length - 1].split(".")[0],
      err => {
        if (err) return res.status(400).json({ error: err });

        User.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.id), {$pull: {
          "profile_photo_list": req.body.image
        }}, {new: true}, (err, user) => {
          if (err || !user)
            return res.status(500).json({ error: "Mongo Error: " + err });
          
          return res.status(200).json({user: getUserObject(user)});
        });
      }
    );
  });
}
