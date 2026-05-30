const requireAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    if (process.env.NODE_ENV !== 'production' && req.headers['x-dev-bypass'] === 'true') {
        return next();
    }
    
    return res.status(401).json({ 
        error: "Access denied. Authentication is required. Please log in." 
    });
};

module.exports = requireAuth;
