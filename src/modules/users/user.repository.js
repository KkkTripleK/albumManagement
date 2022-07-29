const mongoose = require('mongoose');
const ModelUser = require('./user.model');

const dbURI =
    'mongodb+srv://khanhhoapso:1232123@cluster0.laan3.mongodb.net/AlbumMaganement?retryWrites=true&w=majority';
mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log(err));
// Verify
async function checkExistAcc(userName, password) {
    console.log('_Stage: user Repo');
    console.log(userName);
    console.log(password);
    const verifyResult = await ModelUser.find({ userName, password })
        .then((result) => {
            if (result.length) {
                console.log(result);
                return true;
            }
            return false;
        })
        .catch((err) => console.log(err));
    return verifyResult;
}
// Create User
// const newAcc = new ModelUser({
//     userName: 'hoaNK',
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
};
