const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../models/user");

var userController = {};

// Restrict access to root page
userController.home = function(req, res) {
  res.render('index', { user : req.user });
};

// Go to registration page
userController.register = function(req, res) {
  res.render('register', {});
};

// Post registration
userController.doRegister = function(req, res) {
  User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
      if (err) {
      res.render('register');
      return console.log('Error in Registration: '+err);
      }
      passport.authenticate('local')(req, res, function () {
        res.redirect('/admin/manage_users');
      });
    });
};

// Go to login page
userController.login = function(req, res) {
  res.render('login', { user : req.user });
};

// Post login
userController.doLogin = function(req, res) {
  passport.authenticate('local')(req, res, function () {
    res.redirect('/');
  });
};

// logout
userController.logout = function(req, res) {
  req.logout();
  res.redirect('/login');
};

module.exports = userController;
