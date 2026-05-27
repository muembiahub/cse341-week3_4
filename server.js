require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS Headers Configuration
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next(); 
});

// Routes
app.use('/', require('./routes/swagger'));
app.use('/', require('./routes/auth'));
app.use('/', require('./routes/hospital'));


// Establish Database Connection and Start Server
const startServer = async () => {
    try {
        await connectDB(); 
        app.listen(PORT, () => {
            console.log(`🚀 Database connected and Server is listening on port ${PORT}`);
        });
    } catch (err) {
        console.error('❌ Server startup failed due to database error:', err.message);
        process.exit(1); 
    }
};

startServer();
