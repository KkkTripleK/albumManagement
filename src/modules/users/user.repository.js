const mongoose = require('mongoose');
const ModelUser = require('./user.model');

mongoose
    .connect(process.env.dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('___Database is CONNECTED!'))
    .catch((err) => console.log(err));

async function checkExistAcc(username, password) {
    console.log('_Stage: check Exist Account');
    const verifyResult = await ModelUser.count({ username, password });
    if (verifyResult) {
        return true;
    }
    return false;
}

async function checkExistUsername(username) {
    console.log('______Stage: check Exist Username______');
    const verifyResult = await ModelUser.find({ username });
    if (verifyResult.length) {
        return true;
    }
    return false;
}

async function addTokenForUser(username, token) {
    await ModelUser.updateOne({ username }, { $set: { jwt: token } });
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

module.exports = {
    checkExistAcc,
    checkExistUsername,
    addTokenForUser,
    createNewUser,
    activeUser,
};
