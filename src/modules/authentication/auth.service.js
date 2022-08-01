require('dotenv').config({ path: './src/configs/.env' });
const jwt = require('jsonwebtoken');
const userRepo = require('../users/user.repository');

function createAccessToken(username) {
    console.log('______Stage: Create Access Token______');
    const createToken = jwt.sign({ username }, process.env.privateKey, { expiresIn: '1h' });
    return createToken;
}

async function userLogin(username, password) {
    console.log('______Stage: Auth Service______');
    const result = await userRepo.checkExistAcc(username, password);
    if (result) {
        const token = await createAccessToken(username);
        console.log(`➤➤➤ Access token: ${token}`);
        userRepo.addTokenForUser(username, token);
        console.log('➤➤➤ Login successful!');
        return true;
    }
    console.log('➤➤➤ Invalid username or password!');
    return false;
}

function verifyTokenExpired(token) {
    console.log('______Stage: Verify Token Expired______');
    jwt.verify(token, process.env.privateKey, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('➤➤➤ Token is ok!');
        }
    });
}

function jwtDecoded(token) {
    return jwt.decode(token);
}
module.exports = {
    userLogin,
    verifyTokenExpired,
    createAccessToken,
    jwtDecoded,
};
