const userService = require('./user.service');

const userRegister = async (req, res) => {
    try {
        const resultUserRegister = await userService.userRegister(req, res);
        if (resultUserRegister) {
            res.status(200).send('Register SUCCESSFUL!');
        } else {
            res.status(400).send('Register FAILED!');
        }
    } catch (err) {
        res.status(400).send(err);
    }
};

const registerVerify = async (req, res) => {
    try {
        await userService.verifyUser(req, res);
        res.status(200).send('Activate your account SUCCESSFUL!');
    } catch (err) {
        res.status(400).send(err);
    }
};

const forgotPassword = async (req, res) => {
    console.log('______Stage: Forgot Password______');
    try {
        await userService.forgotPassword(req, res);
        res.status(200).send('Forgot Password');
    } catch (err) {
        res.status(400).send(err);
    }
};

const verifyForgotPassword = async (req, res) => {
    userService.verifyUser(req, res);
};

const changePassword = async (req, res) => {
    userService.changePassword(req, res);
};

const changeInfo = async (req, res) => {
    try {
        userService.changeInfo(req, res);
    } catch (err) {
        res.status(400).send(err);
    }
};

module.exports = {
    userRegister,
    registerVerify,
    forgotPassword,
    verifyForgotPassword,
    changePassword,
    changeInfo,
};
