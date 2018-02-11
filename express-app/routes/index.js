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
  res.render('admin/home', { /*user: req.user*/ });
});

// Get Admin Manage_users
router.get('/admin/manage_users', function(req, res) {
  res.render('admin/manage_users', { /*user: req.user*/ });
});

// Get Admin Warehouse
router.get('/admin/warehouse', function(req, res) {
  Storage.find({}, function(err, storages){
    if(err){
      console.log(err);
    }else{
      res.render('admin/warehouse', {
         /*user: req.user,*/
         storages: storages
       });
    }
  });
});

// Create storage
router.post('/admin/warehouse', function(req, res) {
  let storage = new Storage();
  storage.name = req.body.storageName;
  // Check if the name is typed and CREATE storage in the db
  if(storage.name != ''){
    storage.save(function(err){
      if(err){
        console.log(err);
        return;
      }else{
        res.redirect('/admin/warehouse');
        console.log('Storage has been successfuly saved!');
      }
    });
  }else{
    return console.log('Error: Storage must have a name!');
  }
});

// Get single Storage by id
router.get('/admin/warehouse/storage/:id', function(req, res){
  Storage.findById(req.params.id, function(err, storage){
    res.render('admin/storage', {
      storage: storage
    });
  });
});

// Get Edit storage form
router.get('/admin/warehouse/storage/edit/:id', function(req, res){
  Storage.findById(req.params.id, function(err, storage){
    res.render('admin/edit_storage', {
      storage: storage
    });
  });
});

// Edit storage by id - Update storage
router.post('/admin/warehouse/storage/edit/:id', function(req, res) {
  // New storage object
  let storage = {};
  storage.name = req.body.newStorageName;
  let query = {_id: req.params.id}
  // Check if the new name is typed and UPDATE storage in the db
  if(storage.name != ""){
    Storage.update(query, storage, function(err){
      if(err){
        console.log(err);
        return;
      }else{
        res.redirect('/admin/warehouse');
        console.log('Storage has been successfuly updated!');
      }
    });
  }else{
    return console.log('Error: Storage must have a name so it can be updated!');
  }
});


module.exports = router;
