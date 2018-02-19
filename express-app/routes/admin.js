const express = require('express');
const router = express.Router();
const auth = require("../controllers/AuthController.js");
const multer = require('multer');

const Storage = require('../models/storage');
const User = require('../models/user');
const Article = require('../models/article');

// Multer storage config
const multerStorage = multer.diskStorage({
  // Image storage destination
  destination: function(req, file, cb) {
    cb(null, './images');
  },
  // Define Image name
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
// File filter for uploading images
const fileFilter = (req, file, cb) => {
  // Reject a file
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  }else{
    cb(null, false);
  }
};

// Init img upload
const upload = multer({
  storage: multerStorage,
  limits: {
    fileSize: 1024 * 1024 * 3
  },
  fileFilter: fileFilter
});

// GET - Route to register user page
router.get('/register', function(req, res){
  res.render('admin/manage_users', { /*user: req.user*/ });
});

// POST - Route for register user action
router.post('/register', function(req, res){
  User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
      if (err) {
        res.render('register');
        return console.log('Error in Registration: '+err);
      }
      passport.authenticate('local')(req, res, function () {
        res.redirect('/admin/manage_users');
        console.log('User successfuly created!');
      });
    });
});

// GET - Admin Home
router.get('/home', function(req, res) {
  res.render('admin/home', { /*user: req.user*/ });
});

// GET - Admin Manage users page - All Users
router.get('/manage_users', function(req, res, next) {
  User.find()
  .select('username date _id')
  .exec()
  .then(users => {
    const usersResponse = {
      count: users.length,
      users: users
    };
    res.render('admin/manage_users', {
       /*user: req.user,*/
       usersResponse
     });
  });
});

// GET - Admin warehouse - All Storages
router.get('/warehouse', function(req, res) {
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

// POST - Create storage
router.post('/warehouse', function(req, res) {
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

// DELETE - Delete Storage
router.delete('/storage/delete/:id', function(req, res){
  let query = {_id: req.params.id};

  Storage.remove(query, function(err){
    if(err){
      console.log(err);
    }
    res.send('Success');
  });
});

// DELETE - Delete User
router.delete('/user/delete/:id', function(req, res) {
  let query = {_id: req.params.id};

  User.remove(query, function(err) {
    if(err){
      console.log(err);
    }
    res.send('Success');
  });
});

// GET - single Storage by id
router.get('/warehouse/storage/:id', function(req, res, next) {
  let query = req.params.id;
  Storage.findById(query, function(err, storage) {
    Article.find()
    .select('name _id image date quantity inStorage')
    .exec()
    .then(articles => {
      const articlesResponse = {
        count: articles.length,
        articles: articles
      };

      res.render('admin/storage', {
        articlesResponse,
        storage: storage,
      });
    /*
          res.status(201).json({response, storage: storage});
      console.log('Articles are succesfully GET!');
    */
    });
  });
});

// GET - single User by id
router.get('/manage_users/user/:id', function(req, res) {
  User.findById(req.params.id, function(err, user) {
    res.render('admin/user', {
      user: user
    });
  });
});

// GET - Edit Storage page
router.get('/warehouse/storage/edit/:id', function(req, res) {
  Storage.findById(req.params.id, function(err, storage) {
    res.render('admin/edit_storage', {
      storage: storage
    });
  });
});

// UPDATE - single Storage by id
router.post('/warehouse/storage/edit/:id', function(req, res) {
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
    console.log('Error: Storage must have a name so it can be updated!');
    return;
  }
});

// POST - Create article
router.post('/warehouse/storage/:id/create_article', upload.single('articleImage'), function(req, res, next) {
  let article = new Article();
  article.name = req.body.newArticleName;
  article.quantity = req.body.newArticleQuantity;
  article.inStorage = req.body.whichStorage;

  if(req.file != undefined && req.file != ''){
    article.image = req.file.path;
  }else{
    article.image = '';
  }
  // Check if the name and quantity are typed and CREATE article in the db
  if(article.name != '' && article.quantity != undefined){
    article.save(function(err){
      if(err){
        console.log(err);
        return;
      }else{
        console.log('Article image path is: '+article.image);
        console.log('Article has been successfuly saved!');
        res.redirect('back'); //res.status(201).json(article);
      }
    });
  }else{
    console.log('Article name: '+article.name,' Article quantity: '+article.quantity)
    console.log('Error: Article must have a name and quantity!');
    return;
  }
});

// DELETE - Delete Article
router.delete('/article/delete/:id', function(req, res){
  let query = {_id: req.params.id};

  Article.remove(query, function(err){
    if(err){
      console.log(err);
      return;
    }else{
      console.log('Article Deleted successfuly!');
      res.send('Success');
    }
  });
});


module.exports = router;
