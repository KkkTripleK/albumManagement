const ModelUser = require('./user.model');

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
    await ModelUser.updateOne({ username }, { $set: param });
}

async function createNewUser(userInfo) {
    const newUser = new ModelUser(userInfo);
    await newUser.save();
    return true;
}

async function checkActiveUser(username) {
    const resultCheckActiveUser = await ModelUser.findOne({ username });
    return resultCheckActiveUser.isActive;
}

async function activeUser(username) {
    await ModelUser.updateOne({ username }, { $set: { isActive: true } });
}

// // xem co con o dau dung ko?
// async function getEmail(username) {
//     const verifyResult = await ModelUser.findOne({ username });
//     return verifyResult.email;
// }

module.exports = {
    checkExistAcc,
    checkExistUsername,
    addTokenForUser,
    createNewUser,
    activeUser,
    checkActiveUser,
    // getEmail,
    updateParam,
    findUserInfo,
};
