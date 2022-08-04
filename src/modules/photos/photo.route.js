const express = require('express');
const photoController = require('./photo.controller');
const helperMiddleware = require('../../helpers/helper.middleware');

const route = express.Router();

route.post('/photo/upload', helperMiddleware.checkAccessToken, photoController.uploadPhoto);

route.post(
    '/photo/delete',
    helperMiddleware.checkAccessToken,
    helperMiddleware.checkOwner,
    photoController.deletePhoto
);

route.post(
    '/photo/addToAlbum',
    helperMiddleware.checkAccessToken,
    helperMiddleware.checkPhotoAlbumExist,
    helperMiddleware.checkOwner,
    helperMiddleware.checkAuthor,
    helperMiddleware.checkUserAlbumExist,
    photoController.addToAlbum
);

module.exports = {
    photoRoute: route,
};
