const getUserAge = (month, year) => {
  if (!month || !year)
    return 0;

  const curr_year = new Date().getFullYear();
  const curr_month = new Date().getMonth() + 1;

  return (curr_year - year - 1) + parseInt((12 - month + curr_month) / 12);
};

const names = [ "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces" ];
const names_tr = [ "Koç", "Boğa", "İkizler", "Yengeç", "Aslan", "Başak", "Terazi", "Akrep", "Yay", "Oğlak", "Kova", "Balık"];

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
    locale_sign: (user.language_preference == "tr" ? names_tr[names.indexOf(user.sign)] : user.sign),
    mars_sign: user.mars_sign,
    locale_mars_sign: (user.language_preference == "tr" ? names_tr[names.indexOf(user.mars_sign)] : user.mars_sign),
    venus_sign: user.venus_sign,
    locale_venus_sign: (user.language_preference == "tr" ? names_tr[names.indexOf(user.venus_sign)] : user.venus_sign),
    sign_id: user.sign_id,
    profile_photo_list: user.profile_photo_list,
    notification_permission: user.notification_permission,
    is_premium: user.is_premium,
    last_premium_day: user.premium_exp_date ? Math.floor((user.premium_exp_date - (new Date()).getTime()) / 1000 / 60 / 60 / 24) : null
  }
}
