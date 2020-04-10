const mongoose = require('mongoose');
const moment = require('moment-timezone');

const Chat = require('../models/chat/Chat');

module.exports = (socket, io) => {
  socket.on('join', params => {
    socket.join(params.room.toString());
  });

  socket.on('new_message_send', (params, callback) => {
    const new_message_data = {
      content: params.message.content,
      sender_id: params.message.sender_id,
      read: false,
      send_time: moment(Date.now()).tz("Europe/Berlin").format("HH[:]mm"),
      send_day: moment(Date.now()).tz("Europe/Berlin").format("HH[:]mm")
    };

    if (io.sockets.adapter.rooms[params.room]) {
      new_message_data.read = true;

      Chat.findByIdAndUpdate(mongoose.Types.ObjectId(params.room), {$push: {
        "messages": new_message_data
      }}, {new: true}, (err, chat) => {
        if (err) return callback(err);

        socket.to(params.to).emit('newMessage', {message: new_message_data});
        return callback(undefined, {message: new_message_data});
      })
    } else {
      
    };
  });


};
