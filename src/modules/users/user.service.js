const crypto = require('crypto-js');
const userRepo = require('./user.repository');
const { ErrorHandling } = require('../../errors/error-handling');
const helperEmail = require('../../helpers/helper.sendMail');

async function showInfo(req, res) {
    const userInfo = await userRepo.findUserInfo(req.user.username);
    const showInfo = {
        username: userInfo.username,
        name: userInfo.name,
        email: userInfo.email,
        gender: userInfo.gender,
        dob: userInfo.dob,
    };
    return showInfo;
}

async function forgotPassword(req, res) {
    const { username } = req.body;
    const userInfo = await userRepo.findUserInfo(username);
    if (userInfo === null) {
        throw new ErrorHandling(500, 'Can not find your username!');
    } else {
        helperEmail.sendMail(username, userInfo.email);
    }
}

async function changePassword(req, res) {
    try {
        const username = req.user.username;
        const { password, newpassword } = req.body;
        // cho vao middleware
        const oldPasswordCrypto = crypto.SHA256(password).toString(crypto.enc.Hex);
        const newPasswordCrypto = crypto.SHA256(newpassword).toString(crypto.enc.Hex);
        const info = await userRepo.findUserInfo(username);
        if (!newpassword.length) {
            throw new ErrorHandling(500, 'Please enter your new password!');
        } else if (oldPasswordCrypto === newPasswordCrypto) {
            throw new ErrorHandling(500, 'Old password and new password can not be the same!');
        } else if (info?.password === oldPasswordCrypto) {
            await userRepo.updateParam(username, { password: newPasswordCrypto.toString() });
        } else {
            throw new ErrorHandling(500, 'Old password and new password not correclt!');
        }
    } catch (error) {
        if (error instanceof ErrorHandling) {
            throw error;
        } else {
            throw new ErrorHandling(500, 'Old password and new password not correclt!');
        }
    }
}

async function changeInfo(req, res) {
    try {
        const param = req.body;
        if (req.body.username.length !== 0 || req.body.password.length !== 0) {
            throw new ErrorHandling(400, 'Can not change username and password!');
        }
        userRepo.updateParam(req.user.username, param);
    } catch (error) {
        if (error instanceof ErrorHandling) {
            throw error;
        } else {
            throw new ErrorHandling(400, 'Update FAILED!');
        }
    }
}

module.exports = {
    showInfo,
    forgotPassword,
    changePassword,
    changeInfo,
};
