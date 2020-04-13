const getUserAge = (month, year) => {
  const curr_year = new Date().getFullYear();
  const curr_month = new Date().getMonth() + 1;

  return (curr_year - year - 1) + parseInt((12 - month + curr_month) / 12);
};

module.exports = (user) => {
  return {
    _id: user._id,
    name: user.name,
    age: getUserAge(user.birth_time.month, user.birth_time.year),
    birth_day: user.birth_time.day + "." + user.birth_time.month + "." + user.birth_time.year,
    gender: user.gender,
    wanted_gender: user.wanted_gender,
    completed: user.completed,
    language_preference: user.language_preference,
    sign: user.sign,
    mars_sign: user.mars_sign,
    venus_sign: user.venus_sign,
    sign_id: user.sign_id,
    profile_photo_list: user.profile_photo_list,
    notification_permission: user.notification_permission
  }
}
