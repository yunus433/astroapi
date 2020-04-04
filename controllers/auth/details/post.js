const mongoose = require('mongoose');
const rp = require('request-promise-native').defaults({ family: 4 });;
const base64 = require('base-64');

const User = require('../../../models/user/User');

module.exports = (req, res) => {
  if (!req.body || !req.body.id || !req.body.name || !req.body.birth_time || !req.body.birth_location || !req.body.gender || !req.body.wanted_gender)
    return res.status(400).json({ error: "bad request" });

  req.body.birth_time = JSON.parse(req.body.birth_time);
  req.body.birth_location = JSON.parse(req.body.birth_location);

  var options = {
    method: 'POST',
    uri: 'https://json.astrologyapi.com/v1/general_ascendant_report',
    headers: {
      "authorization": "Basic " + base64.encode(process.env.ASTRO_USER_ID + ":" + process.env.ASTRO_API_KEY),
      "Content-Type": "application/json"
    },
    body: {
      day: parseInt(req.body.birth_time.day),
      month: parseInt(req.body.birth_time.month),
      year: parseInt(req.body.birth_time.year),
      hour: parseInt(req.body.birth_time.hour),
      min: parseInt(req.body.birth_time.min),
      lat: parseFloat(req.body.birth_location.lat),
      lon: parseFloat(req.body.birth_location.lon),
      tzone: parseFloat(req.body.birth_time.tzone)
    },
    json: true,
    family: 4
  };
 
  rp(options)
    .then(data => {
      if (!data || !data.asc_report || !data.asc_report.ascendant)
        return res.status(500).json({ error: "Couldn't get user ascendant report" });

      options.uri = 'https://json.astrologyapi.com/v1/general_sign_report/tropical/:MARS';
      const ascendant = data.asc_report.ascendant;

      rp(options)
        .then(data => {
          if (!data || !data.sign_name)
            return res.status(500).json({ error: "Couldn't get user Mars sign report" });

          const mars_sign = data.sign_name;
          
          User.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.id), {$set: {
            name: req.body.name,
            birth_time: req.body.birth_time,
            birth_location: req.body.birth_location,
            gender: req.body.gender,
            wanted_gender: req.body.wanted_gender,
            ascendant,
            mars_sign,
            completed: true
          }}, {new: true}, (err, user) => {
            if (err || !user) return res.status(500).json({ error: "Mongo Error: " + err });
          
            return res.status(200).json({ user });
          });
        })
        .catch(err => {
          return res.status(500).json({ error: "Internal Server Error 2: " + err });
        });
    })
    .catch(err => {
      return res.status(500).json({ error: "Internal Server Error 1: " + err });
    });
}
