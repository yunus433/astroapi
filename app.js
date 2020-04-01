// require external npm files
const express = require('express');
const http = require('http');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');

const sockets = require('./sockets/sockets');

// create server
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// config dotenv files
dotenv.config({ path: path.join(__dirname, ".env") });

// define local variables
const PORT = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/sellingplatform";

// require local route controllers
const authRouteController = require('./routes/authRoute');

// connect mongoose to server
mongoose.connect(mongoUri, { useNewUrlParser: true, auto_reconnect: true, useUnifiedTopology: true, useCreateIndex: true });

// set body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// add request object for controllers
app.use((req, res, next) => {
  req.io = io;
  next();
});

// add route controllers
app.use('/auth', authRouteController);

// listen for socket.io connection
io.on('connection', (socket) => {
  sockets(socket, io);
});

// start server
server.listen(PORT, () => {
  console.log(`Server is on port ${PORT}`);
});
