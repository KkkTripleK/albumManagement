const express = require('express');
const photoController = require('./photo.controller');
const helperMiddleware = require('../../helpers/helper.middleware');

const route = express.Router();

route.post(
    '/photo/upload',
    helperMiddleware.checkAccessToken,
    helperMiddleware.checkAuthor,
    photoController.uploadPhoto
);

route.post(
    '/photo/delete',
    helperMiddleware.checkAccessToken,
    helperMiddleware.checkAuthor,
    photoController.deletePhoto
);

route.post(
    '/photo/addToAlbum',
    helperMiddleware.checkAccessToken,
    helperMiddleware.checkAuthor,
    photoController.deletePhoto
);
module.exports = {
    photoRoute: route,
};
