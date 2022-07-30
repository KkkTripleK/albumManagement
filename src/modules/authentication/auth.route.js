// Định nghĩa các đường link
// Chuyển req tới Controller
const express = require('express');
const authController = require('./auth.controller');
const userController = require('../users/user.controller');

const route = express.Router();

route.post('/login', (req, res) => {
    res.send('_LOGIN PAGE_');
    console.log(req.body);
    return authController.userLogin(req, res);
});

route.post('/register', (req, res) => {
    res.send('_REGISTER PAGE_');
    console.log(req.body);
    return userController.userRegister(req, res);
});

module.exports = {
    route,
};
