// Kiểm tra xem user và pass đã đúng chưa --> call user service
// Cung cấp token để đăng nhập nếu như đã nhập đúng --> JWT
const jwt = require('jsonwebtoken');
const userService = require('../users/user.service');

async function userLogin(userName, password) {
    console.log('_Stage: auth Service');
    const result = await userService.checkExistAcc(userName, password);
    console.log(result);
}
module.exports = { userLogin };
