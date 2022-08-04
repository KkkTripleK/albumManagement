// add member , remove member from album
const express = require('express');
const helperMiddleware = require('../../helpers/helper.middleware');
const userAlbumController = require('./user-album.controller');

const route = express.Router();

route.post(
    '/album/invite',
    helperMiddleware.checkUserAlbumExist,
    helperMiddleware.checkAccessToken,
    helperMiddleware.checkAuthor,
    helperMiddleware.checkInvited,
    userAlbumController.inviteToAlbum
);

module.exports = {
    userAlbumRoute: route,
};
