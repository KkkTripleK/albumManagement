// Kiểm tra sự tồn tại của Acc, đẩy data xuống repo
const nodemailer = require('nodemailer');
const authService = require('../authentication/auth.service');
const userRepo = require('./user.repository');

async function sendMail(username) {
    await nodemailer.createTestAccount();
    const smtpConfig = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'nguyenkhanhhoapso@gmail.com',
            pass: 'txbabkrlzbgzomox',
        },
    };
    const transporter = nodemailer.createTransport(smtpConfig);
    const token = authService.createAccessToken(username);
    const verifyURL = `<a href = "http://localhost:8080/register/verify/?username=${username}&token=${token}"> Verify by this link! </a>`;
    await transporter.sendMail({
        from: '"HoaNK " <nguyenkhanhhoapso@gmail.com>',
        to: '01689685830hoa@gmail.com',
        subject: 'Verify Your Account 🥰',
        html: verifyURL,
    });
}

async function userRegister(username, password, name, email, dob, gender, phone) {
    const resultCheckExistUsername = await userRepo.checkExistUsername(username);
    if (!resultCheckExistUsername) {
        const resultCreateNewUser = await userRepo.createNewUser(username, password, name, email, dob, gender, phone);
        if (resultCreateNewUser) {
            sendMail(username)
                .then(console.log('=> Please  your email!'))
                .catch(() => {
                    console.log('failed');
                    return false;
                });
        }
    } else {
        console.log('=> Your username already exist ');
    }
}

module.exports = {
    userRegister,
};
