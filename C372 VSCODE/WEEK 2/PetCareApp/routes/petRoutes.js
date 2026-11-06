const express = require('express');
const router = express.Router();
const upload = require('../config/upload');
const petController = require('../controllers/petController');
const { isLoggedIn } = require('../middleware/auth');

router.get('/pets/new', isLoggedIn, petController.newPetPage);
router.post('/pets', upload.single('pet_image'), isLoggedIn, petController.createPet);

module.exports = router;
