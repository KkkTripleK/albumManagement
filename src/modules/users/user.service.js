const crypto = require('crypto-js');
const authService = require('../authentication/auth.service');
const userRepo = require('./user.repository');
const { Error } = require('../../errors/error-handling');

async function getEmail(username) {
    const resultGetEmail = await userRepo.getEmail(username);
    return resultGetEmail;
}

async function forgotPassword(req, res) {
    const { username } = req.body;
    try {
        const resultCheckExistUsername = await userRepo.checkExistUsername(username);
        if (resultCheckExistUsername) {
            const email = await getEmail(username);
            authService.sendMail(username, email);
            res.status(200).send('Send email SUCCESSFUL, please check your email!');
        } else {
            throw new Error(500, 'Username not CORRECT or already Exist!');
        }
    } catch (error) {
        throw new Error(500, 'Username not CORRECT or already Exist!');
    }
}

async function changePassword(req, res) {
    try {
        const { username, password, newpassword } = req.body;
        const passwordCrypto = crypto.SHA256(password).toString(crypto.enc.Hex);
        const newPasswordCrypto = crypto.SHA256(newpassword).toString(crypto.enc.Hex);
        const info = await userRepo.findUserInfo(username);
        if (info?.password === passwordCrypto && passwordCrypto !== newPasswordCrypto) {
            userRepo.updateParam(username, { password: newPasswordCrypto.toString() });
            res.status(200).send('Your password is updated');
        } else {
            throw new Error(500, 'Password and New Password not correclt!');
        }
    } catch (error) {
        throw new Error(500, 'Password and New Password not correclt!');
    }
}

async function changeInfo(req, res) {
    try {
        const { username, jwt } = req.body;
        const param = req.body;
        delete param.username;
        delete param.jwt;
        const info = await userRepo.findUserInfo(username);
        if (info.jwt === jwt) {
            userRepo.updateParam(username, param);
            res.status(200).send('Update SUCCESFUL!');
        } else {
            throw new Error(400, 'Update FAILED!');
        }
    } catch (err) {
        throw new Error(400, 'Update FAILED!');
    }
}

module.exports = {
    forgotPassword,
    changePassword,
    changeInfo,
};
