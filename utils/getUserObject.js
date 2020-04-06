module.exports = user => {
  return {
    name: user.name,
    birth_day: user.birth_time.day + "." + user.birth_time.month + "." + user.birth_time.year,
    gender: user.gender,
    wanted_gender: user.wanted_gender,
    completed: user.completed,
    sign: user.sign,
    sign_id: user.sign_id,
    profile_photo_list: user.profile_photo_list
  }
}
