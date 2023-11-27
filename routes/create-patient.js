const express = require('express');
const router = express.Router();
const Patient = require('../models/patients'); // Adjust the path based on your project structure
const authMiddleware = require('../middlewares/authMiddleware'); // Add the authMiddleware import

// Handle GET request for the create-patient page
router.get('/', (req, res) => {
  res.render('create-patient'); // Render the create-patient.ejs view
});

router.get('/create', authMiddleware.ensureAuthenticated, function(req, res, next) {
  res.render('patients/create');
});

router.get('/details', authMiddleware.ensureAuthenticated, function(req, res, next) {
  res.render('patients/details');
});

// Handle POST request for creating a new patient
router.post('/', async (req, res) => {
  try {
    // Extract data from the form
    const {
      CreatorId,
      CreatorName,
      FirstName,
      LastName,
      Birthdate,
      Zipcode,
      State,
      PhoneNumber,
      CreateDate,
      InsuranceType,
      TestType,
      DoctorService,
      LabName,
      SampleStatus,
    } = req.body;

    // Create a new patient instance
    const newPatient = new Patient({
      CreatorId,
      CreatorName,
      FirstName,
      LastName,
      Birthdate,
      Zipcode,
      State,
      PhoneNumber,
      CreateDate,
      InsuranceType,
      TestType,
      DoctorService,
      LabName,
      SampleStatus,
    });

    // Save the patient to the database
    await newPatient.save();

    // Redirect to the index route after creating a patient
    res.redirect('/'); // Adjust the route based on your project structure
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
module.exports = router;