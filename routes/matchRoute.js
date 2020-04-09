const express = require('express');

const router = express.Router();

const isAPIAuthenticated = require('../middleware/isAPIAuthenticated');

const matchGetController = require('../controllers/match/get');

const matchPostController = require('../controllers/match/post');

router.get(
  '/',
  isAPIAuthenticated,
  matchGetController
);

router.post(
  '/',
  isAPIAuthenticated,
  matchPostController
);

module.exports = router;
