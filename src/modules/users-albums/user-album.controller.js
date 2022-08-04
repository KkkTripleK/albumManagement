const userAlbumService = require('./user-album.service');

const inviteToAlbum = async (req, res, next) => {
    try {
        await userAlbumService.inviteToAlbum(req, res);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    inviteToAlbum,
};
