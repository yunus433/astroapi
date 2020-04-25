const express = require('express');

const router = express.Router();

const isAPIAuthenticated = require('../middleware/isAPIAuthenticated');

const userGetController = require('../controllers/user/get');

const userPostController = require('../controllers/user/post');
const signupPostController = require('../controllers/user/signup');

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

module.exports = router;
