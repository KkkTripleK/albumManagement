const mongoose = require('mongoose');
const ModelUser = require('./user.model');

mongoose
    .connect(process.env.dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log(err));
// Verify
async function checkExistAcc(username, password) {
    console.log('_Stage: check Exist Account');
    const verifyResult = await ModelUser.find({ username, password })
        .then((result) => {
            if (result.length) {
                return true;
            }
            return false;
        })
        .catch((err) => console.log(err));
    return verifyResult;
}

async function checkExistUsername(username) {
    console.log('_Stage: check Exist Username');
    const verifyResult = await ModelUser.find({ username })
        .then((result) => {
            if (result.length) {
                console.log(result);
                console.log('true');
                return true;
            }
            console.log('false');
            return false;
        })
        .catch((err) => console.log(err));
    return verifyResult;
}

async function addTokenForUser(username, token) {
    await ModelUser.updateOne({ username }, { $set: { jwt: token } });
    // console.log(ModelUser.find({ username }));
}

// Create User
// const newAcc = new ModelUser({
//     username: 'hoaNK',
//     password: '1232123',
//     name: 'Hoa',
//     email: null,
//     dob: null,
//     gender: null,
//     phone: '0389685830',
//     isActive: 'No active',
//     activeCode: null,
//     jwt: null,
// });
// newAcc
//     .save()
//     .then((result) => console.log(result))
//     .catch((err) => console.log(err));

module.exports = {
    checkExistAcc,
    checkExistUsername,
    addTokenForUser,
};
