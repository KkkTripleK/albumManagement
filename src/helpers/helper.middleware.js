const helperJWT = require('./helper.jwt');
const { ErrorHandling } = require('../errors/error-handling');
const userAlbumRepo = require('../modules/users-albums/user-album.repository');
const userRepo = require('../modules/users/user.repository');
const photoRepo = require('../modules/photos/photo.repository');

const checkAccessToken = async (req, res, next) => {
    const accessToken = req.headers.authorization;
    try {
        if (accessToken === undefined) {
            throw new ErrorHandling(500, 'Please enter your access token!');
        }
        const payload = helperJWT.verifyAccessToken(accessToken);
        req.user = { username: payload.username };
        const info = await userRepo.findUserInfo(req.user.username);
        if (info.jwt !== accessToken) {
            throw new ErrorHandling(500, 'Your access token have been changed!');
        }
        next();
    } catch (error) {
        if (error instanceof ErrorHandling) {
            throw error;
        } else {
            next(new ErrorHandling(500, 'Access Token is not Correct!'));
        }
    }
};

const checkAuthor = async (req, res, next) => {
    try {
        await userAlbumRepo.checkAuthor(req, res);
        next();
    } catch (error) {
        next(error);
    }
};

const checkPhotoAlbumExist = async (req, res, next) => {
    try {
        const filename = req.body.filename;
        const resultCheckPhotoAlbumExsit = await photoRepo.checkPhotoAlbumExist(filename);
        if (resultCheckPhotoAlbumExsit) {
            throw new ErrorHandling(500, 'Invited Failed!');
        }
        next();
    } catch (error) {
        next(error);
    }
};

const checkInvited = async (req, res, next) => {
    try {
        const username = req.body.invited;
        const resultCheckExistInvited = await userRepo.checkExistUsername(username);
        if (!resultCheckExistInvited) {
            throw new Error(500, 'Invited User not Exsit!');
        }
        next();
    } catch (error) {
        next(error);
    }
};

const checkUserAlbumExist = async (req, res, next) => {
    try {
        const result = await userAlbumRepo.checkUserAlbumExist(req, res);
        if (result !== false) {
            throw new ErrorHandling(500, 'Invited Failed!');
        }
        next();
    } catch (error) {
        next(error);
    }
};

const checkOwner = async (req, res, next) => {
    try {
        const resultCheckOwner = photoRepo.checkOwner(req, res);
        if (!resultCheckOwner) {
            throw new ErrorHandling(500, 'You are not the Owner!');
        }
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    checkAccessToken,
    checkAuthor,
    checkInvited,
    checkUserAlbumExist,
    checkOwner,
    checkPhotoAlbumExist,
};
