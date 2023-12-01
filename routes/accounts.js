const express = require('express');
const passport = require('passport');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.get('/login', function (req, res) {
    res.render('../views/accounts/login', { message: req.flash('loginMessage') });
});

router.get('/signup', function (req, res) {
    res.render('../views/accounts/signup', { message: req.flash('signupMessage') });
});

router.get('/logout', function (req, res) {
    req.logout(function(err) {
        if (err) {
            console.log(err);
        }
        res.redirect('/');
    });
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/accounts/signup',
    failureFlash: true
}));

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/accounts/login',
    failureFlash: true
}));

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

module.exports = router;