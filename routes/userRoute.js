const express = require('express');

const router = express.Router();

const isAPIAuthenticated = require('../middleware/isAPIAuthenticated');

const userGetController = require('../controllers/user/get');

const userPostController = require('../controllers/user/post');

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

module.exports = router;
