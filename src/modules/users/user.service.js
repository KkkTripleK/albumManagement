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
    const resultCheckExistUsername = await userRepo.checkExistUsername(username);
    if (!resultCheckExistUsername) {
        res.status(400).send('Username not correclt!');
    } else {
        console.log('➤➤➤ Exist username');
        const email = await getEmail(username);
        authService.sendMail(username, email);
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
    forgotPassword,
    changePassword,
    changeInfo,
};

// async function sendMail(username, email) {
//     await nodemailer.createTestAccount();
//     const smtpConfig = {
//         host: 'smtp.gmail.com',
//         port: 465,
//         secure: true,
//         auth: {
//             user: 'nguyenkhanhhoapso@gmail.com',
//             pass: process.env.emailPassword,
//         },
//     };
//     const transporter = nodemailer.createTransport(smtpConfig);
//     const OTP = createOTP.randomOTP();
//     await userRepo.updateParam(username, { activeCode: OTP.toString() });
//     const link = `Your OPT number is: ${OTP}`;
//     await transporter.sendMail({
//         from: '"HoaNK " <nguyenkhanhhoapso@gmail.com>',
//         to: email,
//         subject: 'OPT number!',
//         html: link,
//     });
// }

// async function createNewUser(userInfo) {
//     // eslint-disable-next-line no-param-reassign
//     userInfo.password = crypto.SHA256(userInfo.password).toString(crypto.enc.Hex);
//     const { username, password, name, email, dob, gender, phone } = userInfo;

//     try {
//         const resultCreateNewUser = await userRepo.createNewUser(userInfo);
//         if (!resultCreateNewUser) {
//             throw new Error(500, 'User already exist!');
//         } else {
//             await sendMail(username, email);
//         }
//     } catch (error) {
//         console.log(error);
//         throw new Error(500, 'create user fail');
//     }
// }

// async function userRegister(req, res) {
//     const { username } = req.body;
//     try {
//         const resultCheckExistUsername = await userRepo.checkExistUsername(username);
//         console.log(resultCheckExistUsername);
//         if (resultCheckExistUsername) {
//             throw new Error(500, 'User already exist!');
//         } else {
//             await createNewUser(req.body);
//         }
//     } catch (error) {
//         throw new Error(500, 'Create user exist fail');
//     }
// }
