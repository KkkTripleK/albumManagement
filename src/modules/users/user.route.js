const express = require('express');
const userController = require('./user.controller');

const route = express.Router();

route.post('/register', (req, res) => {
    try {
        console.log(`➤➤➤ Register Account: ${req.body.username}`);
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

module.exports = {
    userRoute: route,
};
