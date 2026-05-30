require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session'); 
const passport = require('passport');       
const connectDB = require('./config/database');
require('./config/passport');              

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Dynamic CORS Configuration for Session Cookies
app.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:3000', 'https://onrender.com'];
    const origin = req.headers.origin;
    
    // 🔑 If request matches your local or live Render domain, echo the origin
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    } else {
        // Fallback for Swagger UI page direct navigations
        res.setHeader('Access-Control-Allow-Origin', origin || '*');
    }
    
    // 🔑 CRITICAL: Explicitly allow the browser to pass the session cookies (connect.sid)
    res.setHeader('Access-Control-Allow-Credentials', 'true'); 
    
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next(); 
});

// Session Management
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        // Secure settings: automatic adjustment for HTTP (local) vs HTTPS (Render production)
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
}));

// Passport Initializations
app.use(passport.initialize());
app.use(passport.session());

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
