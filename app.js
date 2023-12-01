const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const createError = require('http-errors'); // Import the createError function
require('dotenv').config(); // Load environment variables from .env file
var passport = require('passport');
var flash    = require('connect-flash');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var createPatientRouter = require('./routes/create-patient');
var accountsRouter = require('./routes/accounts');

var app = express();

app.use(bodyParser.urlencoded({
    extended: true,
  }));
  app.use(bodyParser.json());
  var session      = require('express-session');

require('./config/passport')(passport);
 
app.use(cookieParser()); // read cookies (needed for auth)
  
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'devkey',
  resave: true,
  saveUninitialized: true,
}));
  
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 
 
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});
  

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/create-patient', createPatientRouter);
app.use('/accounts', accountsRouter);



app.use(function (req, res, next) {
  next(createError(404)); // Create and pass the 404 error to the error handler
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;