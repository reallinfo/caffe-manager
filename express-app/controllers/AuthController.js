const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../models/user");

var userController = {};

// Restrict access to root page
userController.home = function(req, res) {
  res.render('index', { /*user : req.user*/ });
};

// Go to login page
userController.login = function(req, res) {
  res.render('login', { /*user : req.user*/ });
};

// Post login
userController.doLogin = function(req, res) {
  passport.authenticate('local')(req, res, function () {
    res.redirect('/admin/home');
  });
};

// logout
userController.logout = function(req, res) {
  req.logout();
  res.redirect('/login');
};



module.exports = userController;
