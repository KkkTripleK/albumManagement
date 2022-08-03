const express = require('express');
const albumController = require('./album.controller');
const helperMiddleware = require('../../helpers/helper.middleware');

const route = express.Router();

route.post(
    '/album/create',
    helperMiddleware.checkAccessToken,
    helperMiddleware.checkAlbumExsit,
    albumController.createAlbum
);

route.post(
    '/album/delete',
    helperMiddleware.checkAccessToken,
    helperMiddleware.checkAuthor,
    albumController.deleteAlbum
);

module.exports = {
    albumRoute: route,
};