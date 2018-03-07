const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const auth = require('../controllers/ensureAuthenticated');


const Storage = require('../models/storage');
const User = require('../models/user');
const Article = require('../models/article');

// Restrict index for logged in user only
router.get('/', /*auth.ensureAuthenticated,*/ function(req, res) {
  res.render('index', { /*user : req.user*/ });
});

// Route to login page
router.get('/login', function(req, res) {
  res.render('login');
});

// POST - Logut action
router.post('/logout', function(req, res) {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/login');
});

// POST - Login action
router.post('/login', passport.authenticate('local',{successRedirect:'/admin/home', failureRedirect:'/login', failureFlash: true}),
  function(req, res) {
  res.redirect('/admin/home');
});





module.exports = router;
