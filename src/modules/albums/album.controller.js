const albumService = require('./album.service');
const userAlbumController = require('../users-albums/user-album.controller');
const { Error } = require('../../errors/error-handling');
const userAlbumService = require('../users-albums/user-album.service');
const userAlbumRepo = require('../users-albums/user-album.repository');

const createAlbum = async (req, res, next) => {
    try {
        await albumService.createNewAlbum(req, res);
        const { username, albumID, role } = req.body;
        await userAlbumRepo.createUserAlbum(username, albumID, role);
        res.status(200).send('Create Succesful!');
    } catch (error) {
        next(error);
    }
};

const showAlbum = async (req, res, next) => {
    try {
        await albumService.showAlbum(req, res);
        res.status(200).send('Show album!');
    } catch (error) {
        next(error);
    }
};

const updateAlbum = async (req, res, next) => {
    try {
        await albumService.updateAlbum(req, res);
        res.status(200).send('Update album!');
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
    showAlbum,
    updateAlbum,
    deleteAlbum,
};
