const mongoose = require('mongoose');
const ModelUser = require('./user.model');
const { Error } = require('../../errors/error-handling');

mongoose
    .connect(process.env.dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('___Database is CONNECTED!'))
    .catch((err) => console.log(err));

async function findUserInfo(username) {
    const resultFindUser = await ModelUser.findOne({ username });
    return resultFindUser;
}

async function checkExistAcc(username, password) {
    const verifyResult = await ModelUser.count({ username, password });
    return verifyResult !== 0;
}

async function checkExistUsername(username) {
    const resultCount = await ModelUser.count({ username });
    return resultCount !== 0;
}

async function addTokenForUser(username, token) {
    await ModelUser.updateOne({ username }, { $set: { jwt: token } });
}

async function updateParam(username, param) {
    console.log('1');
    await ModelUser.updateOne({ username }, { $set: param });
}

async function createNewUser(userInfo) {
    const newUser = new ModelUser(userInfo);
    await newUser.save();
    return true;
}

async function activeUser(username) {
    await ModelUser.updateOne({ username }, { $set: { isActive: true } });
}

async function getEmail(username) {
    const verifyResult = await ModelUser.findOne({ username });
    return verifyResult.email;
}

module.exports = {
    checkExistAcc,
    checkExistUsername,
    addTokenForUser,
    createNewUser,
    activeUser,
    getEmail,
    updateParam,
    findUserInfo,
};
