const mongoose = require('mongoose');
const astrologyjs = require('astrologyjs');
const moment = require('moment-timezone');
const geotz = require('geo-tz');

const Person = astrologyjs.Person;
const Chart = astrologyjs.Chart;
const ChartFactory = astrologyjs.ChartFactory;

const names = [ "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces" ];

const User = require('../../../models/user/User');

const getMatchRatios = require('../../../utils/getMatchRatios');
const getUserObject = require('../../../utils/getUserObject');

module.exports = (req, res) => {
  if (!req.body || !req.body.id || !req.body.name || !req.body.birth_time || !req.body.birth_location || !req.body.gender || !req.body.wanted_gender)
    return res.status(400).json({ error: "bad request" });

  req.body.birth_time = JSON.parse(req.body.birth_time);
  req.body.birth_location = JSON.parse(req.body.birth_location);

  const birth_time_str = 
    moment(Date.UTC(parseInt(req.body.birth_time.year), parseInt(req.body.birth_time.month), parseInt(req.body.birth_time.day), parseInt(req.body.birth_time.hour), parseInt(req.body.birth_time.min)))
    .tz(geotz(parseFloat(req.body.birth_location.lat), parseFloat(req.body.birth_location.lon))[0])
    .format();

  Person.create("-", moment(birth_time_str).toISOString(), {lat: parseFloat(req.body.birth_location.lat), lng: parseFloat(req.body.birth_location.lon)})
    .then( p => {
      const person = p;
      ChartFactory.create("-", person)
        .then(c => {
            // console.log(c.houses);
        },
        err => {
          console.log("Catch: " + err);
        }
      );

    },
    err => {
      console.log("Catch: " + err);
    });

  // const info = {
  //   day: parseInt(req.body.birth_time.day),
  //   month: parseInt(req.body.birth_time.month),
  //   year: parseInt(req.body.birth_time.year),
  //   hour: parseInt(req.body.birth_time.hour),
  //   min: parseInt(req.body.birth_time.min),
  //   lat: parseFloat(req.body.birth_location.lat),
  //   lon: parseFloat(req.body.birth_location.lon),
  //   tzone: parseFloat(req.body.birth_time.tzone)
  // };
 

  // getMatchRatios({
  //   option: "get matches",
  //   ascendant,
  //   mars_sign
  // }, (err, matches) => {
  //   if (err) return res.status(500).json({ error: err });

  //   User.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.id), {$set: {
  //     name: req.body.name,
  //     birth_time: req.body.birth_time,
  //     birth_location: req.body.birth_location,
  //     gender: req.body.gender,
  //     wanted_gender: req.body.wanted_gender,
  //     sign: ascendant,
  //     sign_id: names.indexOf(ascendant) + 1,
  //     sign_combination: ascendant + "/" + mars_sign,
  //     best_matches: matches.best_matches,
  //     mid_matches: matches.mid_matches,
  //     last_active: Date.now(),
  //     completed: true
  //   }}, {new: true}, (err, user) => {
  //     if (err || !user) return res.status(500).json({ error: "Mongo Error: " + err });

  //     User.collection.createIndex({ last_active: 1 }, (err, result) => {
  //       if (err) return res.status(500).json({ error: "Mongo Error: " + err });

  //       return res.status(200).json({ user: getUserObject(user) });
  //     });
  //   });
  // });
}
