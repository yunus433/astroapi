const express = require('express');

const router = express.Router();

const isAPIAuthenticated = require('../middleware/isAPIAuthenticated');

const blockPostController = require('../controllers/block/post');

router.post(
  '/',
  isAPIAuthenticated,
  blockPostController
);

module.exports = router;
