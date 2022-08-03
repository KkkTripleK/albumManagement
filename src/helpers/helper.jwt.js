const jwt = require('jsonwebtoken');

function verifyAccessToken(token) {
    try {
        jwt.verify(token, process.env.privateKey);
    } catch (error) {
        throw new Error('JWT error');
    }
}

function decodeAccessToken(token) {
    return jwt.decode(token);
}

module.exports = {
    verifyAccessToken,
    decodeAccessToken,
};
