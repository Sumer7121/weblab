const express = require('express');
const router = express.Router();
const Patient = require('../models/patients');
const mongoose = require('mongoose');
const authMiddleware = require('../middleware/auth');

// Connect to MongoDB using the MONGODB_URI environment variable
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

/* GET home page. */
router.get('/', authMiddleware.ensureAuthenticated, async function(req, res, next) {
  try {
    const patients = await Patient.find();
    res.render('index', { title: 'Express', patients });
  } catch (err) {
    next(err);
  }
});

/* GET login page. */
router.get('/login', authMiddleware.ensureAuthenticated, function(req, res) {
  res.render('login', { title: 'Login' });
});

/* POST route to handle login */
router.post('/login', function(req, res) {
  const { username, password } = req.body;
});

/* POST route to handle patient deletion with confirmation prompt */
router.post('/delete-patient/:id', async function(req, res, next) {
  const patientId = req.params.id;

  try {
    await Patient.findByIdAndDelete(patientId);
    console.log('Patient deleted successfully');

    // Reload the page after deleting
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

/* GET route to render the create/edit-patient form */
router.get('/edit-patient/:id', authMiddleware.ensureAuthenticated, async function(req, res, next) {
  const patientId = req.params.id;
  try {
    // If patientId is provided, it's an edit operation
    if (patientId) {
      const patient = await Patient.findById(patientId);
      res.render('create-patient', { title: 'Edit Patient', patient });
    } else {
      // If no patientId is provided, it's a create operation
      res.render('create-patient', { title: 'Create Patient' });
    }
  } catch (err) {
    next(err);
  }
});

/* POST route to handle both creating and editing patients */
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

    // Check if there's a patient ID in the request (for edit)
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