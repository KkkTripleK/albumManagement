const userService = require('./user.service');
const authService = require('../authentication/auth.service');

const forgotPassword = async (req, res, next) => {
    try {
        await userService.forgotPassword(req, res);
    } catch (error) {
        next(error);
    }
};

const verifyForgotPassword = async (req, res, next) => {
    try {
        await authService.verifyUser(req, res);
    } catch (error) {
        next(error);
    }
};

const changePassword = async (req, res, next) => {
    try {
        await userService.changePassword(req, res);
    } catch (error) {
        next(error);
    }
};

const changeInfo = async (req, res, next) => {
    try {
        await userService.changeInfo(req, res);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    forgotPassword,
    verifyForgotPassword,
    changePassword,
    changeInfo,
};
