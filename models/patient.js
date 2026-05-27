const mongoose = require('mongoose');
const PatientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true       
    },
    lastName: {
        type: String,
        required: true,
        trim: true       
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true,
        trim: true
    },
    diagnosis: {
        type: String,
        required: true,
        trim: true
    },
    admissionDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        trim: true
    },
    doctor: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Patient', PatientSchema);
