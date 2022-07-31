const crypto = require('crypto-js');
const userService = require('./user.service');

const userRegister = async (req, res) => {
    const username = req.body.username;
    const password = crypto.SHA256(req.body.password).toString(crypto.enc.Hex);
    console.log(password);
    const name = req.body.name;
    const email = req.body.email;
    const dob = req.body.dob;
    const gender = req.body.gender;
    const phone = req.body.phone;
    const resultUserRegister = await userService.userRegister(username, password, name, email, dob, gender, phone);
    if (resultUserRegister) {
        res.send('Register Successfully!');
    } else {
        res.send('Register failed!');
    }
};

module.exports = {
    userRegister,
};
