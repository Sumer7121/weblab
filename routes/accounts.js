const express = require('express');
const passport = require('passport');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const User = require('../models/user'); // Assuming you have a User model

// GET login page
router.get('/login', function (req, res) {
    res.render('../views/accounts/login', { message: req.flash('loginMessage') });
});

// GET signup page
router.get('/signup', function (req, res) {
    User.find()
        .then(users => {
            res.render('../views/accounts/signup', { message: req.flash('signupMessage'), users });
        })
        .catch(error => {
            console.log(error);
            res.status(500).send('Internal Server Error');
        });
});

// GET logout
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

// POST signup
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/accounts/signup',
    failureFlash: true
}));

// POST login
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/accounts/login',
    failureFlash: true
}));

// GET edit user page
router.get('/edit/:id', authMiddleware.ensureAuthenticated, function (req, res) {
    const userId = req.params.id;

    User.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).send('User not found');
            }

            res.render('../views/accounts/edit', { user });
        })
        .catch(error => {
            console.log(error);
            res.status(500).send('Internal Server Error');
        });
});

// POST update user
router.post('/edit/:id', authMiddleware.ensureAuthenticated, function (req, res) {
    const userId = req.params.id;

    User.findByIdAndUpdate(userId, req.body)
        .then(() => {
            res.redirect('/accounts/signup');
        })
        .catch(error => {
            console.log(error);
            res.status(500).send('Internal Server Error');
        });
});

// POST delete user
router.post('/delete/:id', authMiddleware.ensureAuthenticated, function (req, res) {
    const userId = req.params.id;

    User.findByIdAndRemove(userId)
        .then(() => {
            res.redirect('/accounts/signup');
        })
        .catch(error => {
            console.log(error);
            res.status(500).send('Internal Server Error');
        });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

module.exports = router;