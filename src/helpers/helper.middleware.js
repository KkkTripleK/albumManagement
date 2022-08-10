const helperJWT = require('./helper.jwt');
const { ErrorHandling } = require('../errors/error-handling');
const userRepo = require('../modules/users/user.repository');

const checkAccessToken = async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization.split(' ');
        if (accessToken[0] !== 'Bearer') {
            throw new ErrorHandling(500, 'Access Token is not Correct!');
        }
        if (accessToken[1] === undefined) {
            throw new ErrorHandling(500, 'Please enter your access token!');
        }
        const payload = helperJWT.verifyAccessToken(accessToken[1]);
        req.user = { username: payload.username };
        const info = await userRepo.findUserInfo(req.user.username);
        if (info.jwt !== accessToken[1]) {
            throw new ErrorHandling(500, 'Your access token have been changed!');
        }
        next();
    } catch (error) {
        if (error instanceof ErrorHandling) {
            next(error);
        } else {
            next(new ErrorHandling(500, 'Access Token is not Correct!'));
        }
    }
};

module.exports = {
    checkAccessToken,
};
