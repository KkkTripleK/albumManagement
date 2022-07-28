// Định nghĩa các đường link
// Chuyển req tới Controller
const express = require('express');

const { urlencoded } = require('express');
const authController = require('./auth.controller');

const route = express.Router();
route.use(express.json());
route.use(urlencoded({ extended: true }));

route.post('/login', (req, res) => {
    console.log(req.body);
    return authController.userLogin(req, res);
});
module.exports = {
    route,
};
