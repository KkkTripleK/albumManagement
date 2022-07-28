// Query dữ liệu, chuyển data qua service
const readLineSync = require('readline-sync');
const fs = require('fs');

const checkID = require('./auth.validation');

// Lua chon che do
function readSelectMode() {
    // console.clear();
    const mode = ['Login', 'Register'];
    const index = readLineSync.keyInSelect(mode, 'Xin moi ban lua chon: ') + 1;
    return index;
}

// Validate
function validation(data) {
    return checkID.checkID(data);
}

// login
function login() {
    let result;
    const data = readLineSync.prompt();
    if (validation(data)) {
        result = true;
        return { result, data };
    }
    result = false;
    return result;
}

// export
module.exports = {
    readSelectMode,
    login,
};
// end
