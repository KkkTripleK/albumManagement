const nodemailer = require('nodemailer');
require('dotenv').config({ path: './src/configs/.env' });
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const userRepo = require('../users/user.repository');
const { Error } = require('../../errors/error-handling');
const createOTP = require('../../common/createOTP');

async function verifyUser(req, res) {
    try {
        const { username, activeCode } = req.body;
        const userInfo = await userRepo.findUserInfo(username);
        if (userInfo.activeCode === activeCode && userInfo.isActive === false) {
            console.log('1');
            userRepo.updateParam(username, { isActive: 'true' });
            res.status(200).send('Successful!');
        } else if (userInfo.activeCode === activeCode && userInfo.isActive === true) {
            const OTP = createOTP.randomOTP();
            const newPassword = crypto.createHash('SHA256').update(OTP.toString()).digest('hex');
            userRepo.updateParam(username, { password: newPassword });
            res.status(200).send('Successful!');
        } else {
            throw new Error(500, 'Verify user failed');
        }
    } catch (error) {
        throw new Error(500, 'Verify user failed');
    }
}

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

async function createNewUser(userInfo) {
    userInfo.password = crypto.createHash('SHA256').update(userInfo.password).digest('hex');
    const { username, email } = userInfo;
    try {
        const resultCreateNewUser = await userRepo.createNewUser(userInfo);
        if (!resultCreateNewUser) {
            throw new Error(500, 'User already exist!!');
        } else {
            console.log('send mail');
            await sendMail(username, email);
        }
    } catch (error) {
        throw new Error(500, 'create user fail');
    }
}

const userRegister = async (req, res) => {
    const { username } = req.body;
    try {
        console.log('Auth Service userRegister');
        const resultCheckExistUsername = await userRepo.checkExistUsername(username);
        console.log(`resultCheckExistUsername: ${resultCheckExistUsername}`);
        if (resultCheckExistUsername) {
            throw new Error(500, 'User already exist!');
        } else {
            console.log('Create New User...');
            await createNewUser(req.body);
        }
    } catch (error) {
        throw new Error(500, 'Create user fail');
    }
};

const registerVerify = async (req, res) => {
    try {
        await verifyUser(req, res);
        res.status(200).send('Activate your account SUCCESSFUL!');
    } catch (err) {
        throw new Error(500, 'Active your account Failed!');
    }
};

function createAccessToken(username) {
    const createToken = jwt.sign({ username }, process.env.privateKey, { expiresIn: '1h' });
    return createToken;
}

async function userLogin(username, password) {
    const result = await userRepo.checkExistAcc(username, password);
    console.log(result);
    if (result) {
        const token = await createAccessToken(username);
        userRepo.addTokenForUser(username, token);
        return token;
    } else {
        throw new Error(500, 'Your account not exist!');
    }
}

function verifyTokenExpired(token) {
    jwt.verify(token, process.env.privateKey, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('➤➤➤ Token is ok!');
        }
    });
}

function jwtDecoded(token) {
    return jwt.decode(token);
}

module.exports = {
    userRegister,
    registerVerify,
    userLogin,
    verifyTokenExpired,
    createAccessToken,
    jwtDecoded,
    verifyUser,
    sendMail,
};
