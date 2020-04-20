const mongoose = require('mongoose');

const User = require('../../models/user/User');

const getUserObject = require('../../utils/getUserObject');
const getMatchRatios = require('../../utils/getMatchRatios');

module.exports = (req, res) => {
  if (!req.query || !req.query.id || !req.query.type)
    return res.status(400).json({ error: "bad request" });

  if (req.query.type == "match") {
    User.findById(mongoose.Types.ObjectId(req.query.id), (err, req_user) => {
      if (err || !req_user) return res.status(500).json({ error: "Mongo Error: " + err });
      
      User.findById(mongoose.Types.ObjectId(req.query.user), (err, user) => {
        if (err || !req_user) return res.status(500).json({ error: "Mongo Error: " + err });
  
        const new_user = getUserObject(user);
  
        getMatchRatios({
          option: "get compatibity",
          user_one: {
            sign: req_user.sign,
            mars_sign: req_user.mars_sign,
            venus_sign: req_user.venus_sign
          },
          user_two: {
            sign: user.sign,
            mars_sign: user.mars_sign,
            venus_sign: user.venus_sign
          }
        }, (err, matching_ratio) => {
          if (err) return res.status(500).json({ error: err });
          new_user.matching_ratio = matching_ratio;
    
          return res.status(200).json({ user: new_user });
        });
      });
    });
  } else {
    User.findById(mongoose.Types.ObjectId(req.query.id), (err, user) => {
      if (err || !user) return res.status(500).json({ error: "Mongo Error: " + err });

      return res.status(200).json({ user: getUserObject(user) });
    });
  }
}
