const helperJWT = require('./helper.jwt');

const checkAuthor = (req, res, next) => {
    const accessToken = req.headers.authorization;
    const verifyToken = helperJWT.verifyAccessToken(accessToken);
    if (verifyToken) {
        const payload = helperJWT.decodeAccessToken(accessToken);
    } else {
        throw new Error(500, 'Access Token is not available!');
    }
};

module.exports = {
    checkAuthor,
};
