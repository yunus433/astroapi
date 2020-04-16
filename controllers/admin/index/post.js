const User = require('../../models/user/User');

module.exports = (req, res) => {
  if (!req.body || !req.body.name || !req.body.country || !req.body.city || !req.body.birth_time || !req.body.profile_photo_array)
    return res.redirect('/');
}
