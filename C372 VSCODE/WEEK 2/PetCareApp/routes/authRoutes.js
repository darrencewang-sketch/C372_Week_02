const express = require('express');
const router = express.Router();
const upload = require('../config/upload');
const authController = require('../controllers/authController');

router.get('/signup', authController.signupPage);
router.post('/signup', upload.single('pet_image'), authController.signupPost);
router.get('/login', authController.loginPage);
router.post('/login', authController.loginPost);
router.get('/logout', authController.logout);

module.exports = router;
