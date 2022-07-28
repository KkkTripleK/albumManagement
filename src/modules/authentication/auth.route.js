// Định nghĩa các đường link
// Chuyển req tới Controller
const express = require('express');

const app = express();
const route = express.Router();

route.get('/', (req, res) => {
    res.send('Home Page');
});

route.get('/login', (req, res) => {
    res.send('Login Page');
});

app.post('/login', (req, res, next) => {
    console.log(req.body);
    console.log('object');
});

module.exports = route;

// Định nghĩa các đường link
// Chuyển req tới Controller
