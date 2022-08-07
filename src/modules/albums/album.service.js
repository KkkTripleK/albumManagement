const albumRepo = require('./album.repository');
const { ErrorHandling } = require('../../errors/error-handling');

const checkAlbumExsit = async (req, res) => {
    const result = await albumRepo.checkAlbumExsit(req.body.nameAlbum);
    if (result) {
        throw new ErrorHandling(500, 'Name of Album already Exsit!');
    }
};

const createNewAlbum = async (req, res) => {
    try {
        const newAlbum = await albumRepo.createAlbum(req.body);
        req.body.albumID = newAlbum.id;
    } catch (error) {
        throw new ErrorHandling(500, 'Create album Failed!');
    }
};

const showAlbum = async (req, res) => {
    try {
        await albumRepo.showAlbum(req, res);
    } catch (err) {
        throw new ErrorHandling(500, 'Show album Failed!');
    }
};

const updateAlbum = async (req, res) => {
    if (req.body.role === 'Author') {
        try {
            const albumID = req.body.albumID;
            const param = req.body;
            delete param.albumID;
            delete param.username;
            delete param.role;
            await albumRepo.updateAlbum(albumID, param);
        } catch (error) {
            throw new ErrorHandling(500, 'Update album Failed!');
        }
    } else {
        throw new ErrorHandling(500, 'You don not have permission to update album!');
    }
};

const deleteAlbum = async (req, res) => {
    try {
        await albumRepo.deleteAlbum(req.body.albumID);
    } catch (error) {
        throw new ErrorHandling(500, 'Delete album Failed!');
    }
};

module.exports = {
    createNewAlbum,
    showAlbum,
    updateAlbum,
    deleteAlbum,
    checkAlbumExsit,
};
