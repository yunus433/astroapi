const fs = require('fs');
const mongoose = require('mongoose');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const User = require('../../../models/user/User');

const getUserObject = require('../../../utils/getUserObject');

module.exports = (req, res) => {
  if (!req.file || !req.query || !req.query.id)
    return res.status(400).json({ error: "Bad request" });

  User.findById(mongoose.Types.ObjectId(req.query.id), (err, user) => {
    if (err || !user)
      return res.status(500).json({ error: "Mongo Error: " + err });

    if (user.profile_photo_list.size > 5)
      return res.status(400).json({ error: "User already have 6 photos" });

    const fileContent = fs.readFileSync("./public/res/uploads/" + req.file.filename);

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: req.file.filename,
      Body: fileContent,
      ContentType: 'image/jpg',
      ACL: 'public-read'
    };
    
    s3.upload(params, function(err, data) {
      if (err) return res.status(500).json({ error: "AWS Error: " + err });
    
      User.findByIdAndUpdate(mongoose.Types.ObjectId(req.query.id), {$push: {
        "profile_photo_list": data.Location
      }}, {new: true}, (err, user) => {
        if (err || !user)
          return res.status(500).json({ error: "Mongo Error: " + err });
        
        fs.unlink("./public/res/uploads/" + req.file.filename, err => {
          if (err) return res.status(500).json({"error": err});

          return res.status(200).json({user: getUserObject(user)});
        });
      });
    });
  });
}
