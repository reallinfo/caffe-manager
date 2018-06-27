const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const auth = require('../controllers/ensureAuthenticated');
const dateHandler = require('../controllers/getDate');

const Storage = require('../models/storage');
const User = require('../models/user');
const Article = require('../models/article');
const Table = require('../models/table');

// Multer storage config
const multerStorage = multer.diskStorage({
  // Image storage destination
  destination: function(req, file, cb) {
    cb(null, './images');
  },
  // Define Image name
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
// File filter for uploading images
const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  }else{
    // Reject a file
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

// GET REQUESTS

// Get Edit Article page
router.get('/warehouse/article/:id/edit', /*auth.ensureAuthenticated,*/ function(req, res) {
  Article.findById(req.params.id, function(err, article) {
    res.render('admin/edit_article', {
      article: article
    });
  });
});

// Get Admin Home
router.get('/home', /*auth.ensureAuthenticated,*/ function(req, res) {
  res.render('admin/home', {
    user: req.user,
    active: {
      home: 'activeLink'
    }
  });
});

// Get Register User page
router.get('/register', /*auth.ensureAuthenticated,*/ function(req, res) {
  res.render('admin/manage_users', { /*user: req.user*/ });
});

// Get Admin Manage Users page with all Users
router.get('/manage_users', /*auth.ensureAuthenticated,*/ function(req, res, next) {
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
       usersResponse,
       active: {
         manageUsers: 'activeLink'
       }
     });
  });
});

// Get Admin Warehouse with all Storages
router.get('/warehouse', /*auth.ensureAuthenticated,*/ function(req, res, next) {
  Storage.find({}, function(err, storages){
    if(err){
      console.log(err);
    }else{
      Article.find()
      .select('inStorage')
      .exec()
      .then(articles => {
        res.render('admin/warehouse', {
           /*user: req.user,*/
           articles: articles,
           storages: storages,
           active: {
             warehouse: 'activeLink'
           }
         });
      });
    }
  });
});

// Get Edit User page
router.get('/manage_users/user/:id/edit', /*auth.ensureAuthenticated,*/ function(req, res) {
  User.findById(req.params.id, function(err, user) {
    res.render('admin/edit_user', {
      user: user
    });
  });
});

// Get all Tables
router.get('/tables', /*auth.ensureAuthenticated,*/ function(req, res) {
  Table.find()
  .select('number _id date updated_date')
  .exec()
  .then(tables => {
    const tablesResponse = {
      count: tables.length,
      tables: tables
    };
    res.render('admin/tables', {
      tablesResponse,
      active: {
        tables: 'activeLink'
      }
    });
  });
});

// Get Single Storage by id
router.get('/warehouse/storage/:id', /*auth.ensureAuthenticated,*/ function(req, res, next) {
  let query = req.params.id;
  Storage.findById(query, function(err, storage) {
    if(err){
      console.log(err)
    }else{
      Article.find()
      .select('name _id image date quantity price inStorage')
      .exec()
      .then(articles => {
        const articlesResponse = {
          count: articles.length,
          articles: articles
        };
        res.render('admin/storage', {
          articlesResponse,
          storage: storage
        });
      /*
        res.status(201).json({response, storage: storage});
        console.log('Articles are succesfully GOT!');
      */
      });
    }
  });
});

// GET - single User by id
router.get('/manage_users/user/:id', /*auth.ensureAuthenticated,*/ function(req, res) {
  User.findById(req.params.id, function(err, user) {
    res.render('admin/user', {
      user: user
    });
  });
});

// GET - Edit Storage page
router.get('/warehouse/storage/:id/edit', /*auth.ensureAuthenticated,*/ function(req, res) {
  Storage.findById(req.params.id, function(err, storage) {
    res.render('admin/edit_storage', {
      storage: storage
    });
  });
});

// Get single Table by id
router.get('/tables/table/:id', /*auth.ensureAuthenticated,*/ function(req, res, next) {
  let query = req.params.id;
  Table.findById(query, function(err, table) {
    if(err){
      console.log(err)
    }else{
      Article.find()
      .select('name _id image date quantity price inStorage')
      .exec()
      .then(articles => {
        const articlesResponse = {
          count: articles.length,
          articles: articles
        };
        res.render('admin/single_table', {
          articlesResponse,
          table: table
        });
      });
    }
  });
});


// POST REQUESTS

// Register user
router.post('/register', function(req, res){
  let username = req.body.username;
  let password = req.body.password;
  let password2 = req.body.password2;

  // Validation
  req.checkBody('username', 'Username is required!').notEmpty();
  req.checkBody('password', 'Password is required!').notEmpty();
  req.checkBody('password2', 'Passwords do not match!').equals(req.body.password);

  let errors = req.validationErrors();
  if(errors) {
    res.render('admin/manage_users', {
      errors: errors
    });
  }else{
    let newUser = new User({
      username: username,
      password: password
    });
    User.createUser(newUser, function(err, user) {
      if(err) {
        throw err;
      } else {
        console.log(user);
      }
    });
    // req.flash('success_msg', 'New user has been registered!');
    res.redirect('/admin/manage_users');
  }
});

// Create storage
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

// Update Storage by id
router.post('/warehouse/storage/:id/edit', function(req, res) {
  // New storage object
  let storage = {};
  storage.name = req.body.newStorageName;
  storage.updated_date = dateHandler.getCurrentTime();
  let query = {_id: req.params.id};
  // Check if the new name is typed and UPDATE storage in the db
  if(storage.name != ''){
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
    console.log('Error: Storage must have a name!');
    return;
  }
});

// Update User by id
router.post('/manage_users/user/:id/edit', function(req, res) {
  // New user object
  let user = {};
  user.username = req.body.newUsername;
  user.updated_date = dateHandler.getCurrentTime();
  let query = {_id: req.params.id};
  // Check if the new username is typed and UPDATE user in the db
  if(user.username != ''){
    User.update(query, user, function(err){
      if(err){
        console.log(err);
        return;
      }else{
        res.redirect('/admin/manage_users');
        console.log('User has been successfuly updated!');
      }
    });
  }else{
    console.log('Error: User must have a name!');
    return;
  }
});

// Create article
router.post('/warehouse/storage/:id/create_article', upload.single('articleImage'), function(req, res, next) {
  let article = new Article();
  article.name = req.body.newArticleName;
  article.quantity = req.body.newArticleQuantity;
  article.inStorage = req.body.whichStorage;
  article.price = req.body.newArticlePrice;

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
    console.log('Article name: '+article.name,' Article quantity: '+article.quantity);
    console.log('Error: Article must have a name and quantity!');
    return;
  }
});

// Update - Edit Article by id
router.post('/warehouse/article/:id/edit', upload.single('newArticleImage'), function(req, res) {
  // New article object
  let article = {};
  article.name = req.body.newArticleName;
  article.quantity = req.body.newArticleQuantity;
  article.price = req.body.newArticlePrice;
  if(req.file != undefined && req.file != ''){
    article.image = req.file.path;
  }
  article.updated_date = dateHandler.getCurrentTime();
  let query = {_id: req.params.id};
  // Check if the fields are filled and UPDATE article in the db
  if(article.name != '' && article.quantity != ''){
    Article.update(query, article, function(err){
      if(err){
        console.log(err);
        return;
      }else{
        res.redirect('/admin/warehouse');
        console.log('Article has been successfuly updated!');
      }
    });
  }else{
    console.log('Error: All fields are required!');
    return;
  }
});

// Create Table
router.post('/table', function(req, res) {
  let table = new Table();
  table.number = req.body.tableNumber;
  // Check if the name is typed and CREATE table in the db
  if(table.number != ''){
    table.save(function(err){
      if(err){
        console.log(err);
        return;
      }else{
        res.redirect('/admin/tables');
        console.log('Table has been successfuly added!');
      }
    });
  }else{
    console.log('Error: Table must have a name!');
    return;
  }
});

// DELETE REQUESTS

// Delete Storage
router.delete('/storage/delete/:id', function(req, res){
  let query = {_id: req.params.id};
  //let articleQuery = {inStorage: req.params.inStorage};
  console.log(req.params.inStorage);

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

// Delete Article
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

// Delete Table
router.delete('/table/delete/:id', function(req, res){
  let query = {_id: req.params.id};

  Table.remove(query, function(err){
    if(err){
      console.log(err);
      return;
    }else{
      console.log('Table Deleted successfuly!');
      res.send('Success');
    }
  });
});


module.exports = router;
