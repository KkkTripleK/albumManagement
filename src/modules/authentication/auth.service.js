require('dotenv').config({ path: './src/configs/.env' }); // defind 1 lan tai root
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const userRepo = require('../users/user.repository');
const { ErrorHandling } = require('../../errors/error-handling');
const createOTP = require('../../common/createOTP');
const helperEmail = require('../../helpers/helper.sendMail');

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
        throw new ErrorHandling(401, 'Please active your account before Login!');
    }
};

async function verifyForgotPassword(req, res) {
    const username = req.body.username;
    await checkActiveUser(username);
    const userInfo = await userRepo.findUserInfo(username);
    if (userInfo === null) {
        throw new ErrorHandling(400, 'Can not find your username!');
    } else if (userInfo.activeCode !== req.body.activeCode) {
        throw new ErrorHandling(500, 'Your active code is not correct!');
    }
    const OTP = createOTP.randomOTP();
    const newPassword = crypto.createHash('SHA256').update(OTP.toString()).digest('hex');
    await userRepo.updateParam(username, { password: newPassword });
    return OTP;
}

async function createNewUser(userInfo) {
    const { username, email } = userInfo;
    try {
        userInfo.password = crypto.createHash('SHA256').update(userInfo.password).digest('hex');
        const resultCreateNewUser = await userRepo.createNewUser(userInfo);
        if (!resultCreateNewUser) {
            throw new Error(500, 'Username already EXIST!');
        }
        await helperEmail.sendMail(username, email);
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
        }
        await createNewUser(req.body);
    } catch (error) {
        if (error instanceof ErrorHandling) {
            throw error;
        }
        throw new ErrorHandling(500, 'Create user FAILED!');
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
};
