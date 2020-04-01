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
