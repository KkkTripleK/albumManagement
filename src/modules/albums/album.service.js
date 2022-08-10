const albumRepo = require('./album.repository');
const userAlbumRepo = require('../users-albums/user-album.repository');
const { ErrorHandling } = require('../../errors/error-handling');

const checkAlbumExsit = async (albumID) => {
    try {
        const result = await albumRepo.checkAlbumExsit(albumID);
        if (!result) {
            throw new ErrorHandling(500, 'AlbumID not exsit!');
        }
    } catch (error) {
        if (error instanceof ErrorHandling) {
            throw error;
        }
        throw new ErrorHandling(500, 'AlbumID not exsit!');
    }
};

const createNewAlbum = async (req, res) => {
    try {
        const newAlbum = await albumRepo.createAlbum(req.body);
        req.user.id = newAlbum.id.toString();
    } catch (error) {
        throw new ErrorHandling(500, 'Create album Failed!');
    }
};

const showAlbum = async (req, res) => {
    try {
        return await albumRepo.showAlbum(req.user.username);
    } catch (err) {
        throw new ErrorHandling(500, 'Show album Failed!');
    }
};

const checkAuthor = async (req, res) => {
    try {
        const resultFindID = await userAlbumRepo.checkAuthor(req.user.username, req.body.albumID);
        req.user = { role: resultFindID.role };
    } catch (error) {
        throw new ErrorHandling(500, 'Can not find your Album!');
    }
};

const updateAlbum = async (req, res) => {
    if (req.user.role !== 'Author') {
        throw new ErrorHandling(500, 'You do not have permission to update this album!');
    }
    try {
        const albumID = req.body.albumID;
        const param = req.body;
        delete param.albumID;
        await albumRepo.updateAlbum(albumID, param);
    } catch (error) {
        throw new ErrorHandling(500, 'Update album Failed!');
    }
};

const deleteAlbum = async (albumID) => {
    try {
        await albumRepo.deleteAlbum(albumID);
    } catch (error) {
        throw new ErrorHandling(500, 'Delete album Failed!');
    }
};

module.exports = {
    createNewAlbum,
    showAlbum,
    checkAuthor,
    updateAlbum,
    deleteAlbum,
    checkAlbumExsit,
};
