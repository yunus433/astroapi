const fetch = require('node-fetch');

const names = [ "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces" ];
// Leo aquarius


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

    },
    "Taurus": {
  
    },
    "Gemini": {
  
    },
    "Cancer": {
  
    },
    "Leo": {
  
    },
    "Virgo": {
  
    },
    "Libra": {
  
    },
    "Scorpio": {
  
    },
    "Sagittarius": {
  
    },
    "Capricorn": {
  
    },
    "Aquarius": {
  
    },
    "Pisces": {
  
    }
  },
  "Scorpio": {
    "Aries": {

    },
    "Taurus": {
  
    },
    "Gemini": {
  
    },
    "Cancer": {
  
    },
    "Leo": {
  
    },
    "Virgo": {
  
    },
    "Libra": {
  
    },
    "Scorpio": {
  
    },
    "Sagittarius": {
  
    },
    "Capricorn": {
  
    },
    "Aquarius": {
  
    },
    "Pisces": {
  
    }
  },
  "Sagittarius": {
    "Aries": {

    },
    "Taurus": {
  
    },
    "Gemini": {
  
    },
    "Cancer": {
  
    },
    "Leo": {
  
    },
    "Virgo": {
  
    },
    "Libra": {
  
    },
    "Scorpio": {
  
    },
    "Sagittarius": {
  
    },
    "Capricorn": {
  
    },
    "Aquarius": {
  
    },
    "Pisces": {
  
    }
  },
  "Capricorn": {
    "Aries": {

    },
    "Taurus": {
  
    },
    "Gemini": {
  
    },
    "Cancer": {
  
    },
    "Leo": {
  
    },
    "Virgo": {
  
    },
    "Libra": {
  
    },
    "Scorpio": {
  
    },
    "Sagittarius": {
  
    },
    "Capricorn": {
  
    },
    "Aquarius": {
  
    },
    "Pisces": {
  
    }
  },
  "Aquarius": {
    "Aries": {

    },
    "Taurus": {
  
    },
    "Gemini": {
  
    },
    "Cancer": {
  
    },
    "Leo": {
  
    },
    "Virgo": {
  
    },
    "Libra": {
  
    },
    "Scorpio": {
  
    },
    "Sagittarius": {
  
    },
    "Capricorn": {
  
    },
    "Aquarius": {
  
    },
    "Pisces": {
  
    }
  },
  "Pisces": {
    "Aries": {

    },
    "Taurus": {
  
    },
    "Gemini": {
  
    },
    "Cancer": {
  
    },
    "Leo": {
  
    },
    "Virgo": {
  
    },
    "Libra": {
  
    },
    "Scorpio": {
  
    },
    "Sagittarius": {
  
    },
    "Capricorn": {
  
    },
    "Aquarius": {
  
    },
    "Pisces": {
  
    }
  }
}

module.exports = async (horoscope) => {
  const values = [];

  names.forEach(name => {
    values.push([combinations[horoscope][name].compatibility, name]);
  });

  await values.sort();

  const newObject = {};

  for (let i = 11; i > -1; i--) {

  }
}
