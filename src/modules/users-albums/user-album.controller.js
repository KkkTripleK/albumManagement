const userAlbumService = require('./user-album.service');

const inviteToAlbum = async (req, res, next) => {
    try {
        await userAlbumService.inviteToAlbum(req, res);
        res.status(200).send('Invite successful');
    } catch (error) {
        next(error);
    }
};

const removeUserFromAlbum = async (req, res, next) => {
    try {
        await userAlbumService.removeUserFromAlbum(req, res);
        res.status(200).send('Remove successful');
    } catch (error) {
        next(error);
    }
};
module.exports = {
    inviteToAlbum,
    removeUserFromAlbum,
};
