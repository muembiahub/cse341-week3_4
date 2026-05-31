const express = require('express');
const router = express.Router();
const patients = require('../controllers/patients.js');
const patientValidationRules = require('../helpers/patientValidator.js');
const doctorValidationRules = require('../helpers/doctorValidator.js');
const doctors = require('../controllers/doctors.js');
const {isAuthenticated} = require('../middleware/auth.js');


// ==========================================
// PATIENT ROUTES (PROTECTED)
// ==========================================

// GET all patients
router.get('/patient',(req, res) => {
    /*  #swagger.tags = ['Patients']
        #swagger.description = 'Retrieve a list of all patients.'
        #swagger.security = [{ "BearerAuth": [] }] 
    */
    patients.getAllPatients(req, res);
});

// GET one patient
router.get('/patient/:id',(req, res) => {
    /*  #swagger.tags = ['Patients']
        #swagger.description = 'Retrieve a single patient by their unique ID.'
        #swagger.security = [{ "BearerAuth": [] }] 
    */
    patients.getPatientById(req, res);
});

// POST a new patient
router.post('/patient/create',  patientValidationRules, (req, res) => {
    /*  #swagger.tags = ['Patients']
        #swagger.description = 'Register a new patient into the hospital system.'
        #swagger.security = [{ "BearerAuth": [] }] 
    */
    patients.createpatient(req, res);
});

// UPDATE a patient 
router.put('/patient/update/:id',isAuthenticated,  patientValidationRules, (req, res) => {
    /*  #swagger.tags = ['Patients']
        #swagger.description = 'Update details of an existing patient.'
        #swagger.security = [{ "BearerAuth": [] }] 
    */
    patients.updatepatient(req, res);
});

// DELETE a patient
router.delete('/patient/delete/:id',isAuthenticated, (req, res) => {  /* 
    #swagger.tags = ['Patients']
    #swagger.description = 'Remove a patient record permanently from the database.'
    #swagger.security = [{ "BearerAuth": [] }] 
*/
patients.deletepatient( req, res);
});


// ==========================================
// DOCTOR ROUTES (PROTECTED)
// ==========================================

// Get all doctors
router.get('/doctor', (req, res) => {
    /*  #swagger.tags = ['Doctors']
        #swagger.description = 'Retrieve a list of all doctors.'
        #swagger.security = [{ "BearerAuth": [] }] 
    */
    doctors.getAlldoctors(req, res);
});

// GET one doctor
router.get('/doctor/:id',  (req, res) => {
    /*  #swagger.tags = ['Doctors']
        #swagger.description = 'Retrieve a single doctor by their unique ID.'
        #swagger.security = [{ "BearerAuth": [] }] 
    */
    doctors.getdoctorById(req, res);
});

// POST a new doctor
router.post('/doctor/create', isAuthenticated, doctorValidationRules, (req, res) => {
    /*  #swagger.tags = ['Doctors']
        #swagger.description = 'Add a new doctor to the clinic roster.'
        #swagger.security = [{ "BearerAuth": [] }] 
    */
    doctors.createdoctor(req, res);
});

// UPDATE a doctor
router.put('/doctor/update/:id',isAuthenticated , doctorValidationRules, (req, res) => {
    /*  #swagger.tags = ['Doctors']
        #swagger.description = 'Modify an existing doctor profile.'
        #swagger.security = [{ "BearerAuth": [] }] 
    */
    doctors.updatedoctor(req, res);
});

// DELETE a doctor
router.delete('/doctor/delete/:id',isAuthenticated,  (req, res) => {
    /*  #swagger.tags = ['Doctors']
        #swagger.description = 'Remove a doctor profile from the system.'
        #swagger.security = [{ "BearerAuth": [] }] 
    */
    doctors.deletedoctor(req, res);
});

module.exports = router;
