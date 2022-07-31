const userService = require('./user.service');

const userRegister = async (req, res) => {
    try {
        const resultUserRegister = await userService.userRegister(req, res);
        if (resultUserRegister) {
            res.send('Register SUCCESSFUL!');
        } else {
            res.send('Register FAILED!');
        }
    } catch (err) {
        res.send(err);
    }
};

const registerVerify = async (req, res) => {
    try {
        await userService.verifyUser(req, res);
        res.status(200).send('Activate your account SUCCESSFUL!');
    } catch (err) {
        res.send(err);
    }
};

module.exports = {
    userRegister,
    registerVerify,
};
