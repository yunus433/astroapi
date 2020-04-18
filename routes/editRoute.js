const express = require('express');

const router = express.Router();

const isAPIAuthenticated = require('../middleware/isAPIAuthenticated');

const editPostController = require('../controllers/edit/post');

router.post(
  '/',
  isAPIAuthenticated,
  editPostController
);

module.exports = router;
