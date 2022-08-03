const userAlbumService = require('./user-album.service');

const createUserAlbum = async (req, res, next) => {
    try {
        userAlbumService.createUserAlbum(req, res);
    } catch (error) {
        next(error);
    }
};

const inviteToAlbum = async (req, res, next) => {
    try {
        userAlbumService.inviteToAlbum(req, res);
    } catch (error) {
        next(error);
    }
};

const checkUserAlbumExist = async (req, res, next) => {
    try {
        userAlbumService.checkUserAlbumExist(req, res);
    } catch (error) {
        next(error);
    }
};
module.exports = {
    createUserAlbum,
    inviteToAlbum,
    checkUserAlbumExist,
};
