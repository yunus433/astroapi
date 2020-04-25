const AWS = require("aws-sdk");

module.exports = (params, callback) => {
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "us-west-2"
  });

  var snsParams = {
    Message: params.message,
    Subject: params.subject,
    PhoneNumber: params.phone
  };

  const sns = new AWS.SNS();

  sns.publish(snsParams, (err, result) => {
    callback(err, result);
  });
};

// const twillo = require('twilio');

// const client = twillo(process.env.TWILIO_ACCOUNT_ID, process.env.TWILIO_AUTH_TOKEN);

// module.exports = (params, callback) => {
//   if (!params || !params.message || !params.to)
//     return callback('missing params');

//   client.messages
//     .create({
//       body: params.message,
//       from: "Astro App",
//       to: params.to
//     })
//     .then(response => {
//       if (response.error_code)
//         return callback(response.error_message);

//       return callback(null, response);
//     });
// }
