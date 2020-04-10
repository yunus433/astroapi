const express = require('express');

const router = express.Router();

const isAPIAuthenticated = require('../middleware/isAPIAuthenticated');

const indexGetController = require('../controllers/chat/index/get');

// const indexPostController = require('../controllers/chat/index/post');

router.get(
  '/',
  isAPIAuthenticated,
  indexGetController
);

// router.post(
//   '/',
//   isAPIAuthenticated,
//   indexPostController
// );

module.exports = router;
