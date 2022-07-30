const crypto = require('crypto-js');
const userService = require('./user.service');

const userRegister = (req, res) => {
    const username = req.body.username;
    const password = crypto.SHA256(req.body.password).toString(crypto.enc.Hex);
    const name = req.body.name;
    const email = req.body.email;
    const dob = req.body.dob;
    const gender = req.body.gender;
    const phone = req.body.phone;
    userService.userRegister(
        username,
        password,
        name,
        email,
        dob,
        gender,
        phone
    );
};

module.exports = {
    userRegister,
};
