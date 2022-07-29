// Kiểm tra sự tồn tại của Acc, đẩy data xuống repo
const authService = require('../authentication/auth.service');
const userRepo = require('./user.repository');

function checkExistAcc(userName, password) {
    console.log('_Stage: user Service');
    return userRepo.checkExistAcc(userName, password);
}
module.exports = { checkExistAcc };
