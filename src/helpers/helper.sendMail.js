const nodemailer = require('nodemailer');
const createOTP = require('../common/createOTP');
const userRepo = require('../modules/users/user.repository');

async function sendMail(username, email) {
    await nodemailer.createTestAccount();
    const smtpConfig = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.emailID,
            pass: process.env.emailPassword,
        },
    };
    const transporter = nodemailer.createTransport(smtpConfig);
    const OTP = createOTP.randomOTP();
    await userRepo.updateParam(username, { activeCode: OTP.toString() });
    const link = `Your OPT number is: ${OTP}`;
    await transporter.sendMail({
        from: '"HoaNK " <nguyenkhanhhoapso@gmail.com>',
        to: email,
        subject: 'OPT number!',
        html: link,
    });
}

module.exports = {
    sendMail,
};
