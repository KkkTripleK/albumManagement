// Kiểm tra xem user và pass đã đúng chưa --> call user service
// Cung cấp token để đăng nhập nếu như đã nhập đúng --> JWT
const jwt = require('jsonwebtoken');
const fs = require('fs');
const userService = require('../users/user.service');
const userRepo = require('../users/user.repository');

async function userLogin(userName, password) {
    console.log('_Stage: auth Service');
    const result = await userService.checkExistAcc(userName, password);
    if (result) {
        jwt.verify(token, privateKey, (err, decoded) => {
            if (err) {
                console.log(err);
            }
        });
        // const privateKey = 'thismsg';
        // const token = jwt.sign({ userName }, privateKey, { expiresIn: '5s' });
        // userRepo.addTokenForUser(userName, token);

        // console.log('Login successful!');
    } else {
        console.log('Invalid username or password!');
    }
}

module.exports = { userLogin };
