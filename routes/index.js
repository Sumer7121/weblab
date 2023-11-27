const express = require('express');
const router = express.Router();
const Patient = require('../models/patients');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const patients = await Patient.find();
    res.render('index', { title: 'Express', patients });
  } catch (err) {
    next(err);
  }
});

// POST route to handle patient deletion
router.post('/delete-patient/:id', async function(req, res, next) {
  const patientId = req.params.id;
  try {
    await Patient.findByIdAndDelete(patientId);
    console.log('Patient deleted successfully');
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

module.exports = router;