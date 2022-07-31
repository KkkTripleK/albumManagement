// Query dữ liệu, chuyển data qua service
const crypto = require('crypto-js');
const authService = require('./auth.service');

const userLogin = async (req, res) => {
    try {
        const password = crypto.SHA256(req.body.password).toString(crypto.enc.Hex);
        const resultUserLogin = await authService.userLogin(req.body.username, password);
        if (resultUserLogin) {
            res.send('Login successful!');
        } else {
            res.send('Login failed!');
        }
    } catch (err) {
        console.log(err);
        res.send(err);
    }
};

module.exports = {
    userLogin,
};
