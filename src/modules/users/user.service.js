// Kiểm tra sự tồn tại của Acc, đẩy data xuống repo
const nodemailer = require('nodemailer');
const crypto = require('crypto-js');
const authService = require('../authentication/auth.service');
const userRepo = require('./user.repository');

async function sendMail(username, email) {
    await nodemailer.createTestAccount();
    const smtpConfig = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'nguyenkhanhhoapso@gmail.com',
            pass: 'txbabkrlzbgzomox',
        },
    };
    const transporter = nodemailer.createTransport(smtpConfig);
    const token = authService.createAccessToken(username);
    const verifyURL = `<a href = "http://localhost:8080/register/verify/?username=${username}&token=${token}"> Verify by this link! </a>`;
    await transporter.sendMail({
        from: '"HoaNK " <nguyenkhanhhoapso@gmail.com>',
        to: email,
        subject: 'Verify Your Account 🥰',
        html: verifyURL,
    });
}

async function createNewUser(resultCheckExistUsername, username, password, name, email, dob, gender, phone) {
    if (!resultCheckExistUsername) {
        const resultCreateNewUser = await userRepo.createNewUser(username, password, name, email, dob, gender, phone);
        if (resultCreateNewUser) {
            sendMail(username, email)
                .then(() => {
                    console.log('➤➤➤Please check your email!');
                    return true;
                })
                .catch(() => {
                    console.log('➤➤➤failed');
                    return false;
                });
        }
    } else {
        console.log('➤➤➤Your username is not available!');
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
    // console.log(`resultUserRegister: ${resultUserRegister}`);
    // return resultUserRegister;
}

async function verifyUser(req, res) {
    const { username, token } = req.query;
    if (authService.jwtDecoded(token).username === username) {
        userRepo.activeUser(username);
    }
}

module.exports = {
    userRegister,
    sendMail,
    verifyUser,
};
