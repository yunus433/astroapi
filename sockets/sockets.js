
module.exports = (socket, io) => {
  socket.on('join', params => {
    socket.join(params.room.toString());
  });
};
