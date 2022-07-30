// Kiểm tra sự tồn tại của Acc, đẩy data xuống repo
const userRepo = require('./user.repository');

function checkExistAcc(username, password) {
    console.log('_Stage: user Service');
    return userRepo.checkExistAcc(username, password);
}

function userRegister(username, password, name, email, dob, gender, phone) {
    const result = userRepo.checkExistUsername(username);
    console.log(result);
}

module.exports = {
    checkExistAcc,
    userRegister,
};
