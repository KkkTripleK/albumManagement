const express = require('express');
const albumController = require('./album.controller');
const helperMiddleware = require('../../helpers/helper.middleware');

const route = express.Router();

route.post('/album/create', helperMiddleware.checkAccessToken, albumController.createAlbum);

route.get('/album/show', helperMiddleware.checkAccessToken, albumController.showAlbum);

route.patch('/album/update', helperMiddleware.checkAccessToken, albumController.updateAlbum);

route.delete('/album/delete', helperMiddleware.checkAccessToken, albumController.deleteAlbum);

module.exports = {
    albumRoute: route,
};
