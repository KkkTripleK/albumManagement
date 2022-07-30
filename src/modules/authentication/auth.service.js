// Kiểm tra xem user và pass đã đúng chưa --> call user service
// Cung cấp token để đăng nhập nếu như đã nhập đúng --> JWT
require('dotenv').config({ path: './src/configs/.env' });
const jwt = require('jsonwebtoken');
const userService = require('../users/user.service');
const userRepo = require('../users/user.repository');

async function userLogin(username, password) {
    console.log('_Stage: auth Service');
    const result = await userService.checkExistAcc(username, password);
    if (result) {
        const token = jwt.sign({ username }, process.env.privateKey, {
            expiresIn: '20s',
        });
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
};
