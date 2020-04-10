const express = require('express');

const router = express.Router();

const isAPIAuthenticated = require('../middleware/isAPIAuthenticated');

const userPostController = require('../controllers/user/post');

router.post(
  '/',
  isAPIAuthenticated,
  userPostController
);

module.exports = router;
