const express = require('express');
const multer = require('multer');

const upload = multer({ dest: './public/res/uploads/' });
const router = express.Router();

const isAPIAuthenticated = require('../middleware/isAPIAuthenticated');

const phonePostController = require('../controllers/auth/phone/post');
const codePostController = require('../controllers/auth/code/post');
const detailsPostController = require('../controllers/auth/details/post');
const profilePhotoPostController = require('../controllers/auth/profile_photo/post');
const deleteProfilePhotoPostController = require('../controllers/auth/profile_photo/delete/post');

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
router.post(
  '/profilephoto',
  upload.single('file'),
  isAPIAuthenticated,
  profilePhotoPostController
);
router.post(
  '/profilephoto/delete',
  isAPIAuthenticated,
  deleteProfilePhotoPostController
);

module.exports = router;
