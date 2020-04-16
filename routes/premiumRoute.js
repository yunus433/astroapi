const express = require('express');

const router = express.Router();

const isAPIAuthenticated = require('../middleware/isAPIAuthenticated');

const premiumPostController = require('../controllers/premium/post');

router.post(
  '/',
  isAPIAuthenticated,
  premiumPostController
);

module.exports = router;
