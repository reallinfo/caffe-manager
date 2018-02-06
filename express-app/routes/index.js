const express = require('express');
const router = express.Router();
const auth = require("../controllers/AuthController.js");

const Storage = require('../models/storage');

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

// Get Admin Manage_users
router.get('/admin/manage_users', function(req, res) {
  res.render('admin/manage_users', { user: req.user });
});

// Get Admin Warehouse
router.get('/admin/warehouse', function(req, res) {
  // Get storages by id
  res.render('admin/warehouse', { user: req.user });
});

// Post Admin Warehouse
router.post('/admin/warehouse', function(req, res) {
  // Get storage name
  var storage = new Storage();
  storage.name = req.body.storageName;
  // Check if the name exists and create storage in the db
  if(storage.name != ''){
    storage.save(function(err){
      if(err){
        console.log(err);
        return;
      }else{
        res.render('admin/warehouse', { user: req.user });
        console.log('Storage has been successfuly saved!');
      }
    });
  }else{
    return console.log('Error: Storage must have a name!');
  }
});


module.exports = router;
