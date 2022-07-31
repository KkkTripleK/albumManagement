require('dotenv').config({ path: './src/configs/.env' });
const jwt = require('jsonwebtoken');
const userRepo = require('../users/user.repository');

function createAccessToken(username) {
    console.log('_Stage: Create Access Token');
    return jwt.sign({ username }, process.env.privateKey, { expiresIn: '1h' });
}

async function userLogin(username, password) {
    console.log('_Stage: auth Service');
    const result = await userRepo.checkExistAcc(username, password);
    if (result) {
        const token = createAccessToken(username);
        console.log(`Access token: ${token}`);
        userRepo.addTokenForUser(username, token);
        console.log('Login successful!');
        return true;
    }
    console.log('Invalid username or password!');
    return false;
}

function verifyTokenExpired(token) {
    console.log('_Stage: verify Token Expired');
    jwt.verify(token, process.env.privateKey, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Token is ok!');
        }
    });
}

module.exports = {
    userLogin,
    verifyTokenExpired,
    createAccessToken,
};
