const express = require('express');
const multer = require('multer');

const upload = multer({ dest: './public/res/uploads/' });
const router = express.Router();

const isAPIAuthenticated = require('../middleware/isAPIAuthenticated');

const registerPostController = require('../controllers/auth/register/post');
const codePostController = require('../controllers/auth/code/post');

const codeGetController = require('../controllers/auth/code/get');

router.get(
  '/code',
  isAPIAuthenticated,
  codeGetController
);

router.post(
  '/register',
  isAPIAuthenticated,
  registerPostController
);
router.post(
  '/code',
  isAPIAuthenticated,
  codePostController
);

module.exports = router;
