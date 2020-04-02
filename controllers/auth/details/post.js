const mongoose = require('mongoose');
const moment = require('moment')
const fetch = require('node-fetch');

const User = require('../../../models/user/User');

module.exports = (req, res) => {
  if (!req.body || !req.body.id || !req.body.name || !req.body.birth_time || !req.body.birth_location || !req.body.gender || !req.body.wanted_gender)
    return res.status(400).json({ error: "bad request" });

  req.body.birth_time = JSON.parse(req.body.birth_time);
  req.body.birth_location = JSON.parse(req.body.birth_location);

  fetch('https://json.astrologyapi.com/v1/western_horoscope', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authorization": "Basic " + (process.env.ASTRO_USER_ID + ":" + process.env.AWS_ACCESS_KEY_ID).toString('base64'),
    },
    dataType:'json',
    data: JSON.stringify({
      day: req.body.birth_time.day,
      month: req.body.birth_time.month,
      year: req.body.birth_time.year,
      hour: req.body.birth_time.hour,
      min: req.body.birth_time.min,
      lat: req.body.birth_location.lat,
      lon: req.body.birth_location.lon,
      tzone: req.body.birth_time.tzone
    })
  })
    .then(response => {return response.json()})
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
    
  // User.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.id), {$set: {
  //   name: req.body.name,
  //   birth_time: req.body.birth_time,
  //   birth_location: req.body.birth_location,
  //   gender: req.body.gender,
  //   wanted_gender: req.body.wanted_gender
  // }}, {new: true}, (err, user) => {
  // })
}
