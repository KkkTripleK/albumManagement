const mongoose = require('mongoose');
const database = require('./user.model');

const dbURI =
    'mongodb+srv://khanhhoapso:1232123@cluster0.bi5vf.mongodb.net/userDB?retryWrites=true&w=majority';

const connectDB = mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log('DB Connected'))
    .catch((err) => console.log(err));
// Verify
async function verifyAcc(inputID, inputPass) {
    console.log('_Stage: verify');
    console.log(inputID);
    console.log(inputPass);
    const verifyResult = await database
        .find({ id: inputID, pass: inputPass })
        .then((result) => {
            if (result.length) {
                return true;
            }
            return false;
        })
        .catch((err) => console.log(err));
    return verifyResult;
}

function sendDB(inputID, inputPass) {
    console.log('_Stage: sendDB');

    // eslint-disable-next-line new-cap
    const newDt = new database({
        id: inputID,
        pass: inputPass,
    });
    newDt
        .save()
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
}

module.exports = {
    connectDB,
    verifyAcc,
    sendDB,
};
