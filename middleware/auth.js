const isAuthenticated = (req, res, next) => {
    if (!req.session?.user) {
        return res.status(401).json('Not authenticated');
    }
    next();  
};

// Export with the correct spelling
module.exports = { isAuthenticated };
