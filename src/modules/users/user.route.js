const express = require('express');
const userController = require('./user.controller');

const route = express.Router();

route.post('/register', (req, res) => {
    try {
        userController.userRegister(req, res);
    } catch (err) {
        res.send(err);
    }
});

route.use('/register/verify', (req, res) => {
    try {
        userController.registerVerify(req, res);
    } catch (err) {
        res.send(err);
    }
});

route.post('/forgot-password', (req, res) => {
    try {
        userController.forgotPassword(req, res);
    } catch (err) {
        res.send(err);
    }
});

route.post('/forgot-password/verify', (req, res) => {
    try {
        userController.verifyForgotPassword(req, res);
    } catch (err) {
        res.status(400).send(err);
    }
});

route.post('/change-password', (req, res) => {
    try {
        userController.changePassword(req, res);
    } catch (err) {
        res.status(400).send(err);
    }
});

route.post('/change-info', (req, res) => {
    userController.changeInfo(req, res);
});

module.exports = {
    userRoute: route,
};
