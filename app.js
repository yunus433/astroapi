const express = require('express');
const http = require('http');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const socketIO = require('socket.io');
const cloudinary = require('cloudinary');

const sockets = require('./sockets/sockets');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

dotenv.config({ path: path.join(__dirname, ".env") });

const PORT = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/astroappapi";

const adminRouteController = require('./routes/adminRoute');
const agreementRouteController = require('./routes/agreementRoute');
const authRouteController = require('./routes/authRoute');
const userRouteController = require('./routes/userRoute');
const matchRouteController = require('./routes/matchRoute');
const chatRouteController = require('./routes/chatRoute');
const premiumRouteController = require('./routes/premiumRoute');
const editRouteController = require('./routes/editRoute');

const {
  SESSION_SECRET,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET
} = process.env;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  auto_reconnect: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.use(express.static(path.join(__dirname, "public")));

const session = expressSession({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
});

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

app.use(session);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.io = io;
  req.cloudinary = cloudinary;
  next();
});

app.use('/admin', adminRouteController);
app.use('/agreement', agreementRouteController);
app.use('/auth', authRouteController);
app.use('/user', userRouteController);
app.use('/match', matchRouteController);
app.use('/chat', chatRouteController);
app.use('/premium', premiumRouteController);
app.use('/edit', editRouteController);

io.on('connection', (socket) => {
  sockets(socket, io);
});

server.listen(PORT, () => {
  console.log(`Server is on port ${PORT}`);
});
