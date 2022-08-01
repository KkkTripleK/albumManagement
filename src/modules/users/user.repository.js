const mongoose = require('mongoose');
const ModelUser = require('./user.model');

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
    console.log('______Stage: Check Exist Account______');
    const verifyResult = await ModelUser.count({ username, password });
    if (verifyResult) {
        return true;
    } else {
        return false;
    }
}

async function checkExistUsername(username) {
    console.log('______Stage: Check Exist Username______');
    const resultCount = await ModelUser.count({ username });
    return resultCount !== 0;
}

async function addTokenForUser(username, token) {
    await ModelUser.updateOne({ username }, { $set: { jwt: token } });
}

async function updateParam(username, param) {
    try {
        await ModelUser.updateOne({ username }, { $set: param });
    } catch (err) {
        console.log(err);
    }
}

async function createNewUser(username, password, name, email, dob, gender, phone, isActive, activeCode, jwt) {
    console.log('______Stage: Create New User______');
    if (password.length && name.length && email.length) {
        const newUser = new ModelUser({
            username,
            password,
            name,
            email,
            dob,
            gender,
            phone,
            isActive: false,
            activeCode,
            jwt,
        });
        await newUser
            .save()
            .catch((err) => {
                console.log(err);
                return false;
            })
            .then(() => {
                console.log('➤➤➤ Create new User successful!');
                return true;
            });
        return newUser;
    }
    console.log('➤➤➤ Please fill password, name and email!');
    return false;
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
