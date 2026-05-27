const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI,{
            dbName: 'hospital',
        });
        console.log(`MongoDB Connected: ${db.connection.host}`);
    } catch (error) {
        console.error(`Database connection error: ${error.message}`);
        process.exit(1);
    }
};



module.exports = connectDB;
