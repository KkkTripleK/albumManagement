// Định nghĩa các đường link
// Chuyển req tới Controller
const express = require('express');

const app = express();
const route = express.Router();

route.use(express.json());
const { urlencoded } = require('express');

route.use(urlencoded({ extended: true }));

route.use('/login', (req, res) => {
    console.log(req.body);
    res.send('Send success!');
});
module.exports = route;

// Định nghĩa các đường link
// Chuyển req tới Controller
