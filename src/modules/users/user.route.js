const express = require('express');
const userController = require('./user.controller');

const route = express.Router();

route.post('/forgot-password', userController.forgotPassword);

route.post('/forgot-password/verify', userController.verifyForgotPassword);

route.post('/change-password', userController.changePassword);

route.post('/change-info', userController.changeInfo);

module.exports = {
    userRoute: route,
};
