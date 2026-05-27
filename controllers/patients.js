const Patient = require('../models/Patient')
const objectId = require('mongodb').ObjectId;

// ==========================
// controller for patient collection in mongodb
// ===========================
const getAllPatients =  async(req, res) => {
    const patients = await Patient
    .find();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(patients);    
};

// ========================
// get patient by id
// ========================

const getPatientById=  async(req, res) => {
    const patientId = new objectId(req.params.id);
    const patients = await Patient
    .find({ _id: patientId});
        if(patients) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(patients);    
        } else {
            res.status(404).json({message: 'No patient found'});
        }
    };
// ======================
//  create patient 
// ======================
const createpatient =  async(req, res) => {

    try { 
    const newpatient = await Patient.create({
        firstName : req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        gender: req.body.gender,
        diagnosis: req.body.diagnosis,
        admissionDate: req.body.admissionDate,
        status: req.body.status,
        doctor: req.body.doctor
    });
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json(newpatient);
    } catch (error) {
        res.status(500).send('Error creating patient');

    }
}
// ==============================
// delete patient
// ==============================

const deletepatient =  async(req, res) => {
  const patientId = new objectId(req.params.id);
//    check if id is valid
    if(!objectId.isValid(patientId)) {
        return res.status(400).json({message: 'Invalid patient id'});
       
    }
    const response = await Patient
    .deleteOne({ _id: patientId});
           if(response.deletedCount > 0) {
            res.status(200).json({
                message: 'Patient  deleted successfully',
                deleteId: patientId
            });
        } else if (response.deletedCount == 0) {
            res.status(404).json({message: ' Patient not found'});
        }
        else {
            res.status(500).json({message: ' Patient not deleted'});
        }
    }

// ==============================
// update patient
// ==============================

const updatepatient =  async(req, res) => {
    const patientId = new objectId(req.params.id);
    const newpatient = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        gender: req.body.gender,
        diagnosis: req.body.diagnosis,
        admissionDate: req.body.admissionDate,
        status: req.body.status,
        doctor: req.body.doctor
    }

    const response = await Patient
    .replaceOne({ _id: patientId}, newpatient);

        if(response.modifiedCount > 0) {
            res.status(200).json({message: 'Patient updated successfully', updatedId: patientId});
        } else {
            res.status(500).json({message: ' Patient not updated'});
        }
    }



// =====================
// import router
// =====================
module.exports = {
    getAllPatients,
    getPatientById,
    createpatient,
    deletepatient,
    updatepatient
}