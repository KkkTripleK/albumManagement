// Query dữ liệu, chuyển data qua service
const readLineSync = require('readline-sync');
// const authRoute = require('./auth.route');
const checkID = require('./auth.validation');

const userLogin = (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;
    console.log(userName);
};

// userLogin();
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
    login,
    userLogin,
};
// end
