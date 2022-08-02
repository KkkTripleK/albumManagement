const express = require('express');
const photoController = require('./photo.controller');

const route = express.Router();

route.post('/photo/upload', photoController.uploadPhoto);

route.post('/photo/delete', photoController.deletePhoto);

module.exports = {
    photoRoute: route,
};
