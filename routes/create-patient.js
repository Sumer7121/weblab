// routes/create-patients.js
const express = require('express');
const router = express.Router();
const Patient = require('../models/patient'); // Adjust the path based on your project structure

// Handle GET request for the create-patient page
router.get('/create-patient', (req, res) => {
  res.render('create-patient'); // Render the create-patient.ejs view
});

router.get('/create', authMiddleware.ensureAuthenticated, function(req, res, next) {
  res.render('patients/create');
});

router.get('/details', authMiddleware.ensureAuthenticated, function(req, res, next) {
  res.render('patients/details');
});

module.exports = router;

// Handle POST request for creating a new patient
router.post('/create-patient', async (req, res) => {
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

    res.send('New patient created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
