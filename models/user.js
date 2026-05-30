const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    githubId: {
        type: String,
        required: true,
        unique: true 
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    displayName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        lowercase: true, 
        trim: true       
    }
}, { 
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
