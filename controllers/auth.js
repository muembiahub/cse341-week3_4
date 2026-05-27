const User = require('../models/User'); 
const bcrypt = require('bcryptjs');          
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(400).json({ status: "error", message: `${email} already exists` });
        }

        const user = new User({ name, email, password, role });
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

        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(401).json({ status: "error", message: `${email} does not exist` });
        }

        const isMatch = await bcrypt.compare(password, userExist.password);
        if (!isMatch) {
            return res.status(401).json({ status: "error", message: 'Invalid password' });
        }

        const token = jwt.sign(
            { id: userExist._id, email: userExist.email, role: userExist.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

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

exports.logout = async (req, res) => {
    try {
        res.status(200).json({ status: "success", message: "Logged out successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
