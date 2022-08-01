// Kiểm tra sự tồn tại của Acc, đẩy data xuống repo
const nodemailer = require('nodemailer');
const crypto = require('crypto-js');
const authService = require('../authentication/auth.service');
const userRepo = require('./user.repository');
const createOTP = require('../../common/createOTP');

async function sendMail(username, email) {
    await nodemailer.createTestAccount();
    const smtpConfig = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'nguyenkhanhhoapso@gmail.com',
            pass: process.env.emailPassword,
        },
    };
    const transporter = nodemailer.createTransport(smtpConfig);
    const OTP = createOTP.randomOTP();
    await userRepo.updateParam(username, { activeCode: OTP.toString() });
    const link = `Your OPT number is: ${OTP}`;
    await transporter.sendMail({
        from: '"HoaNK " <nguyenkhanhhoapso@gmail.com>',
        to: email,
        subject: 'OPT number!',
        html: link,
    });
}

async function createNewUser(resultCheckExistUsername, username, password, name, email, dob, gender, phone) {
    if (!resultCheckExistUsername) {
        const resultCreateNewUser = await userRepo.createNewUser(username, password, name, email, dob, gender, phone);
        if (resultCreateNewUser) {
            await sendMail(username, email)
                .then(() => {
                    console.log('➤➤➤ Please check your email!');
                    return true;
                })
                .catch(() => {
                    console.log('➤➤➤ Failed');
                    return false;
                });
        }
    } else {
        console.log('➤➤➤ Your username is not available!');
        return false;
    }
    return createNewUser;
}

async function userRegister(req, res) {
    const password = crypto.SHA256(req.body.password).toString(crypto.enc.Hex);
    const { username, name, email, dob, gender, phone } = req.body;
    const resultCheckExistUsername = await userRepo.checkExistUsername(username);
    const resultCreateNewUser = await createNewUser(
        resultCheckExistUsername,
        username,
        password,
        name,
        email,
        dob,
        gender,
        phone
    );
    return resultCreateNewUser;
}

async function verifyUser(req, res) {
    try {
        const { username, activeCode } = req.body;
        const userInfo = await userRepo.findUserInfo(username);
        if (userInfo.activeCode === activeCode && userInfo.isActive === false) {
            userRepo.updateParam(username, { isActive: 'true' });
        } else if (userInfo.activeCode === activeCode && userInfo.isActive === true) {
            const OTP = createOTP.randomOTP();
            userRepo.updateParam(username, { password: OTP.toString() });
        }
    } catch (err) {
        res.send(err);
    }
}

async function getEmail(username) {
    const resultGetEmail = await userRepo.getEmail(username);
    return resultGetEmail;
}

async function forgotPassword(req, res) {
    const { username } = req.body;
    const resultCheckExistUsername = await userRepo.checkExistUsername(username);
    if (!resultCheckExistUsername) {
        console.log('➤➤➤ Username not correclt!');
        res.status(400).send('➤➤➤ Username not correclt!');
    } else {
        console.log('➤➤➤ Exist username');
        const email = await getEmail(username);
        sendMail(username, email);
    }
}

async function changePassword(req, res) {
    console.log('Change Password');
    try {
        const { username, password, newpassword } = req.body;
        const passwordCrypto = crypto.SHA256(password).toString(crypto.enc.Hex);
        const newPasswordCrypto = crypto.SHA256(newpassword).toString(crypto.enc.Hex);
        const info = await userRepo.findUserInfo(username);
        if (info.password === passwordCrypto && passwordCrypto !== newPasswordCrypto) {
            userRepo.updateParam(username, { password: newPasswordCrypto.toString() });
            console.log('➤➤➤ Your password is updated');
            res.status(200).send('Your password is updated');
        } else {
            console.log('➤➤➤ Password and New Password not correclt!');
            res.status(400).send('Password and New Password not correclt!');
        }
    } catch (err) {
        res.status(400).send(err);
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
            res.status(400).send('Update FAILED!');
        }
    } catch (err) {
        res.status(400).send('Update FAILED!');
    }
}

module.exports = {
    userRegister,
    sendMail,
    verifyUser,
    forgotPassword,
    changePassword,
    changeInfo,
};
