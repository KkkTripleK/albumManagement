// Query dữ liệu, chuyển data qua service
const crypto = require('crypto-js');
const authService = require('./auth.service');

const userLogin = (req, res) => {
    const username = req.body.username;
    const password = crypto.SHA256(req.body.password).toString(crypto.enc.Hex);
    authService.userLogin(username, password);
};

module.exports = {
    userLogin,
};
