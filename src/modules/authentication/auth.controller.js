//Query dữ liệu, chuyển data qua service
const readLineSync = require("readline-sync");
const fs = require("fs");

const checkID = require('./auth.validation')
//export
module.exports = {
    readSelectMode,
    login
}
//end

//Lua chon che do
function readSelectMode() {
    //console.clear();
    let mode = ["Login", "Register"];
    let index = readLineSync.keyInSelect(mode, "Xin moi ban lua chon: ") + 1;
    return index;
}

//Validate 
function validation(data) {
    return checkID.checkID(data);
}

//login
function login() {
    let result;
    let data;
    data = readLineSync.prompt();
    if (validation(data)) {
        result = true;
        return { result, data };
    } else {
        result = false;
        return result;
    }
}
