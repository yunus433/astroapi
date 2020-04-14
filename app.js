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
const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/astroappapi";

// require local route controllers
const indexRouteController = require('./routes/indexRoute');
const authRouteController = require('./routes/authRoute');
const userRouteController = require('./routes/userRoute');
const matchRouteController = require('./routes/matchRoute');
const chatRouteController = require('./routes/chatRoute');

// add pug as views to server
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// connect mongoose to server
mongoose.connect(mongoUri, { useNewUrlParser: true, auto_reconnect: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });

// add public folder to server
app.use(express.static(path.join(__dirname, "public")));

// set body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// add request object for controllers
app.use((req, res, next) => {
  req.io = io;
  next();
});

// add route controllers
app.use('/', indexRouteController);
app.use('/auth', authRouteController);
app.use('/user', userRouteController);
app.use('/match', matchRouteController);
app.use('/chat', chatRouteController);

// listen for socket.io connection
io.on('connection', (socket) => {
  sockets(socket, io);
});

// start server
server.listen(PORT, () => {
  console.log(`Server is on port ${PORT}`);
});
