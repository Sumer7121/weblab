var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/help', function(req, res, next) {
    res.render('help', {userName: 'Bob Doe'})
});

module.exports = router;
