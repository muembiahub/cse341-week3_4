const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    if (!process.env.JWT_SECRET) {
        console.error("CRITICAL ERROR: JWT_SECRET environment variable is missing.");
        return res.status(500).json({ error: "Internal server error configuration." });
    }

    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: "Access denied. Authentication is required Please log in." });
        }

        const parts = authHeader.split(' ');
        
        if (parts.length !== 2) {
            return res.status(401).json({ error: "Access denied. Invalid token format schema." });
        }

        const token = parts[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = Object.freeze(decoded); 
        
        next(); 

    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ error: "Session expired. Please log in again." });
        }
        
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: "Authentication failed. Token is invalid or has been altered." });
        }

        return res.status(403).json({ error: "Access forbidden." });
    }
};

module.exports = requireAuth;
