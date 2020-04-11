const mongoose = require('mongoose');
const moment = require('moment-timezone');
const geotz = require('geo-tz');
const hades = require('@goldenius/hades-js');

const names = [ "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces" ];

const getUserAge = (month, year) => {
  const curr_year = new Date().getFullYear();
  const curr_month = new Date().getMonth() + 1;

  return (curr_year - year - 1) + parseInt((12 - month + curr_month) / 12);
};

const calculateSign = (date, month) => {
  if (month == 1 && date >=20 || month == 2 && date <=18)
    return "Aquarius";
  if (month == 2 && date >=19 || month == 3 && date <=20)
    return "Pisces";
  if (month == 3 && date >=21 || month == 4 && date <=19) 
    return "Aries";
  if (month == 4 && date >=20 || month == 5 && date <=20) 
    return "Taurus";
  if (month == 5 && date >=21 || month == 6 && date <=21) 
    return "Gemini";
  if (month == 6 && date >=22 || month == 7 && date <=22) 
    return "Cancer";
  if (month == 7 && date >=23 || month == 8 && date <=22) 
    return "Leo";
  if (month == 8 && date >=23 || month == 9 && date <=22) 
    return "Virgo";
  if (month == 9 && date >=23 || month == 10 && date <=22) 
    return "Libra";
  if (month == 10 && date >=23 || month == 11 && date <=21) 
    return "Scorpio";
  if (month == 11 && date >=22 || month == 12 && date <=21) 
    return "Sagittarius";
  if (month == 12 && date >=22 || month == 1 && date <=19) 
    return "Capricorn";
  return "Capricorn";
}

const User = require('../../../models/user/User');
const Astrologer = hades.Astrologer;

const getMatchRatios = require('../../../utils/getMatchRatios');
const getUserObject = require('../../../utils/getUserObject');

module.exports = async (req, res) => {
  if (!req.body || !req.body.id || !req.body.name || !req.body.birth_time || !req.body.birth_location || !req.body.gender)
    return res.status(400).json({ error: "bad request" });

  req.body.birth_time = JSON.parse(req.body.birth_time);
  req.body.birth_location = JSON.parse(req.body.birth_location);

  if (getUserAge(req.body.birth_time.month, req.body.birth_time.year) < 18)
    return res.status(400).json({ error: "user should be bigger than 18" })

  let astrologer = new Astrologer();
  const sign = calculateSign(req.body.birth_time.day, req.body.birth_time.month);

  astrologer.Init().then(() => {
    let planets = astrologer.CalculateCelestialBodiesAndTime(moment(Date.UTC(parseInt(req.body.birth_time.year), parseInt(req.body.birth_time.month), parseInt(req.body.birth_time.day), parseInt(req.body.birth_time.hour), parseInt(req.body.birth_time.min))), 
      geotz(parseFloat(req.body.birth_location.lat), parseFloat(req.body.birth_location.lon))[0], {
        latitude: parseFloat(req.body.birth_location.lat),
        longitude: parseFloat(req.body.birth_location.lon)
      });

    getMatchRatios({
      option: "get matches",
      ascendant: sign,
      mars_sign: planets.CelestialBodies[4].ZodiacSign.Name,
      venus_sign: planets.CelestialBodies[3].ZodiacSign.Name
    }, (err, matches) => {
      if (err) return res.status(500).json({ error: err });

      User.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.id), {$set: {
        name: req.body.name,
        birth_time: req.body.birth_time,
        birth_location: req.body.birth_location,
        age_interval: {
          min: req.body.birth_time.year + 5,
          max: req.body.birth_time.year - 5
        },
        gender: req.body.gender,
        wanted_gender: req.body.gender == "male" ? "female" : "male",
        sign,
        sign_id: names.indexOf(sign) + 1,
        sign_combination: sign + "/" + planets.CelestialBodies[4].ZodiacSign.Name + "/" + planets.CelestialBodies[3].ZodiacSign.Name,
        mars_sign: planets.CelestialBodies[4].ZodiacSign.Name,
        venus_sign: planets.CelestialBodies[3].ZodiacSign.Name,
        best_matches: matches.best_matches,
        mid_matches: matches.mid_matches,
        old_matches: [req.body.id],
        completed: true
      }}, {new: true}, (err, user) => {
        if (err || !user) return res.status(500).json({ error: "Mongo Error: " + err });
  
        User.collection.createIndex({ last_active: 1 }, (err, result) => {
          if (err) return res.status(500).json({ error: "Mongo Error: " + err });
  
          return res.status(200).json({ user: getUserObject(user) });
        });
      });
    });
  });
}
