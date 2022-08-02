// Query dữ liệu, chuyển data qua service
const crypto = require('crypto-js');
const authService = require('./auth.service');

const userLogin = async (req, res, next) => {
    try {
        const password = crypto.SHA256(req.body.password).toString(crypto.enc.Hex);
        const accessToken = await authService.userLogin(req.body.username, password);
        res.status(200).json({ accessToken });
    } catch (error) {
        next(error);
    }
};

const userRegister = async (req, res, next) => {
    try {
        await authService.userRegister(req, res);
        res.status(200).send('Register SUCCESSFUL!');
    } catch (error) {
        next(error);
    }
};

const registerVerify = async (req, res) => {
    try {
        await authService.verifyUser(req, res);
    } catch (err) {
        res.status(400).send(err);
    }
};

module.exports = {
    userLogin,
    userRegister,
    registerVerify,
};
