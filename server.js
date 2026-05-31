require('dotenv').config(); 
const connectDB = require('./config/database');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session'); 
const passport = require('passport');       
const GithubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const app = express();


app
   .use(bodyParser.json())
   .use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true }))
   .use(passport.initialize())
   .use(passport.session())
   .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true'); 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next(); 
})
.use(cors({method:['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']}))
.use(cors({origin: '*'}))
.use('/', require('./routes/swagger'))
.use('/', require('./routes/auth'))
.use('/', require('./routes/hospital'));


passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(null, profile);
    // });
}))

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

app.get('/', (req, res) => {
    res.send(req.session?.user ? `Logged in as ${req.session.user.displayName}` : 'Logged out');
});

app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/api-docs', session: true }),
(req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});



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
