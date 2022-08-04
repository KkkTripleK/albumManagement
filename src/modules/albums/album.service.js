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

const createNewAlbum = async (req, res) => {
    try {
        const newAlbum = await albumRepo.createAlbum(req.body);
        req.body.albumID = newAlbum.id;
    } catch (error) {
        throw new Error(500, 'Create album Failed!');
    }
};

const showAlbum = async (req, res) => {
    try {
        await albumRepo.showAlbum(req, res);
    } catch (err) {
        throw new Error(500, 'Show album Failed!');
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
            console.log(param);
            console.log(albumID);
            await albumRepo.updateAlbum(albumID, param);
        } catch (error) {
            throw new Error(500, 'Update album Failed!');
        }
    } else {
        throw new Error(500, 'You don not have permission to update album!');
    }
};

const deleteAlbum = async (req, res) => {
    try {
        await albumRepo.deleteAlbum(req.body.albumID);
    } catch (error) {
        throw new Error(500, 'Delete album Failed!');
    }
};

module.exports = {
    createNewAlbum,
    showAlbum,
    updateAlbum,
    deleteAlbum,
    checkExsitAlbum,
};
