const express = require('express');

const router = express.Router();

const isAPIAuthenticated = require('../middleware/isAPIAuthenticated');

const userGetController = require('../controllers/user/get');

const userPostController = require('../controllers/user/post');
const signupPostController = require('../controllers/user/signup');
const notificationPostController = require('../controllers/user/notification');

router.get(
  '/',
  isAPIAuthenticated,
  userGetController
);

router.post(
  '/',
  isAPIAuthenticated,
  userPostController
);
router.post(
  '/signup',
  isAPIAuthenticated,
  signupPostController
);
router.post(
  '/notification',
  isAPIAuthenticated,
  notificationPostController
);

module.exports = router;
