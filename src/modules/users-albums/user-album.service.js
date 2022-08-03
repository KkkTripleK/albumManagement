const userAlbumRepo = require('./user-album.repository');
const { Error } = require('../../errors/error-handling');

const createUserAlbum = async (req, res) => {
    try {
        const { username, albumID } = req.body;
        await userAlbumRepo.createUserAlbum(username, albumID);
    } catch (error) {
        throw new Error(500, 'Create new User-Album Failed!');
    }
};

const checkAuthor = async (req, res) => {
    try {
        await userAlbumRepo.checkAuthor(req, res);
    } catch (error) {
        throw new Error(500, 'Check author failed!');
    }
};

const deleteUserAlbum = async (req, res) => {
    try {
        userAlbumRepo.deleteUserAlbum(req.body.albumID);
    } catch (error) {
        throw new Error(500, 'Check author failed!');
    }
};

module.exports = {
    createUserAlbum,
    checkAuthor,
    deleteUserAlbum,
};
