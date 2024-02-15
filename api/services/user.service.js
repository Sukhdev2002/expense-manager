// services/user.service.js
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const logger = require('../logger');

exports.registerUser = async (username, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        logger.info('User registered successfully');
    } catch (error) {
        logger.error(`Error registering user: ${error.message}`);
        throw new Error('Error registering user');
    }
};

exports.findUserByUsername = async (username) => {
    try {
        const user = await User.findOne({ username });
        return user;
    } catch (error) {
        logger.error(`Error finding user: ${error.message}`);
        throw new Error('Error finding user');
    }
};
