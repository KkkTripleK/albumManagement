const express = require('express');
const userController = require('./user.controller');
const helperMiddleware = require('../../helpers/helper.middleware');

const route = express.Router();

route.get('/user/show-info', helperMiddleware.checkAccessToken, userController.showInfo); // ok

route.post('/user/forgot-password', userController.forgotPassword); // ok

route.post('/user/forgot-password/verify', userController.verifyForgotPassword); // ok

route.post('/user/change-password', helperMiddleware.checkAccessToken, userController.changePassword); // ok

route.post('/user/change-info', helperMiddleware.checkAccessToken, userController.changeInfo); // ok

module.exports = {
    userRoute: route,
};
