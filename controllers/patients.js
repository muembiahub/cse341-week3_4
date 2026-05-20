const mongodb = require('../config/database');
const objectId = require('mongodb').ObjectId;


// home page 
const homepage = (req, res) => {
    res.send('Welcome to the hospital API');
}
const getAllPatients =  async(req, res) => {
    const patients = await mongodb
    .getdatabase()
    .db('hospital')
    .collection('patients')
    .find()
    .toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(patients);    
};

// get patient by id
const getPatientById=  async(req, res) => {
    const patientId = new objectId(req.params.id);
    const patients = await mongodb
    .getdatabase()
    .db('hospital')
    .collection('patients')
    .find({ _id: patientId});
    patients.toArray().then(patients => {
        if(patients) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(patients);    
        } else {
            res.status(404).json({message: 'No patient found'});
        }
    })  
};

//  create patient 
const createpatient =  async(req, res) => {
    const newpatient ={
        firstName : req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        gender: req.body.gender,
        diagnosis: req.body.diagnosis,
        admissionDate: req.body.admissionDate,
        status: req.body.status,
        doctor: req.body.doctor
    }

    const response = await mongodb
    .getdatabase()
    .db('hospital')
    .collection('patients')
    .insertOne(newpatient);

        if(response.acknowledged) {
            res.status(201).json({
                message: 'Patient created successfully',
                id: Response.insertedId
            });
        } else {
            res.status(500).json({message: ' Patient not created'});
        }
    }
// 

const deletepatient =  async(req, res) => {
  const patientId = new objectId(req.params.id);
//    check if id is valid
    if(!objectId.isValid(patientId)) {
        return res.status(400).json({message: 'Invalid patient id'});
       
    }
    const response = await mongodb
    .getdatabase()
    .db('hospital')
    .collection('patients')
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

    const response = await mongodb
    .getdatabase()
    .db('hospital')
    .collection('patients')
    .replaceOne({ _id: patientId}, newpatient);

        if(response.modifiedCount > 0) {
            res.status(200).json({message: 'Patient updated successfully', updatedId: patientId});
        } else {
            res.status(500).json({message: ' Patient not updated'});
        }
    }




module.exports = {
    homepage,
    getAllPatients,
    getPatientById,
    createpatient,
    deletepatient,
    updatepatient,

}