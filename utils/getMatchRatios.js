const names = [ "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces" ];

const combinations = {
  "Aries": {
    "Aries": {
      "communication": 80,
      "sex": 85,
      "compatibility": 82.5
    },
    "Taurus": {
      "communication": 10,
      "sex": 40,
      "compatibility": 25
    },
    "Gemini": {
      "communication": 100,
      "sex": 70,
      "compatibility": 85
    },
    "Cancer": {
      "communication": 20,
      "sex": 10,
      "compatibility": 15
    },
    "Leo": {
      "communication": 60,
      "sex": 100,
      "compatibility": 80
    },
    "Virgo": {
      "communication": 25,
      "sex": 25,
      "compatibility": 25
    },
    "Libra": {
      "communication": 45,
      "sex": 55,
      "compatibility": 50
    },
    "Scorpio": {
      "communication": 25,
      "sex": 25,
      "compatibility": 25
    },
    "Sagittarius": {
      "communication": 60,
      "sex": 100,
      "compatibility": 80
    },
    "Capricorn": {
      "communication": 20,
      "sex": 10,
      "compatibility": 15
    },
    "Aquarius": {
      "communication": 100,
      "sex": 70,
      "compatibility": 85
    },
    "Pisces": {
      "communication": 10,
      "sex": 40,
      "compatibility": 25
    }
  },
  "Taurus": {
    "Aries": {
      "communication": 10,
      "sex": 40,
      "compatibility": 25
    },
    "Taurus": {
      "communication": 80,
      "sex": 85,
      "compatibility": 82.5
    },
    "Gemini": {
      "communication": 10,
      "sex": 40,
      "compatibility": 25
    },
    "Cancer": {
      "communication": 100,
      "sex": 70,
      "compatibility": 85
    },
    "Leo": {
      "communication": 20,
      "sex": 10,
      "compatibility": 15
    },
    "Virgo": {
      "communication": 60,
      "sex": 100,
      "compatibility": 80
    },
    "Libra": {
      "communication": 25,
      "sex": 25,
      "compatibility": 25
    },
    "Scorpio": {
      "communication": 45,
      "sex": 55,
      "compatibility": 50
    },
    "Sagittarius": {
      "communication": 25,
      "sex": 25,
      "compatibility": 25
    },
    "Capricorn": {
      "communication": 60,
      "sex": 100,
      "compatibility": 80
    },
    "Aquarius": {
      "communication": 20,
      "sex": 10,
      "compatibility": 15
    },
    "Pisces": {
      "communication": 100,
      "sex": 70,
      "compatibility": 85
    }
  },
  "Gemini": {
    "Aries": {
      "communication": 100,
      "sex": 70,
      "compatibility": 85
    },
    "Taurus": {
      "communication": 10,
      "sex": 40,
      "compatibility": 25
    },
    "Gemini": {
      "communication": 80,
      "sex": 85,
      "compatibility": 82.5
    },
    "Cancer": {
      "communication": 10,
      "sex": 40,
      "compatibility": 25
    },
    "Leo": {
      "communication": 100,
      "sex": 70,
      "compatibility": 85
    },
    "Virgo": {
      "communication": 20,
      "sex": 10,
      "compatibility": 15
    },
    "Libra": {
      "communication": 60,
      "sex": 100,
      "compatibility": 80
    },
    "Scorpio": {
      "communication": 25,
      "sex": 25,
      "compatibility": 25
    },
    "Sagittarius": {
      "communication": 45,
      "sex": 55,
      "compatibility": 50
    },
    "Capricorn": {
      "communication": 25,
      "sex": 25,
      "compatibility": 25
    },
    "Aquarius": {
      "communication": 60,
      "sex": 100,
      "compatibility": 80
    },
    "Pisces": {
      "communication": 20,
      "sex": 10,
      "compatibility": 15
    }
  },
  "Cancer": {
    "Aries": {
      "communication": 20,
      "sex": 10,
      "compatibility": 15
    },
    "Taurus": {
      "communication": 100,
      "sex": 70,
      "compatibility": 85
    },
    "Gemini": {
      "communication": 10,
      "sex": 40,
      "compatibility": 25
    },
    "Cancer": {
      "communication": 80,
      "sex": 85,
      "compatibility": 82.5
    },
    "Leo": {
      "communication": 10,
      "sex": 40,
      "compatibility": 25
    },
    "Virgo": {
      "communication": 100,
      "sex": 70,
      "compatibility": 85
    },
    "Libra": {
      "communication": 20,
      "sex": 10,
      "compatibility": 15
    },
    "Scorpio": {
      "communication": 60,
      "sex": 100,
      "compatibility": 80
    },
    "Sagittarius": {
      "communication": 25,
      "sex": 25,
      "compatibility": 25
    },
    "Capricorn": {
      "communication": 45,
      "sex": 55,
      "compatibility": 50
    },
    "Aquarius": {
      "communication": 25,
      "sex": 25,
      "compatibility": 25
    },
    "Pisces": {
      "communication": 60,
      "sex": 100,
      "compatibility": 80
    }
  },
  "Leo": {
    "Aries": {
      "communication": 60,
      "sex": 100,
      "compatibility": 80
    },
    "Taurus": {
      "communication": 20,
      "sex": 10,
      "compatibility": 15
    },
    "Gemini": {
      "communication": 100,
      "sex": 70,
      "compatibility": 85
    },
    "Cancer": {
      "communication": 10,
      "sex": 40,
      "compatibility": 25
    },
    "Leo": {
      "communication": 80,
      "sex": 85,
      "compatibility": 82.5
    },
    "Virgo": {
      "communication": 10,
      "sex": 40,
      "compatibility": 25
    },
    "Libra": {
      "communication": 100,
      "sex": 70,
      "compatibility": 85
    },
    "Scorpio": {
      "communication": 20,
      "sex": 10,
      "compatibility": 15
    },
    "Sagittarius": {
      "communication": 60,
      "sex": 100,
      "compatibility": 80
    },
    "Capricorn": {
      "communication": 25,
      "sex": 25,
      "compatibility": 25
    },
    "Aquarius": {
      "communication": 45,
      "sex": 55,
      "compatibility": 50
    },
    "Pisces": {
      "communication": 25,
      "sex": 25,
      "compatibility": 25
    }
  },
  "Virgo": {
    "Aries": {
      "communication": 25,
      "sex": 25,
      "compatibility": 25
    },
    "Taurus": {
      "communication": 60,
      "sex": 100,
      "compatibility": 80
    },
    "Gemini": {
      "communication": 20,
      "sex": 10,
      "compatibility": 15
    },
    "Cancer": {
      "communication": 100,
      "sex": 70,
      "compatibility": 85
    },
    "Leo": {
      "communication": 10,
      "sex": 40,
      "compatibility": 25
    },
    "Virgo": {
      "communication": 80,
      "sex": 85,
      "compatibility": 82.5
    },
    "Libra": {
      "communication": 10,
      "sex": 40,
      "compatibility": 25
    },
    "Scorpio": {
      "communication": 100,
      "sex": 70,
      "compatibility": 85
    },
    "Sagittarius": {
      "communication": 20,
      "sex": 10,
      "compatibility": 15
    },
    "Capricorn": {
      "communication": 60,
      "sex": 100,
      "compatibility": 80
    },
    "Aquarius": {
      "communication": 25,
      "sex": 25,
      "compatibility": 25
    },
    "Pisces": {
      "communication": 45,
      "sex": 55,
      "compatibility": 50
    }
  },
  "Libra": {
    "Aries": {
      "communication": 45,
      "sex": 55,
      "compatibility": 50
    },
    "Taurus": {
      "communication": 25,
      "sex": 25,
      "compatibility": 25
    },
    "Gemini": {
      "communication": 60,
      "sex": 100,
      "compatibility": 80
    },
    "Cancer": {
      "communication": 20,
      "sex": 10,
      "compatibility": 15
    },
    "Leo": {
      "communication": 100,
      "sex": 70,
      "compatibility": 85
    },
    "Virgo": {
      "communication": 10,
      "sex": 40,
      "compatibility": 25
    },
    "Libra": {
      "communication": 80,
      "sex": 85,
      "compatibility": 82.5
    },
    "Scorpio": {
      "communication": 10,
      "sex": 40,
      "compatibility": 25
    },
    "Sagittarius": {
      "communication": 100,
      "sex": 70,
      "compatibility": 85
    },
    "Capricorn": {
      "communication": 20,
      "sex": 10,
      "compatibility": 15
    },
    "Aquarius": {
      "communication": 60,
      "sex": 100,
      "compatibility": 80
    },
    "Pisces": {
      "communication": 25,
      "sex": 25,
      "compatibility": 25
    }
  },
  "Scorpio": {
    "Aries": {
      "communication": 25,
      "sex": 25,
      "compatibility": 25
    },
    "Taurus": {
      "communication": 45,
      "sex": 55,
      "compatibility": 40
    },
    "Gemini": {
      "communication": 25,
      "sex": 25,
      "compatibility": 25
    },
    "Cancer": {
      "communication": 60,
      "sex": 100,
      "compatibility": 80
    },
    "Leo": {
      "communication": 20,
      "sex": 10,
      "compatibility": 15
    },
    "Virgo": {
      "communication": 100,
      "sex": 70,
      "compatibility": 85
    },
    "Libra": {
      "communication": 10,
      "sex": 40,
      "compatibility": 25
    },
    "Scorpio": {
      "communication": 80,
      "sex": 85,
      "compatibility": 85.2
    },
    "Sagittarius": {
      "communication": 10,
      "sex": 40,
      "compatibility": 25
    },
    "Capricorn": {
      "communication": 100,
      "sex": 70,
      "compatibility": 85
    },
    "Aquarius": {
      "communication": 20,
      "sex": 10,
      "compatibility": 15
    },
    "Pisces": {
      "communication": 60,
      "sex": 100,
      "compatibility": 80
    }
  },
  "Sagittarius": {
    "Aries": {
      "communication": 60,
      "sex": 100,
      "compatibility": 80
    },
    "Taurus": {
      "communication": 25,
      "sex": 25,
      "compatibility": 25
    },
    "Gemini": {
      "communication": 45,
      "sex": 55,
      "compatibility": 50
    },
    "Cancer": {
      "communication": 25,
      "sex": 25,
      "compatibility": 25
    },
    "Leo": {
      "communication": 60,
      "sex": 100,
      "compatibility": 80
    },
    "Virgo": {
      "communication": 20,
      "sex": 10,
      "compatibility": 15
    },
    "Libra": {
      "communication": 100,
      "sex": 70,
      "compatibility": 85
    },
    "Scorpio": {
      "communication": 10,
      "sex": 40,
      "compatibility": 25
    },
    "Sagittarius": {
      "communication": 80,
      "sex": 85,
      "compatibility": 82.5
    },
    "Capricorn": {
      "communication": 10,
      "sex": 40,
      "compatibility": 25
    },
    "Aquarius": {
      "communication": 100,
      "sex": 70,
      "compatibility": 85
    },
    "Pisces": {
      "communication": 20,
      "sex": 10,
      "compatibility": 15
    }
  },
  "Capricorn": {
    "Aries": {
      "communication": 20,
      "sex": 10,
      "compatibility": 15
    },
    "Taurus": {
      "communication": 60,
      "sex": 100,
      "compatibility": 80
    },
    "Gemini": {
      "communication": 25,
      "sex": 25,
      "compatibility": 25
    },
    "Cancer": {
      "communication": 45,
      "sex": 55,
      "compatibility": 50
    },
    "Leo": {
      "communication": 25,
      "sex": 25,
      "compatibility": 25
    },
    "Virgo": {
      "communication": 60,
      "sex": 100,
      "compatibility": 80
    },
    "Libra": {
      "communication": 20,
      "sex": 10,
      "compatibility": 15
    },
    "Scorpio": {
      "communication": 100,
      "sex": 70,
      "compatibility": 85
    },
    "Sagittarius": {
      "communication": 10,
      "sex": 40,
      "compatibility": 25
    },
    "Capricorn": {
      "communication": 80,
      "sex": 85,
      "compatibility": 82.5
    },
    "Aquarius": {
      "communication": 10,
      "sex": 40,
      "compatibility": 25
    },
    "Pisces": {
      "communication": 100,
      "sex": 70,
      "compatibility": 85
    }
  },
  "Aquarius": {
    "Aries": {
      "communication": 100,
      "sex": 70,
      "compatibility": 85
    },
    "Taurus": {
      "communication": 20,
      "sex": 10,
      "compatibility": 15
    },
    "Gemini": {
      "communication": 60,
      "sex": 100,
      "compatibility": 80
    },
    "Cancer": {
      "communication": 25,
      "sex": 25,
      "compatibility": 25
    },
    "Leo": {
      "communication": 45,
      "sex": 55,
      "compatibility": 50
    },
    "Virgo": {
      "communication": 25,
      "sex": 25,
      "compatibility": 25
    },
    "Libra": {
      "communication": 60,
      "sex": 100,
      "compatibility": 80
    },
    "Scorpio": {
      "communication": 20,
      "sex": 10,
      "compatibility": 15
    },
    "Sagittarius": {
      "communication": 100,
      "sex": 70,
      "compatibility": 85
    },
    "Capricorn": {
      "communication": 10,
      "sex": 40,
      "compatibility": 25
    },
    "Aquarius": {
      "communication": 80,
      "sex": 85,
      "compatibility": 82.5
    },
    "Pisces": {
      "communication": 10,
      "sex": 40,
      "compatibility": 25
    }
  },
  "Pisces": {
    "Aries": {
      "communication": 10,
      "sex": 40,
      "compatibility": 25
    },
    "Taurus": {
      "communication": 100,
      "sex": 70,
      "compatibility": 85
    },
    "Gemini": {
      "communication": 10,
      "sex": 10,
      "compatibility": 15
    },
    "Cancer": {
      "communication": 60,
      "sex": 100,
      "compatibility": 80
    },
    "Leo": {
      "communication": 25,
      "sex": 25,
      "compatibility": 25
    },
    "Virgo": {
      "communication": 45,
      "sex": 55,
      "compatibility": 50
    },
    "Libra": {
      "communication": 25,
      "sex": 25,
      "compatibility": 25
    },
    "Scorpio": {
      "communication": 60,
      "sex": 100,
      "compatibility": 80
    },
    "Sagittarius": {
      "communication": 20,
      "sex": 10,
      "compatibility": 15
    },
    "Capricorn": {
      "communication": 100,
      "sex": 70,
      "compatibility": 85
    },
    "Aquarius": {
      "communication": 10,
      "sex": 40,
      "compatibility": 25
    },
    "Pisces": {
      "communication": 80,
      "sex": 85,
      "compatibility": 82.5
    }
  }
}

module.exports = (params, callback) => {
  if (params.option == "get matches") {
    const ascendant = params.ascendant, mars_sign = params.mars_sign;

    if (!names.includes(ascendant) || !names.includes(mars_sign))
      return callback("Unknown values for ascendant and mars sign");

    const all_matches = [], best_matches = [], mid_matches = [];
    const ascendant_values = [], mars_sign_values = [];

    names.forEach(name => {
      const newArray = [combinations[ascendant][name].compatibility, combinations[ascendant][name].sex, combinations[ascendant][name].communication, name];
      ascendant_values.push(newArray);
    });

    names.forEach(name => {
      const newArray = [combinations[mars_sign][name].compatibility, combinations[mars_sign][name].sex, combinations[mars_sign][name].communication, name];
      mars_sign_values.push(newArray);
    });

    ascendant_values.forEach(asc_value => {
      mars_sign_values.forEach(mars_value => {
        const newArray = [];
        newArray.push((asc_value[0] + mars_value[0]) / 2);
        newArray.push((asc_value[1] + mars_value[1]) / 2);
        newArray.push((asc_value[2] + mars_value[2]) / 2);
        newArray.push(asc_value[3] + "/" + mars_value[3]);
        all_matches.push(newArray);
      });
    });

    all_matches.sort();
    all_matches.reverse();

    for (let i = 0; i < 10; i++)
      best_matches.push(all_matches[i]);
    
    for (let i = 10; i < 30; i++)
      mid_matches.push(all_matches[i]);

    return callback(false, {
      best_matches,
      mid_matches
    });
  } else if (params.option == "get compatibity") {
    const ascendant_one = params.combination_one.split("/")[0], ascendant_two = params.combination_two.split("/")[0];
    const mars_sign_one = params.combination_one.split("/")[1], mars_sign_two = params.combination_two.split("/")[1];

    callback(null, {
      communication: (combinations[ascendant_one][ascendant_two].communication + combinations[mars_sign_one][mars_sign_two].communication) / 2,
      sex: (combinations[ascendant_one][ascendant_two].sex + combinations[mars_sign_one][mars_sign_two].sex) / 2,
      compatibity: (combinations[ascendant_one][ascendant_two].compatibility + combinations[mars_sign_one][mars_sign_two].compatibility) / 2,
    });
  } else {
    return callback("Unknown option selected");
  }
}
