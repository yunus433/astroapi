const mongoose = require('mongoose');
const moment = require('moment-timezone');

const User = require('../models/user/User');
const Chat = require('../models/chat/Chat');

const getMessageObject = require('../utils/getMessageObject');
const uploadPhotoToAWS = require('../utils/uploadPhotoToAWS');
const sendNotification = require('../utils/sendNotification');

module.exports = (socket, io) => {
  socket.on('join', params => {
    socket.join(params.room.toString());
  });

  socket.on('leave', params => {
    socket.leave(params.room.toString());
  });

  socket.on('new_message_send', (params, callback) => {
    if (!params || !params.message || !params.room || !params.id || !params.to_id)
      return callback("bad request");

    if (params.message.type == "text") {
      const new_message_data = {
        type: "text",
        content: params.message.content,
        sended_by: params.message.sendedBy,
        created_at: Date.now(),
        read: false
      }

      User.findById(mongoose.Types.ObjectId(params.id), (err, user) => {
        if (err) return callback(err);
        User.findById(mongoose.Types.ObjectId(params.to_id), (err, user_two) => {
          if (err) return callback(err);
  
          if (io.sockets.clients().adapter.rooms[params.room].length > 1)
            new_message_data.read = true;
  
          Chat.findByIdAndUpdate(mongoose.Types.ObjectId(params.room), {$push: {
            "messages": new_message_data
          }}, {new: true}, (err, chat) => {
            if (err) return callback(err);

            if (!new_message_data.read) {
              sendNotification({
                to: to_id,
                message: {
                  title: user.name,
                  content: new_message_data.content
                }
              }, (err, response) => {
                if (err) return res.status(500).json({ error: "Notification Error: " + err });
                
                socket.to(params.room).emit('new_message', getMessageObject(new_message_data, user_two.time_zone));
                return callback(null, getMessageObject(new_message_data, user.time_zone));
              });
            } else {
              socket.to(params.room).emit('new_message', getMessageObject(new_message_data, user_two.time_zone));
              return callback(null, getMessageObject(new_message_data, user.time_zone));
            }  
          });
        });
      });
    } else {
      uploadPhotoToAWS(params.message.filename, (err, uri) => {
        if (err) return callback(err);
        const new_message_data = {
          type: "image",
          uri: uri,
          sended_by: params.message.sended_by,
          created_at: Date.now(),
          read: false
        }

        User.findById(mongoose.Types.ObjectId(params.id), (err, user) => {
          if (err) return callback(err);
          User.findById(mongoose.Types.ObjectId(params.to_id), (err, user_two) => {
            if (err) return callback(err);
    
            if (io.sockets.clients(params.room).length > 1)
              new_message_data.read = true;
    
            Chat.findByIdAndUpdate(mongoose.Types.ObjectId(params.room), {$push: {
              "messages": new_message_data
            }}, {new: true}, (err, chat) => {
              if (err) return callback(err);
        
              socket.to(params.room).emit('new_message', {message: getMessageObject(new_message_data, user_two.time_zone)});
              return callback(null, {message: getMessageObject(new_message_data, user.time_zone)});
            });
          });
        });
      });
    };
  });


};
