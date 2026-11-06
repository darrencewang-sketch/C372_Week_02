const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isAdmin } = require('../middleware/auth');

router.get('/admin/dashboard', isAdmin, adminController.adminDashboard);
router.get('/admin/users', isAdmin, adminController.adminUsers);
router.get('/admin/users/:id', isAdmin, adminController.adminUserDetails);
router.get('/admin/users/delete/:id', isAdmin, adminController.deleteUser);

module.exports = router;
