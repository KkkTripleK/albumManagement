const helperJWT = require('./helper.jwt');
const { Error } = require('../errors/error-handling');
const albumService = require('../modules/albums/album.service');
const albumUserService = require('../modules/users-albums/user-album.service');
// const authController = require('../modules/albums/album.controller');

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
        await albumUserService.checkAuthor(req, res);
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    checkAccessToken,
    checkAlbumExsit,
    checkAuthor,
};
