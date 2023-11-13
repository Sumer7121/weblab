const express = require('express');
const router = express.Router();
const Patient = require('../models/patients');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const patients = await Patient.find(); // Fetch all patient records from the database
    res.render('index', { title: 'Express', patients }); // Pass the patients data to the template
  } catch (err) {
    next(err);
  }
});

module.exports = router;
