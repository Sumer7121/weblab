const express = require('express');
const router = express.Router();
const Patient = require('../models/patients');
const authMiddleware = require('../middlewares/authMiddleware');

// Handle GET request for the create-patient page
router.get('/create-patient', async function(req, res, next) {
  try {
    // Assuming you have logic to retrieve patient data, replace this with your actual logic
    const patient = await getPatientDataSomehow();

    // Render the create-patient view with the existing patient data
    res.render('create-patient', { title: 'Create Patient', patient });
  } catch (err) {
    next(err);
  }
});

// Handle POST request for creating a new patient or editing an existing one
router.post('/edit-patient', async function(req, res, next) {
  try {
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

    const patientId = req.body.patientId;

    if (patientId) {
      // Edit existing patient
      await Patient.findByIdAndUpdate(patientId, {
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
    } else {
      // Create new patient
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

      await newPatient.save();
    }

    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
