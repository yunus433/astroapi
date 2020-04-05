const express = require('express');
const multer = require('multer');

const router = express.Router();

const isAPIAuthenticated = require('../middleware/isAPIAuthenticated');

const userGetController = require('../controllers/user/get');

router.get(
  '/',
  isAPIAuthenticated,
  userGetController
);

module.exports = router;
