const mongoose = require('mongoose');

const User = require('../../models/user/User');

const getUserObject = require('../../utils/getUserObject');
const getMatchRatios = require('../../utils/getMatchRatios');

let main_user;

const getUserObjects = (users) => {
  const arr = [];

  users.forEach(user => {
    const new_user = getUserObject(user);

    getMatchRatios({
      option: "get compatibility",
      user_one: {
        sign: main_user.sign,
        mars_sign: main_user.mars_sign,
        venus_sign: main_user.venus_sign
      },
      user_two: {
        sign: user.sign,
        mars_sign: user.mars_sign,
        venus_sign: user.venus_sign
      }
    }, (err, matching_ratio) => {
      new_user.matching_ratio = matching_ratio;

      arr.push(new_user);
    });
  });

  return arr;
}

const getUsers = (option, user, limit, callback) => {
  const preferences = {
    completed: true,
    _id: {
      $nin: user.old_matches
    },
    gender: (user.wanted_gender == "both" ? {$or: ["male", "female"]} : user.wanted_gender),
    wanted_gender: {$or: ["both", user.gender]},
    sign_combination: (option == "all" ? {
      $exists: true
    } : {
      $in: (option == "best" ? user.best_matches : user.mid_matches)
    }),
    city: user.city,
    country: user.country,
    birth_time: {
      year: {$and: [
        {$gte: user.age_interval.max},
        {$lte: user.age_interval.min}
      ]}
    }
  };

  User
    .find(preferences)
    .sort({ last_active: 1 })
    .limit(limit)
    .then(users => {
      if (user.length == limit)
        return callback(null, users);

      preferences.city = { $ne: user.city };

      User
        .find(preferences)
        .sort({ last_active: 1 })
        .limit(limit - users.length)
        .then(all_users => {
          return callback(null, users + all_users);
        })
        .catch(err => {
          if (err) return callback(err);
        });
    })
    .catch(err => {
      if (err) return callback(err);
    });
};

module.exports = (req, res) => {
  if (!req.query || !req.query.id || !req.query.limit)
    return res.status(400).json({ error: "Bad request" });

  User.findById(mongoose.Types.ObjectId(req.query.id), (err, user) => {
    if (err) return res.status(500).json({ error: "Mongo Error: " + err });
    main_user = user;
    let limit = req.query.limit;
    limit -= user.matched_users.length;

    if (limit > 0) {
      if (user.is_premium) {
        getUsers("best", user, limit, (err, users) => {
          if (err) return res.status(500).json({ error: err });
  
          if (users.length == limit)
            return res.status(200).json({ matches: getUserObjects(users) + user.matched_users });
          
          getUsers("mid", user, (limit - users.length), (err, mid_users) => {
            if (err) return res.status(500).json({ error: err });
  
            if (mid_users.length == (limit - users.length))
              return res.status(200).json({ matches: getUserObjects(users) + user.matched_users + getUserObjects(mid_users) });
  
            getUsers("all", user, (limit - users.length - mid_users.length), (err, all_users) => {
              if (err) return res.status(500).json({ error: err });
  
              return res.status(200).json({ matches: getUserObjects(users) + user.matched_users + getUserObjects(mid_users) + getUserObjects(all_users) });
            });
          });
        });
      } else {
        getUsers("mid", user, limit, (err, mid_users) => {
          if (err) return res.status(500).json({ error: err });
  
          if (mid_users.length == limit)
            return res.status(200).json({ matches: getUserObjects(mid_users) + user.matched_users });
  
          getUsers("all", user, (limit - mid_users.length), (err, all_users) => {
            if (err) return res.status(500).json({ error: err });
  
            return res.status(200).json({ matches: getUserObjects(mid_users) + user.matched_users + getUserObjects(all_users) });
          });
        });
      };
    } else {
      const newArray = [];

      for (let i = 0; i < req.query.limit; i++)
        newArray.push(user.matched_users[i]);

      return res.status(200).json({ matches: newArray });
    }
  });
}
