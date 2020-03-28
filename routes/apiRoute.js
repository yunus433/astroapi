const express = require('express');
const multer = require('multer');

const upload = multer({ dest: './public/res/uploads/' });
const router = express.Router();

