const express = require('express');
const router = express.Router();
const auth = require("../controllers/AuthController.js");

// Restrict index for logged in user only
router.get('/', auth.home);

// Route to register page
router.get('/register', auth.register);

// Route for register action
router.post('/register', auth.doRegister);

// Route to login page
router.get('/login', auth.login);

// Route for login action

router.post('/login', auth.doLogin);

// Route for logout action
router.get('/logout', auth.logout);

// Get Admin Home
router.get('/admin/home', function(req, res) {
  res.render('admin/home', { user: req.user });
});

// Get Admin Warehouse
router.get('/admin/warehouse', function(req, res) {
  res.render('admin/warehouse', { user: req.user });
});

// Get Admin Manage_users
router.get('/admin/manage_users', function(req, res) {
  res.render('admin/manage_users', { user: req.user });
});


module.exports = router;
