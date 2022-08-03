const albumService = require('./album.service');
const userAlbumController = require('../users-albums/user-album.controller');
const { Error } = require('../../errors/error-handling');
const userAlbumService = require('../users-albums/user-album.service');

const createAlbum = async (req, res, next) => {
    try {
        await albumService.createAlbum(req, res);
        await userAlbumController.createUserAlbum(req, res, next);
        console.log('Create new albumm Successful!');
        res.status(200).send('Create Succesful!');
    } catch (error) {
        next(error);
    }
};

const deleteAlbum = async (req, res, next) => {
    try {
        if (req.body.role === 'Author') {
            await albumService.deleteAlbum(req, res);
            await userAlbumService.deleteUserAlbum(req, res);
            res.status(200).send('Delete Successful!');
        } else {
            throw new Error(500, 'You are not the Author!');
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createAlbum,
    deleteAlbum,
};
