const helperJWT = require('./helper.jwt');
const { Error } = require('../errors/error-handling');
const albumService = require('../modules/albums/album.service');
const userAlbumRepo = require('../modules/users-albums/user-album.repository');
const userRepo = require('../modules/users/user.repository');
const photoRepo = require('../modules/photos/photo.repository');

const checkAccessToken = (req, res, next) => {
    const accessToken = req.headers.authorization;
    try {
        helperJWT.verifyAccessToken(accessToken);
        const payload = helperJWT.decodeAccessToken(accessToken);
        req.body.username = payload.username;
        next();
    } catch (error) {
        next(new Error(500, 'Access Token is Not Available!'));
    }
};

const checkAlbumExsit = async (req, res, next) => {
    try {
        const resultCheckExistAlbum = await albumService.checkExsitAlbum(req, res);
        if (resultCheckExistAlbum) {
            throw new Error(500, 'Album is Already Exsit!');
        } else {
            next();
        }
    } catch (error) {
        next(error);
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
    const filename = req.body.filename;
    const resultCheckPhotoAlbumExsit = await photoRepo.checkPhotoAlbumExist(filename);
    if (resultCheckPhotoAlbumExsit) {
        throw new Error(500, 'Invited Failed!');
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
            throw new Error(500, 'Invited Failed!');
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
            throw new Error(500, 'You are not the Owner!');
        }
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    checkAccessToken,
    checkAlbumExsit,
    checkAuthor,
    checkInvited,
    checkUserAlbumExist,
    checkOwner,
    checkPhotoAlbumExist,
};
