
const Chat = require('../models/chat/Chat');

module.exports = (socket, io) => {
  socket.on('join', params => {
    socket.join(params.room.toString());
  });
};
