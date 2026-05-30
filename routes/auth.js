const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.js');

router.get('/login', authController.login);

router.get('/auth/github/callback', authController.githubCallback);

router.get('/logout', authController.logout);

module.exports = router;
