const fs = require('fs');
const mongoose = require('mongoose');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const User = require('../../../../models/user/User');

const getUserObject = require('../../../../utils/getUserObject');

module.exports = (req, res) => {
  if (!req.body || !req.body.id || !req.body.image)
    return res.status(400).json({ error: "Bad request" });

  User.findById(mongoose.Types.ObjectId(req.body.id), (err, user) => {
    if (err || !user)
      return res.status(500).json({ error: "Mongo Error: " + err });

    if (!user.profile_photo_list.includes(req.body.image))
      return res.status(400).json({ error: "Photo not found" });

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: req.body.image.split('com/')[1]
    };
    
    s3.deleteObject(params, (err, data) => {
      if (err) return res.status(500).json({ error: "AWS Error: " + err });
    
      User.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.id), {$pull: {
        "profile_photo_list": req.body.image
      }}, {new: true}, (err, user) => {
        if (err || !user)
          return res.status(500).json({ error: "Mongo Error: " + err });
        
        return res.status(200).json({user: getUserObject(user)});
      });
    });
  });
}
