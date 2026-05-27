const Doctor = require('../models/doctor');
const objectId = require('mongodb').ObjectId;


// =================================================
//  controller for doctor collection in mongodb
// =================================================

const getAlldoctors =  async(req, res) => {
    try{
        const doctors = await Doctor.find();
        return res.status(200).json(doctors);
    }catch (error) {
        console.error("Error fetching doctors:", error.message);
        res.status(500).json({ message: "Server error while fetching doctors." });
    }
}

// ======================
// get patient by id
// ======================

const getdoctorById=  async(req, res) => {
    const doctorId = new objectId(req.params.id);
    const doctors = await Doctor
    .find({ _id: doctorId});
        if(doctors) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(doctors);    
        } else {
            res.status(404).json({message: 'No patient found'});
        }
    };

// ========================
//  create doctor
// ========================

const createdoctor =  async(req, res) => {
    try {
    const newdoctor = await Doctor.create({
    "name": req.body.name,
    "specialty": req.body.specialty,
    "department": req.body.department
    });
    res.setHeader('Content-Type', 'application/json')
    res.status(201).json(newdoctor);
     }
     catch (error) {
        console.error("Error creating doctor:", error.message);
        res.status(500).json({ message: "Server error while creating doctor." });
    }}

// =================
//  delete doctor
// =================

const deletedoctor =  async(req, res) => {
  const doctorId = new objectId(req.params.id);
    if(!objectId.isValid(doctorId)) {
        return res.status(400).json({message: 'Invalid doctor id'});
       
    }
    const response = await Doctor
    .deleteOne({ _id: doctorId});
           if(response.deletedCount > 0) {
            res.status(200).json({
                message: 'doctor  deleted successfully',
                deleteId: doctorId
            });
        } else if (response.deletedCount == 0) {
            res.status(404).json({message: ' Doctor not found'});
        }
        else {
            res.status(500).json({message: ' Doctor not deleted'});
        }
    }
// ==========================
//  update doctor
// ==========================
const updatedoctor =  async(req, res) => {
    const doctorId = new objectId(req.params.id);
    const newdoctor = {
    "name": req.body.name,
    "specialty": req.body.specialty,
    "department": req.body.department
    }

    const response = await Doctor
    .replaceOne({ _id: doctorId}, newdoctor);

        if(response.modifiedCount > 0) {
            res.status(200).json({message: 'Doctor updated successfully', updatedId: response.insertedId});
        } else {
            res.status(500).json({message: 'Doctor not updated'});
        }
    }
// =====================
//  export functions
// =====================

module.exports = {
    getAlldoctors,
    getdoctorById,
    createdoctor,
    deletedoctor,
    updatedoctor
}