const express = require('express');
const router = express.Router();
const patients = require('../controllers/patients.js');
const patientValidationRules= require('../helpers/patientValidator.js');
const doctorValidationRules= require('../helpers/doctorValidator.js');
const doctors = require('../controllers/doctors.js');

// home page 
router.get('/', patients.homepage);

// GET all patients
router.get('/patient',  patients.getAllPatients);
// Get all doctors
router.get('/doctor',  doctors.getAlldoctors);

// GET one patient
router.get('/patient/:id', patients.getPatientById);
// GET one doctor
router.get('/doctor/:id', doctors.getdoctorById);

// POST a new patient
router.post('/patient/create', patientValidationRules, patients.createpatient);
// post a new doctor
router.post('/doctor/create', doctorValidationRules, doctors.createdoctor);

// DELETE a patient
router.delete('/patient/delete/:id', patients.deletepatient);
//  DELETE a doctor
router.delete('/doctor/delete/:id', doctors.deletedoctor);

// UPDATE a patient 
router.put('/patient/update/:id', patientValidationRules, patients.updatepatient);
//  UPDATE a doctor
router.put('/doctor/update/:id', doctorValidationRules, doctors.updatedoctor);

module.exports = router;