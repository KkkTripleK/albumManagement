// Định nghĩa các đường link
//Chuyển req tới Controller
const express = require('express')
const route = express.Router();

route.get('/', (req, res) => {
    res.send("Home Page");
})

route.get('/login', (req, res) => {
    res.send("Login Page");
})

route.post('/login', (req, res) => {
    res.send("Updating");
    req
})
module.exports = route;