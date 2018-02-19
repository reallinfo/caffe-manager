const express = require('express');
const router = express.Router();
const auth = require('../controllers/AuthController.js');


const Storage = require('../models/storage');
const User = require('../models/user');
const Article = require('../models/article');

// Restrict index for logged in user only
router.get('/', auth.home);

// Route to login page
router.get('/login', auth.login);

// Route for login action
router.post('/login', auth.doLogin);

// Route for logout action
router.get('/logout', auth.logout);





module.exports = router;
