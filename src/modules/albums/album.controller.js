const albumService = require('./album.service');
const { Error, ErrorHandling } = require('../../errors/error-handling');
const userAlbumService = require('../users-albums/user-album.service');
const userAlbumRepo = require('../users-albums/user-album.repository');

const createAlbum = async (req, res, next) => {
    try {
        await albumService.createNewAlbum(req, res);
        await userAlbumService.createUserAlbum(req, res);
        res.status(200).send('Create new album succesful!');
    } catch (error) {
        next(error);
    }
};

const showAlbum = async (req, res, next) => {
    try {
        const albumInfo = await albumService.showAlbum(req, res);
        res.status(200).send(albumInfo);
    } catch (error) {
        next(error);
    }
};

const updateAlbum = async (req, res, next) => {
    try {
        await albumService.checkAlbumExsit(req.body.albumID);
        await albumService.checkAuthor(req, res);
        await albumService.updateAlbum(req, res);
        res.status(200).send('Update album successful!');
    } catch (error) {
        next(error);
    }
};

const deleteAlbum = async (req, res, next) => {
    try {
        await albumService.checkAlbumExsit(req.body.albumID);
        await albumService.checkAuthor(req, res);
        console.log(req.user);
        // if (req.user.role !== 'Author') {
        //     throw new ErrorHandling(500, 'You are not the Author!');
        // }
        await albumService.deleteAlbum(req.body.albumID);
        await userAlbumService.deleteUserAlbum(req.body.albumID);
        res.status(200).send('Delete Successful!');
    } catch (error) {
        if (error instanceof ErrorHandling) {
            next(error);
        } else {
            next(new ErrorHandling(500, 'Delete album failed!'));
        }
    }
};

module.exports = {
    createAlbum,
    showAlbum,
    updateAlbum,
    deleteAlbum,
};
