// Định nghĩa các đường link
// Chuyển req tới Controller
const express = require('express');
const authController = require('./auth.controller');

const route = express.Router();

route.get('/', (req, res) => {
    res.send('______HOME PAGE______');
});

route.post('/login', (req, res) => {
    console.log(`➤➤➤Login to User ${req.body.username}`);
    return authController.userLogin(req, res);
});

module.exports = {
    authRoute: route,
};
