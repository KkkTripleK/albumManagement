const userService = require('./user.service');
const authService = require('../authentication/auth.service');

const showInfo = async (req, res, next) => {
    try {
        const showInfo = await userService.showInfo(req, res);
        res.status(200).send(showInfo);
    } catch (error) {
        next(error);
    }
};

const forgotPassword = async (req, res, next) => {
    try {
        await userService.forgotPassword(req, res);
        res.status(200).send('Send email SUCCESSFUL, please check your email!');
    } catch (error) {
        next(error);
    }
};

const verifyForgotPassword = async (req, res, next) => {
    try {
        const OTP = await authService.verifyForgotPassword(req, res);
        res.status(200).send(`Your new password is: ${OTP}`);
    } catch (error) {
        next(error);
    }
};

const changePassword = async (req, res, next) => {
    try {
        await userService.changePassword(req, res);
        res.status(200).send('Your password is updated');
    } catch (error) {
        next(error);
    }
};

const changeInfo = async (req, res, next) => {
    try {
        await userService.changeInfo(req, res);
        res.status(200).send('Update SUCCESFUL!');
    } catch (error) {
        next(error);
    }
};

module.exports = {
    forgotPassword,
    verifyForgotPassword,
    changePassword,
    changeInfo,
    showInfo,
};
