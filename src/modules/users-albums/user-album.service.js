const userAlbumRepo = require('./user-album.repository');
const { Error } = require('../../errors/error-handling');

const createUserAlbum = async (req, res) => {
    try {
        const { username, albumID, role } = req.body;
        await userAlbumRepo.createUserAlbum(username, albumID, role);
        res.status(200).send('Create new User-Album Successful!');
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
        res.status(200).send('Delete Successful');
    } catch (error) {
        throw new Error(500, 'Cannot Delete the Album');
    }
};

const inviteToAlbum = async (req, res) => {
    try {
        const { inviter, albumID } = req.body;
        const role = 'Inviter';
        await userAlbumRepo.createUserAlbum(inviter, albumID, role);
        res.status(200).send('Invite to album Successful!');
    } catch (error) {
        throw new Error(500, 'Invite to album Failed!');
    }
};

const checkUserAlbumExist = async (req, res) => {
    try {
        const result = await userAlbumRepo.checkUserAlbumExist(req, res);
        console.log(result);
        if (result !== 0) {
            throw new Error(500, 'Invited Failed!');
        }
    } catch (error) {
        console.log(error);
        // throw new Error(500, 'Invited Failed!');
    }
};

module.exports = {
    createUserAlbum,
    checkAuthor,
    deleteUserAlbum,
    inviteToAlbum,
    checkUserAlbumExist,
};
