const jwt = require('jsonwebtoken');

function verifyAccessToken(token) {
    jwt.verify(token, process.env.privateKey, (err) => {
        if (err) {
            return false;
        } else {
            return true;
        }
    });
}

function decodeAccessToken(token) {
    console.log(jwt.decode(token));
}

module.exports = {
    verifyAccessToken,
    decodeAccessToken,
};
