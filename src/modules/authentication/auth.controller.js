const crypto = require('crypto-js');
const { ErrorHandling } = require('../../errors/error-handling');
const authService = require('./auth.service');

const userLogin = async (req, res, next) => {
    try {
        // hash password
        const password = crypto.SHA256(req.body.password).toString(crypto.enc.Hex);
        const accessToken = await authService.userLogin(req.body.username, password);
        try {
            await authService.checkActiveUser(req.body.username);
        } catch (error) {
            throw new ErrorHandling(500, 'Your username not exist!!');
        }
        res.status(200).json({ accessToken });
    } catch (error) {
        next(error);
    }
};

const userRegister = async (req, res, next) => {
    try {
        await authService.userRegister(req, res);
        res.status(200).send('Create new user SUCCESSFUL!');
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
