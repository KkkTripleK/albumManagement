// Định nghĩa các đường link
// Chuyển req tới Controller
const express = require('express');
const authController = require('../modules/authentication/auth.controller');
const userController = require('../modules/users/user.controller');

const route = express.Router();

route.get('/', (req, res) => {
    res.send('_HOME PAGE_');
});

route.post('/login', (req, res) => {
    res.send('_LOGIN PAGE_');
    console.log(req.body);
    return authController.userLogin(req, res);
});

route.post('/register', (req, res) => {
    console.log(req.body);
    return userController.userRegister(req, res);
});

route.use('/register/verify', (req, res) => {
    const username = req.query.username;
    const token = req.query.token;
    console.log(username);
    console.log(token);
    res.send('Verify Successful!');
});

module.exports = {
    route,
};
