const express = require('express');
const photoController = require('./photo.controller');
const helperMiddleware = require('../../helpers/helper.middleware');

const route = express.Router();

route.post('/photo/upload', helperMiddleware.checkAccessToken, photoController.uploadPhoto);

route.delete('/photo/delete', helperMiddleware.checkAccessToken, photoController.deletePhoto);

route.patch('/photo/addToAlbum', helperMiddleware.checkAccessToken, photoController.addToAlbum);

route.get('/photo/showPhoto', helperMiddleware.checkAccessToken, photoController.showPhoto);

route.patch('/photo/showPhotoInAlbum', helperMiddleware.checkAccessToken, photoController.showPhotoInAlbum);

module.exports = {
    photoRoute: route,
};
