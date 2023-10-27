const express = require('express');
const router = express.Router();

// Handle GET request for the create-patient page
router.get('/create-patient', (req, res) => {
  res.render('create-patient'); // Render the create-patient.ejs view
});

// Handle POST request for creating a new patient
router.post('/create-patient', (req, res) => {
  // Here, you can handle the logic for creating a new patient
  const { name, email } = req.body;

  // Perform any necessary validation or data processing

  // Create a new patient in the database or perform any other required actions
  // ...

  // Redirect to a success page or display a success message
  res.send('New patient created successfully!');
});

module.exports = router;