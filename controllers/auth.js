const passport = require('passport');

// =================================================
// 1. TRIGGER GITHUB LOGIN
// =================================================
exports.login = (req, res, next) => {
    passport.authenticate('github', { scope: ['user:email'] })(req, res, next);
};

// =================================================
// 2. GITHUB AUTHENTICATION CALLBACK HANDLER
// =================================================
exports.githubCallback = (req, res, next) => {
    passport.authenticate('github', (err, user, info) => {
        if (err) {
            console.error("OAuth Callback System Error:", err.message);
            return res.status(500).json({ status: "error", message: "Internal server authentication crash." });
        }
        
        if (!user) {
            return res.redirect('/api-docs');
        }

        req.logIn(user, (loginErr) => {
            if (loginErr) {
                console.error("Session Binding Error:", loginErr.message);
                return res.status(500).json({ status: "error", message: "Could not establish server session." });
            }
            
            return res.redirect('/api-docs');
        });
    })(req, res, next);
};

// =================================================
// 3. SECURE LOGOUT HANDLER
// =================================================
exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) { 
            console.error("Logout runtime error:", err.message);
            return next(err); 
        }
        
        return res.redirect('/api-docs');
    });
};
