const userAlbumService = require('./user-album.service');

const createUserAlbum = async (req, res, next) => {
    try {
        userAlbumService.createUserAlbum(req, res);
        next();
    } catch (error) {
        next(error);
    }
};
module.exports = {
    createUserAlbum,
};
