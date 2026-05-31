require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session'); 
const passport = require('passport');       
const connectDB = require('./config/database');
require('./config/passport');              

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin === 'https://onrender.com') {
        res.setHeader('Access-Control-Allow-Origin', origin);
    } else {
        res.setHeader('Access-Control-Allow-Origin', '*');
    }
    res.setHeader('Access-Control-Allow-Credentials', 'true'); 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next(); 
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        sameSite: 'none'
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/swagger'));
app.use('/', require('./routes/auth'));
app.use('/', require('./routes/hospital'));

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
