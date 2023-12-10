var express = require('express');
var router = express.Router();
const authMiddleware = require('../middleware/auth');
const User = require('../models/user'); // Assuming you have a User model

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
