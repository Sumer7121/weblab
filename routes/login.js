const express = require('express');
const router = express.Router();

// Handle GET request for the login page
router.get('/login', (req, res) => {
  res.render('login'); // Render the login.ejs view
});

// Handle POST request for the login form
router.post('/login', (req, res) => {
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

module.exports = router;