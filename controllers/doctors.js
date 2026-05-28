const Doctor = require('../models/doctor'); 
const mongoose = require('mongoose');

// =================================================
// 1. GET ALL DOCTORS
// =================================================
const getAlldoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        return res.status(200).json(doctors);
    } catch (error) {
        console.error("Error fetching doctors:", error.message);
        return res.status(500).json({ message: "Server error while fetching doctors.", error: error.message });
    }
};

// =================================================
// 2. GET DOCTOR BY ID
// =================================================
const getdoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        
        if (doctor) {
            return res.status(200).json(doctor);    
        } else {
            return res.status(404).json({ message: 'No doctor found' });
        }
    } catch (error) {
        console.error("Error fetching doctor by ID:", error.message);
        return res.status(500).json({ message: "Server error while fetching doctor.", error: error.message });
    }
};

// =================================================
// 3. CREATE DOCTOR
// =================================================
const createdoctor = async (req, res) => {
    try {
        const newdoctor = await Doctor.create({
            name: req.body.name,
            specialty: req.body.specialty,
            department: req.body.department
        });
        return res.status(201).json(newdoctor);
    } catch (error) {
        console.error("Error creating doctor:", error.message);
        return res.status(500).json({ message: "Server error while creating doctor.", error: error.message });
    }
};

// =================================================
// 4. DELETE DOCTOR
// =================================================
const deletedoctor = async (req, res) => {
    try { 
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid doctor id format' });
        }

        const deletedDoc = await Doctor.findByIdAndDelete(req.params.id);
        
        if (deletedDoc) {
            return res.status(200).json({
                message: 'Doctor deleted successfully',
                deleteId: req.params.id
            });
        } else {
            return res.status(404).json({ message: 'Doctor not found' });
        }
    } catch (error) {
        console.error("Error deleting doctor:", error.message);
        return res.status(500).json({ message: "Server error while deleting doctor.", error: error.message });
    }
};

// =================================================
// 5. UPDATE DOCTOR
// =================================================
const updatedoctor = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid doctor id format' });
        }

        const updateData = {
            name: req.body.name,
            specialty: req.body.specialty,
            department: req.body.department
        };

        const updatedDoc = await Doctor.findByIdAndUpdate(
            req.params.id, 
            updateData, 
            { new: true, runValidators: true }
        );

        if (updatedDoc) {
            return res.status(200).json({ 
                message: 'Doctor updated successfully', 
                updatedId: req.params.id,
                doctor: updatedDoc
            });
        } else {
            return res.status(404).json({ message: 'Doctor not found to update' });
        }
    } catch (error) {
        console.error("Error updating doctor:", error.message);
        return res.status(500).json({ message: "Server error while updating doctor.", error: error.message });
    }
};

module.exports = {
    getAlldoctors,
    getdoctorById,
    createdoctor,
    deletedoctor,
    updatedoctor
};
