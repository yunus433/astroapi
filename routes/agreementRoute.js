const express = require('express');

const router = express.Router();

const privacyGetController = require('../controllers/agreement/privacy/get');
const cookieGetController = require('../controllers/agreement/cookie/get');

router.get(
  '/privacy',
    privacyGetController
);
router.get(
  '/cookie',
    cookieGetController
);

module.exports = router;
