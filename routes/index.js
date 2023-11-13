const express = require('express');
const router = express.Router();
const Patient = require('../models/patients');
const { findByIdAndRemove } = require('../models/patients');

/* GET home page. */
router.get('/', async function(req, res, next) {
  // let newPatient = new Patient({
  //   "CreatorId": "12345",
  //   "CreatorName": "John Doe",
  //   "FirstName": "Alice",
  //   "LastName": "Smith",
  //   "Birthdate": "1990-05-15",
  //   "Zipcode": "12345",
  //   "State": "California",
  //   "PhoneNumber": "555-1234",
  //   "CreateDate": "2023-11-10",
  //   "InsuranceType": "Health Insurance",
  //   "TestType": "Blood Test",
  //   "DoctorService": "General Check-up",
  //   "LabName": "ABC Lab",
  //   "SampleStatus": "Pending"
  // });

  // try {
  //   await newPatient.save();
  // } catch (err) {
  //   console.log(err);
  // }

  res.render('index', { title: 'Express' });
});

module.exports = router;