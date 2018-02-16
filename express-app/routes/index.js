const express = require('express');
const router = express.Router();
const auth = require("../controllers/AuthController.js");

const Storage = require('../models/storage');
const User = require('../models/user');
const Article = require('../models/article');

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

// Get Admin Manage_users - All Users
router.get('/admin/manage_users', function(req, res, next) {
  User.find()
  .select('username date _id')
  .exec()
  .then(users => {
    const response = {
      count: users.length,
      users: users
    };
    res.render('admin/manage_users', {
       /*user: req.user,*/
       users
     });
  });
});

// Get Admin Warehouse - All storages
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
    console.log('Error: Storage must have a name!');
    return;
  }
});

// Delete Storage
router.delete('/storage/delete/:id', function(req, res){
  let query = {_id: req.params.id};

  Storage.remove(query, function(err){
    if(err){
      console.log(err);
    }
    res.send('Success');
  });
});

// Delete User
router.delete('/user/delete/:id', function(req, res) {
  let query = {_id: req.params.id};

  User.remove(query, function(err) {
    if(err){
      console.log(err);
    }
    res.send('Success');
  });
});

// Get single Storage by id
router.get('/admin/warehouse/storage/:id', function(req, res) {
  Storage.findById(req.params.id, function(err, storage) {
    Article.find({}, function(err, articles) {
      if(err){
        console.log(err);
      }else{
        res.render('admin/storage', {
          storage: storage,
          articles: articles
        });
      }
    });
  });
});

// Get single User by id
router.get('/admin/manage_users/user/:id', function(req, res) {
  User.findById(req.params.id, function(err, user) {
    res.render('admin/user', {
      user: user
    });
  });
});

// Get Edit Storage page
router.get('/admin/warehouse/storage/edit/:id', function(req, res) {
  Storage.findById(req.params.id, function(err, storage) {
    res.render('admin/edit_storage', {
      storage: storage
    });
  });
});

// Update single Storage by id
router.post('/admin/warehouse/storage/edit/:id', function(req, res) {
  // New storage object
  let storage = {};
  storage.name = req.body.newStorageName;
  let query = {_id: req.params.id};
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

// Create article
router.post('/admin/warehouse/storage/:id/create_article', function(req, res) {
  let article = new Article();
  article.name = req.body.newArticleName;
  article.quantity = req.body.newArticleQuantity;
  // Check if the name and quantity are typed and CREATE article in the db
  if(article.name && article.quantity != '' || null){
    article.save(function(err){
      if(err){
        console.log(err);
        return;
      }else{
        res.redirect('back');;
        console.log('Article has been successfuly saved!');
      }
    });
  }else{
    console.log('Error: Article must have a name and quantity!');
    return;
  }
});


module.exports = router;
