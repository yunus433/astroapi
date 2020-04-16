const moment = require('moment-timezone');

module.exports = (message, time_zone) => {
  if (message.type == "text") {
    return {
      type: message.type,
      content: message.content,
      sended_by: message.sended_by,
      message_date: moment(message.created_at).tz(time_zone).format("DD[.]MM[.]YYYY"),
      message_time: moment(message.created_at).tz(time_zone).format("HH[:]mm"),
      read: message.read ? true : false
    }
  } else {
    return {
      type: message.type,
      uri: message.uri,
      sended_by: message.sended_by,
      message_date: moment(message.created_at).tz(time_zone).format("DD[.]MM[.]YYYY"),
      message_time: moment(message.created_at).tz(time_zone).format("HH[:]mm"),
      read: message.read ? true : false
    }
  }
}
