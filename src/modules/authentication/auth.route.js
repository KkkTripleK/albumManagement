const express = require('express');
const authController = require('./auth.controller');
const authValidation = require('./auth.validation');

const route = express.Router();

route.post('/login', authValidation.validateLogin, authController.userLogin);

route.post('/register', authValidation.validateRegister, authController.userRegister);

route.use('/register/verify', authController.registerVerify);

module.exports = {
    authRoute: route,
};
