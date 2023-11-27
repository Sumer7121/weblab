function ensureAuthenticated(req, res, next) {
    // Check if the user is authenticated
    if (req.isAuthenticated()) {
      return next(); // User is authenticated, proceed to the next middleware or route handler
    }
  
    // User is not authenticated, redirect to the login page or send an error response
    res.redirect('/login'); // Adjust the path based on your actual login page route
  }
  
  module.exports = { ensureAuthenticated };