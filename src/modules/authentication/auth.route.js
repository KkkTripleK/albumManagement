// Định nghĩa các đường link
// Chuyển req tới Controller
const express = require('express');

const authController = require('./auth.controller');

const route = express.Router();

route.post('/login', (req, res) => {
    console.log(req.body);
    res.send('Waiting...');
    return authController.userLogin(req, res);
});
module.exports = {
    route,
};
