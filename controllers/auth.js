const passport = require('passport');

exports.login = (req, res, next) => {
    passport.authenticate('github', { scope: ['user:email'] })(req, res, next);
};

exports.githubCallback = (req, res, next) => {
    passport.authenticate('github', (err, user, info) => {
        if (err) {
            console.error("OAuth Callback System Error:", err.message);
            return res.status(500).json({ 
                status: "error", 
                message: "Internal server authentication crash." 
            });
        }
        
        if (!user) {
            return res.redirect('/api-docs');
        }

        req.logIn(user, (loginErr) => {
            if (loginErr) {
                console.error("Session Binding Error:", loginErr.message);
                return res.status(500).json({ 
                    status: "error", 
                    message: "Could not establish server session." 
                });
            }
            return res.redirect('/api-docs');
        });
    })(req, res, next);
};

exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) { 
            console.error("Passport logout tracking error:", err.message);
            return next(err); 
        }
        
        req.session.destroy((destroyErr) => {
            if (destroyErr) {
                console.error("Session memory cache destruction error:", destroyErr.message);
                return res.status(500).json({ error: "Failed to cleanly drop user session context." });
            }
            
            res.clearCookie('connect.sid', {
                path: '/',
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
            });

            return res.redirect('/api-docs');
        });
    });
};
