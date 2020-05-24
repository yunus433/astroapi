const express = require('express');

const router = express.Router();

const privacyGetController = require('../controllers/agreement/privacy/get');
const cookieGetController = require('../controllers/agreement/cookie/get');
const policyGetController = require('../controllers/agreement/policy/get');

router.get(
  '/privacy',
    privacyGetController
);
router.get(
  '/cookie',
    cookieGetController
);
router.get(
  '/policy',
    policyGetController
);

module.exports = router;
