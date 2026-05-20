const mongodb = require('../config/database');
const objectId = require('mongodb').ObjectId;



//  controller for doctor collection in mongodb
const getAlldoctors =  async(req, res) => {
    const doctors = await mongodb
    .getdatabase()
    .db('hospital')
    .collection('doctors')
    .find()
    .toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(doctors);    
};

// get patient by id
const getdoctorById=  async(req, res) => {
    const doctorId = new objectId(req.params.id);
    const doctors = await mongodb
    .getdatabase()
    .db('hospital')
    .collection('doctors')
    .find({ _id: doctorId});
    doctors.toArray().then(doctors => {
        if(doctors) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(doctors);    
        } else {
            res.status(404).json({message: 'No patient found'});
        }
    })  
};

//  create doctor
const createdoctor =  async(req, res) => {
    const newdoctor ={
    "name": req.body.name,
    "specialty": req.body.specialty,
    "department": req.body.department
    }

    const response = await mongodb
    .getdatabase()
    .db('hospital')
    .collection('doctors')
    .insertOne(newdoctor);

        if(response.acknowledged) {
            res.status(201).json({
                message: 'Doctor added successfully',
                id: Response.insertedId
            });
        } else {
            res.status(500).json({message: 'Doctor not created'});
        }
    }
// 

const deletedoctor =  async(req, res) => {
  const doctorId = new objectId(req.params.id);
//    check if id is valid
    if(!objectId.isValid(doctorId)) {
        return res.status(400).json({message: 'Invalid doctor id'});
       
    }
    const response = await mongodb
    .getdatabase()
    .db('hospital')
    .collection('doctors')
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

    const updatedoctor =  async(req, res) => {
    const doctorId = new objectId(req.params.id);
    const newdoctor = {
    "name": req.body.name,
    "specialty": req.body.specialty,
    "department": req.body.department
    }

    const response = await mongodb
    .getdatabase()
    .db('hospital')
    .collection('doctors')
    .replaceOne({ _id: doctorId}, newdoctor);

        if(response.modifiedCount > 0) {
            res.status(200).json({message: 'Doctor updated successfully', updatedId: response.insertedId});
        } else {
            res.status(500).json({message: 'Doctor not updated'});
        }
    }

module.exports = {
    getAlldoctors,
    getdoctorById,
    createdoctor,
    deletedoctor,
    updatedoctor
}