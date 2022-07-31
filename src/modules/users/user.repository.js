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
    console.log('_Stage: check Exist Username');
    const verifyResult = await ModelUser.find({ username });
    if (verifyResult.length) {
        return true;
    }
    return false;
}

async function addTokenForUser(username, token) {
    await ModelUser.updateOne({ username }, { $set: { jwt: token } });
    // console.log(ModelUser.find({ username }));
}

function createNewUser(username, password, name, email, dob, gender, phone) {
    if (password.length && name.length && email.length) {
        const newUser = new ModelUser({
            username,
            password,
            name,
            email,
            // dob: null,
            // gender: null,
            // phone: '0389685830',
            isActive: 'No active',
            // activeCode: null,
            // jwt: null,
        });
        console.log('newUser');
        console.log(newUser);
        newUser
            .save()
            .catch((err) => {
                console.log(err);
                return err;
            })
            .then(() => {
                console.log('=> Create new User successful!');
                return true;
            });
    } else {
        console.log('=> Please fill password, name and email!');
        return false;
    }
    return createNewUser;
}

module.exports = {
    checkExistAcc,
    checkExistUsername,
    addTokenForUser,
    createNewUser,
};
