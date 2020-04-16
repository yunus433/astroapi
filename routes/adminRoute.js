const express = require('express');

const router = express.Router();

const isAdmin = require('../middleware/isAdmin');

const indexGetController = require('../controllers/admin/index/get');
const authGetController = require('../controllers/admin/auth/get');

const authPostConroller = require('../controllers/admin/auth/post');

router.get(
  '/',
  isAdmin,
  indexGetController
);
router.get(
  '/auth',
  authGetController
);

router.post(
  '/auth',
  authPostConroller
);

module.exports = router;
