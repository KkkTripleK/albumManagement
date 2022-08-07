const nodemailer = require('nodemailer');
require('dotenv').config({ path: './src/configs/.env' }); // defind 1 lan tai root
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const userRepo = require('../users/user.repository');
const { ErrorHandling } = require('../../errors/error-handling');
const createOTP = require('../../common/createOTP');

async function activeUser(req, res) {
    const { username, activeCode } = req.body;
    const userInfo = await userRepo.findUserInfo(username);
    if (userInfo === null) {
        throw new ErrorHandling(500, 'Can not find your username!');
    } else if (userInfo.activeCode === activeCode) {
        userRepo.updateParam(username, { isActive: 'true' });
    } else {
        throw new ErrorHandling(500, 'Your active code is not correct!');
    }
}

const checkActiveUser = async (username) => {
    const resultCheckActiveUser = await userRepo.checkActiveUser(username);
    if (!resultCheckActiveUser) {
        throw new ErrorHandling(401, 'Please active your account!');
    }
};

async function verifyForgotPassword(req, res) {
    const username = req.body.username;
    await checkActiveUser(username);
    const userInfo = await userRepo.findUserInfo(username);
    console.log(userInfo.activeCode);
    console.log(req.body.activeCode);
    if (userInfo === null) {
        throw new ErrorHandling(400, 'Can not find your username!');
    } else if (userInfo.activeCode !== req.body.activeCode) {
        throw new ErrorHandling(500, 'Your active code is not correct!');
    }
    const OTP = createOTP.randomOTP();
    // hash password -> middleware -> presave
    const newPassword = crypto.createHash('SHA256').update(OTP.toString()).digest('hex');
    //
    await userRepo.updateParam(username, { password: newPassword });
    return OTP;
}

// send mail move to helper folder
async function sendMail(username, email) {
    await nodemailer.createTestAccount();
    const smtpConfig = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'nguyenkhanhhoapso@gmail.com',
            // user move to env folder
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
    const { username, email } = userInfo;
    try {
        userInfo.password = crypto.createHash('SHA256').update(userInfo.password).digest('hex');
        const resultCreateNewUser = await userRepo.createNewUser(userInfo);
        if (!resultCreateNewUser) {
            throw new Error(500, 'Username already EXIST!');
        } else {
            await sendMail(username, email);
        }
    } catch (error) {
        throw new ErrorHandling(500, 'Create user FAILED!');
    }
}

const userRegister = async (req, res) => {
    const { username } = req.body;
    try {
        const resultCheckExistUsername = await userRepo.checkExistUsername(username);
        if (resultCheckExistUsername) {
            throw new ErrorHandling(500, 'User already EXSIT!');
        } else {
            await createNewUser(req.body);
            res.status(200).send('Create new user SUCCESSFUL!');
        }
    } catch (error) {
        if (error instanceof ErrorHandling) {
            throw error;
        } else {
            throw new ErrorHandling(500, 'Create user FAILED!');
        }
    }
};

const registerVerify = async (req, res) => {
    try {
        await activeUser(req, res);
        res.status(200).send('Activate your account SUCCESSFUL!');
    } catch (err) {
        throw new ErrorHandling(500, 'Active your account FAILED!');
    }
};

async function createAccessToken(username) {
    const createToken = jwt.sign({ username }, process.env.privateKey, { expiresIn: '10h' });
    return createToken;
}

async function userLogin(username, password) {
    const result = await userRepo.checkExistAcc(username, password);
    if (result) {
        const token = await createAccessToken(username);
        userRepo.addTokenForUser(username, token);
        return token;
    } else {
        throw new ErrorHandling(500, 'Username or Password is not correct!');
    }
}

function jwtDecoded(token) {
    return jwt.decode(token);
}

module.exports = {
    userRegister,
    registerVerify,
    checkActiveUser,
    userLogin,
    createAccessToken,
    verifyForgotPassword,
    jwtDecoded,
    activeUser,
    sendMail,
};
