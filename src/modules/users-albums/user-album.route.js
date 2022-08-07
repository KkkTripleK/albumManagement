const express = require('express');
const helperMiddleware = require('../../helpers/helper.middleware');
const userAlbumController = require('./user-album.controller');

const route = express.Router();

route.post('/album/invite', helperMiddleware.checkAccessToken, userAlbumController.inviteToAlbum);

route.delete('/album/remove', helperMiddleware.checkAccessToken, userAlbumController.removeUserFromAlbum);

module.exports = {
    userAlbumRoute: route,
};
