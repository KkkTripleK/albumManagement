const userAlbumService = require('./user-album.service');

const inviteToAlbum = async (req, res, next) => {
    console.log('1');
    try {
        await userAlbumService.inviteToAlbum(req, res);
        console.log('7');
    } catch (error) {
        console.log('6');

        next(error);
    }
};

module.exports = {
    // createUserAlbum,
    inviteToAlbum,
};
