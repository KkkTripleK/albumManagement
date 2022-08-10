const photoService = require('./photo.service');
const albumService = require('../albums/album.service');

const uploadPhoto = async (req, res, next) => {
    try {
        await photoService.uploadPhoto(req, res);
    } catch (error) {
        next(error);
    }
};

const deletePhoto = async (req, res, next) => {
    try {
        await photoService.checkOwner(req, res);
        await photoService.deletePhoto(req, res);
    } catch (error) {
        next(error);
    }
};

const addToAlbum = async (req, res, next) => {
    console.log(req.user);
    console.log(req.body);
    try {
        await photoService.checkPhotoExist(req, res);
        await albumService.checkAuthor(req, res);
        await photoService.addToAlbum(req, res);
        res.status(200).send('Add photo to Album Successful!');
    } catch (error) {
        next(error);
    }
};

const showPhoto = async (req, res, next) => {
    try {
        const listPhoto = await photoService.showPhoto(req, res);
        res.status(200).send(listPhoto);
    } catch (error) {
        next(error);
    }
};

const showPhotoInAlbum = async (req, res, next) => {
    try {
        const listPhoto = await photoService.showPhotoInAlbum(req, res);
        res.status(200).send(listPhoto);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    uploadPhoto,
    deletePhoto,
    addToAlbum,
    showPhoto,
    showPhotoInAlbum,
};
