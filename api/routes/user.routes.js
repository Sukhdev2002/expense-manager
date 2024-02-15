// routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const logger = require('../logger/api.logger');

router.post('/register', async (req, res) => {
    try {
        await userController.register(req, res);
        logger.info('User registered successfully');
    } catch (error) {
        logger.error(`Error registering user: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        await userController.login(req, res);
        logger.info('User logged in successfully');
    } catch (error) {
        logger.error(`Error logging in user: ${error.message}`);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
