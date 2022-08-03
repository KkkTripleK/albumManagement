const photoService = require('./photo.service');

const uploadPhoto = async (req, res, next) => {
    try {
        photoService.uploadPhoto(req, res);
    } catch (error) {
        next(error);
    }
};

const deletePhoto = (req, res, next) => {
    try {
        photoService.deletePhoto(req, res);
    } catch (error) {
        next(error);
    }
};

const addToAlbum = (req, res, next) => {
    try {
        photoService.addToAlbum(req, res);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    uploadPhoto,
    deletePhoto,
    addToAlbum,
};
