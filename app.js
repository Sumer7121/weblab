const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const createError = require('http-errors');
require('dotenv').config();
const passport = require('passport');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const createPatientRouter = require('./routes/create-patient');
const accountsRouter = require('./routes/accounts');
const csvExportRouter = require('./routes/csv-export'); // Add this line

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const session = require('express-session');

require('./config/passport')(passport);

app.use(cookieParser());
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

mongoose.set('strictQuery', false);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'devkey',
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/create-patient', createPatientRouter);
app.use('/accounts', accountsRouter);
app.use('/csv-export', csvExportRouter); // Add this line

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;