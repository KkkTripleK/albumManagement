const express = require('express');

const app = express();
const { urlencoded } = require('express');
const controlService = require('./src/modules/authentication/auth.controller');
const controlDB = require('./src/modules/users/user.repository');
const { route } = require('./src/modules/authentication/auth.route');

app.listen(8080, () => {
    console.log('Server is runing');
});
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(route);

// not useÍ›››
const selectMode = () => {
    const index = controlService.readSelectMode();
    if (index) {
        switch (index) {
            case 1:
                loginMode();
                break;
            case 2:
                registerMode();
                break;
            default:
                break;
        }
    } else {
        console.log('See you!');
    }
};
// Login Mode
const loginMode = () => {
    let dataInput;
    let inputID;
    let inputPass;
    // Input
    console.log('Mời bạn nhập ID: ');
    do {
        dataInput = controlService.login();
        if (dataInput.result) {
            inputID = dataInput.data;
        } else {
            console.log('ID chưa phù hợp, vui lòng nhập lại.');
        }
    } while (!dataInput.result);
    console.log('Password: ');
    do {
        dataInput = controlService.login();
        if (dataInput.result) {
            inputPass = dataInput.data;
        } else {
            console.log('Password chưa phù hợp, vui lòng nhập lại.');
        }
    } while (!dataInput.result);
    // Verify
    const connectDB = async () => {
        await controlDB.connectDB;
        const result = await controlDB.verifyAcc(inputID, inputPass);
        if (result) {
            console.log('Dang nhap thanh cong!');
        } else {
            console.log('Tai khoan hoac mat khau sai');
        }
    };
    connectDB();
};

// selectMode();
