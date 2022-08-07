const crypto = require('crypto-js');
const authService = require('./auth.service');

const userLogin = async (req, res, next) => {
    try {
        await authService.checkActiveUser(req.body.username);
        // hash password
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
    } catch (error) {
        next(error);
    }
};

const registerVerify = async (req, res, next) => {
    try {
        await authService.activeUser(req, res);
        res.status(200).send('Verify new user SUCCESFUL!');
    } catch (error) {
        next(error);
    }
};

module.exports = {
    userLogin,
    userRegister,
    registerVerify,
};
