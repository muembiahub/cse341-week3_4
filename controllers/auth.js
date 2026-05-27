const userModel = require('../models/User'); 
const bcrypt = require('bcryptjs');          
const jwt = require('jsonwebtoken'); // 🔑 FIX 1: Imported jsonwebtoken

// REGISTER
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const userExist = await userModel.findOne({ email: email });

        if (userExist) {
            return res.status(400).json({ status: "error", message: `${email} already exists` });
        }

        const user = new userModel({ name, email, password, role });
        await user.save();
        
        res.status(201).json({ status: "success", message: 'User registered successfully' });

    } catch (err) {
        res.status(500).json({ status: "error", message: "User registration failed", error: err.message });
    }
};

// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const userExist = await userModel.findOne({ email });
        if (!userExist) {
            return res.status(401).json({ status: "error", message: `${email} does not exist` });
        }

        // Compare the hashed database password
        const isMatch = await bcrypt.compare(password, userExist.password);
        if (!isMatch) {
            return res.status(401).json({ status: "error", message: 'Invalid password' });
        }

        // 🔑 FIX 2: Create the token using 'userExist' fields (works for both users and admins)
        const token = jwt.sign(
            { id: userExist._id, email: userExist.email, role: userExist.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // 🔑 FIX 3: Check role down here so admins get their custom message AND their token payload!
        if (userExist.role === "admin") {
            return res.status(200).json({ 
                status: "success", 
                message: 'Admin logged in successfully', 
                token: token 
            });
        }

        return res.status(200).json({ 
            status: "success", 
            message: 'User logged in successfully', 
            token: token 
        });

    } catch (err) {
        console.error("Login controller error:", err.message);
        res.status(500).json({ status: "error", message: err.message });
    }
};

// LOGOUT
exports.logout = async (req, res) => {
    try {
        res.status(200).json({ status: "success", message: "Logged out successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
