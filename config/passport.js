const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/user'); 

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "https://onrender.com"
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
        let user = await User.findOne({ githubId: profile.id });
        
        if (!user) {
            user = await User.create({
                githubId: profile.id,
                username: profile.username,
                displayName: profile.displayName,
                email: (profile.emails && profile.emails.length > 0) ? profile.emails[0].value : null
            });
            console.log("New GitHub OAuth User profile created in MongoDB!");
        }
        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
  }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
