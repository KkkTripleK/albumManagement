const albumService = require('./album.service');

const uploadAlbum = async (req, res, next) => {
    try {
        await albumService.uploadAlbum(req, res);
        res.send('uploading...');
    } catch (error) {
        next(error);
    }
};

const deleteAlbum = (req, res, next) => {};

module.exports = {
    uploadAlbum,
    deleteAlbum,
};
