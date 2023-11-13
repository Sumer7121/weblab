var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');

var app = express();

mongoose.connect('mongodb+srv://webLab:Suralu33322@weblab.qojan6v.mongodb.net/patientsApp')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Handle GET request for the login page
app.get('/login', (req, res) => {
  res.render('login'); // Render the login.ejs view
});

// Handle POST request for the login form
app.post('/login', (req, res) => {
  // Here, you can handle the login logic and authentication
  const { username, password } = req.body;

  // Perform authentication checks, e.g., validate username and password

  // If authentication is successful, redirect to the main page
  if (username === 'admin' && password === 'admin123') {
    res.redirect('/index');
  } else {
    res.send('Invalid credentials'); // Render an error message if authentication fails
  }
});

// Define a route for the main page
app.get('/index', (req, res) => {
  res.render('index'); // Render the index.ejs view
});

// Define a route for the create-patient page
app.get('/create-patient', (req, res) => {
  res.render('create-patient'); // Render the create-patient.ejs view
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;