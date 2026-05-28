const Patient = require('../models/patient');
// ==========================================
// 1. GET ALL PATIENTS
// ==========================================
const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        return res.status(200).json(patients); 
    } catch (error) {
        console.error("Error in getAllPatients:", error.message);
        return res.status(500).json({ message: 'Error getting patients', error: error.message });
    }
};

// ==========================================
// 2. GET PATIENT BY ID
// ==========================================
const getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        
        if (patient) {
            return res.status(200).json(patient);    
        } else {
            return res.status(404).json({ message: 'No patient found' });
        }
    } catch (error) {
        console.error("Error in getPatientById:", error.message);
        return res.status(500).json({ message: 'Error getting patient', error: error.message });
    }
};

// ==========================================
// 3. CREATE PATIENT
// ==========================================
const createpatient = async (req, res) => {
    try { 
        const newpatient = await Patient.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            gender: req.body.gender,
            diagnosis: req.body.diagnosis,
            admissionDate: req.body.admissionDate,
            status: req.body.status,
            doctor: req.body.doctor
        });
        return res.status(201).json(newpatient);
    } catch (error) {
        console.error("Error in createpatient:", error.message);
        return res.status(500).json({ message: 'Error creating patient', error: error.message });
    }
};

// ==========================================
// 4. DELETE PATIENT
// ==========================================
const deletepatient = async (req, res) => {
    try {
        const mongoose = require('mongoose');
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid patient id format' });
        }

        const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
        
        if (deletedPatient) {
            return res.status(200).json({
                message: 'Patient deleted successfully',
                deleteId: req.params.id
            });
        } else {
            return res.status(404).json({ message: 'Patient not found' });
        }
    } catch (error) {
        console.error("Error in deletepatient:", error.message);
        return res.status(500).json({ message: 'Error deleting patient', error: error.message });
    }
};

// ==========================================
// 5. UPDATE PATIENT
// ==========================================
const updatepatient = async (req, res) => {
    try {
        const updateData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            gender: req.body.gender,
            diagnosis: req.body.diagnosis,
            admissionDate: req.body.admissionDate,
            status: req.body.status,
            doctor: req.body.doctor
        };

        const updatedPatient = await Patient.findByIdAndUpdate(
            req.params.id, 
            updateData, 
            { new: true, runValidators: true }
        );

        if (updatedPatient) {
            return res.status(200).json({
                message: 'Patient updated successfully', 
                updatedId: req.params.id,
                patient: updatedPatient
            });
        } else {
            return res.status(404).json({ message: 'Patient not found to update' });
        }
    } catch (error) {
        console.error("Error in updatepatient:", error.message);
        return res.status(500).json({ message: 'Error updating patient', error: error.message });
    }
};

module.exports = {
    getAllPatients,
    getPatientById,
    createpatient,
    deletepatient,
    updatepatient
};
