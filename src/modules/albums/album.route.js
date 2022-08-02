const express = require('express');
const albumController = require('./album.controller');
const helperMiddleware = require('../../helpers/helper.middleware');

const route = express.Router();

route.post('/album/upload', helperMiddleware.checkAuthor, albumController.uploadAlbum);

route.post('/album/delete', albumController.deleteAlbum);

module.exports = {
    albumRoute: route,
};
