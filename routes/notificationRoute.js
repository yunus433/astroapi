const express = require('express');

const router = express.Router();

const isAPIAuthenticated = require('../middleware/isAPIAuthenticated');

const notificationPostController = require('../controllers/notification/post');

router.post(
  '/',
  isAPIAuthenticated,
  notificationPostController
);

module.exports = router;
