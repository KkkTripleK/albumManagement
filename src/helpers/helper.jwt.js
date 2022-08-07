const jwt = require('jsonwebtoken');

function verifyAccessToken(token) {
    return jwt.verify(token, process.env.privateKey);
}

function decodeAccessToken(token) {
    return jwt.decode(token);
}

module.exports = {
    verifyAccessToken,
    decodeAccessToken,
};
