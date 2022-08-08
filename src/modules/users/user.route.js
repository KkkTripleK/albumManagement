const express = require('express');
const userController = require('./user.controller');
const helperMiddleware = require('../../helpers/helper.middleware');

const route = express.Router();

route.get('/user/show-info', helperMiddleware.checkAccessToken, userController.showInfo);

route.patch('/user/forgot-password', userController.forgotPassword);

route.patch('/user/forgot-password/verify', userController.verifyForgotPassword);

route.patch('/user/change-password', helperMiddleware.checkAccessToken, userController.changePassword);

route.patch('/user/change-info', helperMiddleware.checkAccessToken, userController.changeInfo);

module.exports = {
    userRoute: route,
};
