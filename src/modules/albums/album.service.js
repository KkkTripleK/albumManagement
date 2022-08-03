const albumController = require('./album.controller');
const albumRepo = require('./album.repository');
const { Error } = require('../../errors/error-handling');

const checkExsitAlbum = async (req, res) => {
    try {
        const result = await albumRepo.checkExsitAlbum(req, res);
        return result;
    } catch (error) {
        throw new Error(500, 'Name of Album already Exsit!');
    }
};

const createAlbum = async (req, res) => {
    try {
        const newAlbum = await albumRepo.createAlbum(req.body);
        req.body.albumID = newAlbum.id;
    } catch (error) {
        throw new Error(500, 'Create album Failed!');
    }
};

const deleteAlbum = async (req, res) => {
    try {
        albumRepo.deleteAlbum(req.body.albumID);
    } catch (error) {
        throw new Error(500, 'Delete album Failed!');
    }
};

module.exports = {
    createAlbum,
    deleteAlbum,
    checkExsitAlbum,
};
