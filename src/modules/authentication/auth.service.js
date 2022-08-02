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
            userRepo.updateParam(username, { isActive: 'true' });
            res.status(200).send('Verify new user SUCCESFUL!');
        } else if (userInfo.activeCode === activeCode && userInfo.isActive === true) {
            const OTP = createOTP.randomOTP();
            const newPassword = crypto.createHash('SHA256').update(OTP.toString()).digest('hex');
            userRepo.updateParam(username, { password: newPassword });
            res.status(200).send(`Your new password is: ${OTP}`);
        } else {
            throw new Error(500, 'Verify new user FAILED!');
        }
    } catch (error) {
        throw new Error(500, 'Verify new user FAILED!');
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
            throw new Error(500, 'Username already EXIST!');
        } else {
            await sendMail(username, email);
        }
    } catch (error) {
        throw new Error(500, 'Create user FAILED!');
    }
}

const userRegister = async (req, res) => {
    const { username } = req.body;
    try {
        const resultCheckExistUsername = await userRepo.checkExistUsername(username);
        if (resultCheckExistUsername) {
            throw new Error(500, 'User already EXSIT!');
        } else {
            await createNewUser(req.body);
            res.status(200).send('Create new user SUCCESSFUL!');
        }
    } catch (error) {
        throw new Error(500, 'Create user FAILED!');
    }
};

const registerVerify = async (req, res) => {
    try {
        await verifyUser(req, res);
        res.status(200).send('Activate your account SUCCESSFUL!');
    } catch (err) {
        throw new Error(500, 'Active your account FAILED!');
    }
};

function createAccessToken(username) {
    const createToken = jwt.sign({ username }, process.env.privateKey, { expiresIn: '1h' });
    return createToken;
}

async function userLogin(username, password) {
    const result = await userRepo.checkExistAcc(username, password);
    if (result) {
        const token = await createAccessToken(username);
        userRepo.addTokenForUser(username, token);
        return token;
    } else {
        throw new Error(500, 'Your account not EXIST!');
    }
}

function jwtDecoded(token) {
    return jwt.decode(token);
}

module.exports = {
    userRegister,
    registerVerify,
    userLogin,
    createAccessToken,
    jwtDecoded,
    verifyUser,
    sendMail,
};
