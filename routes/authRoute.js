const express = require('express');
const multer = require('multer');

const upload = multer({ dest: './public/res/uploads/' });
const router = express.Router();

const isAPIAuthenticated = require('../middleware/isAPIAuthenticated');

const phonePostController = require('../controllers/auth/phone/post');
const codePostController = require('../controllers/auth/code/post');
const detailsPostController = require('../controllers/auth/details/post');

router.post(
  '/phone',
  isAPIAuthenticated,
  phonePostController
);
router.post(
  '/code',
  isAPIAuthenticated,
  codePostController
);
router.post(
  '/details',
  isAPIAuthenticated,
  detailsPostController
);

module.exports = router;
