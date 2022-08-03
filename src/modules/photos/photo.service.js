const photoRepo = require('./photo.repository');

const uploadPhoto = (req, res) => {
    try {
        photoRepo.uploadPhoto(req, res);
    } catch (error) {
        throw new Error(500, 'Upload photo Failed!');
    }
};

const deletePhoto = (req, res) => {
    try {
        photoRepo.deletePhoto(req, res);
    } catch (error) {
        throw new Error(500, 'Delete photo Failed!');
    }
};

const addToAlbum = (req, res) => {
    try {
        photoRepo.addToAlbum(req, res);
    } catch (error) {
        throw new Error(500, 'Add photo to album Failed!');
    }
};

module.exports = {
    uploadPhoto,
    deletePhoto,
    addToAlbum,
};
