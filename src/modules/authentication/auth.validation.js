/* eslint-disable prefer-regex-literals */
const joi = require('joi');
const { ErrorHandling } = require('../../errors/error-handling');

const inputSchema = joi.object({
    username: joi.string().pattern(new RegExp('^[a-zA-Z][a-zA-Z0-9]{5,}$')).required(),
    password: joi.string().required(),
    // password: joi.string().pattern(new RegExp('^[a-zA-Z][a-zA-Z0-9]{5,}$')).required(),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'vn'] } }),
});

const validateLogin = async (req, res, next) => {
    console.log(req.body);
    const { username, password, email } = req.body;
    try {
        await inputSchema.validateAsync({
            username,
            password,
            email,
        });
        next();
    } catch (error) {
        next(new ErrorHandling(400, error.details[0].message));
    }
};

const validateRegister = async (req, res, next) => {
    const { username, password, email } = req.body;
    try {
        await inputSchema.validateAsync({
            username,
            password,
            email,
        });
        next();
    } catch (error) {
        next(new ErrorHandling(400, error.details[0].message));
    }
};

module.exports = {
    validateLogin,
    validateRegister,
};
