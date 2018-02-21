const express = require('express'),
      app = express(),
      path = require('path'),
      //favicon = require('serve-favicon'),
      logger = require('morgan'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      expressValidator = require('express-validator'),
      flash = require('connect-flash'),
      index = require('./routes/index'),
      admin = require('./routes/admin'),
      hbs = require('hbs');

mongoose.Promise = global.Promise;

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Express-session middleware
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Express static folders
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static('images'));

// Express-validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    let namespace = param.split('.')
    , root        = namespace.shift()
    , formParam   = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes Middleware
app.use('/', index);
app.use('/admin', admin);

// Passport config
// const User = require('./models/user');
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// Mongoose model
const Storage = require('./models/storage');
// Connect to a local Mongo Database
mongoose.connect('mongodb://localhost/caffe-manager')
.then(() =>  console.log('Database connection successful!'))
.catch((err) => console.error(err));

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');

  err.status = 404;
  next(err);
});


/*
Error handlers
*/

// Development error handler
// Will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// Production error handler
// No stacktraces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
