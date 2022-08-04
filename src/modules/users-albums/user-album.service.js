const userAlbumRepo = require('./user-album.repository');
const { Error } = require('../../errors/error-handling');

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
        const { invited, albumID } = req.body;
        const role = 'invited';
        await userAlbumRepo.createUserAlbum(invited, albumID, role);
        res.status(200).send('Invite Successful');
    } catch (error) {
        throw new Error(500, 'Invite to album Failed!');
    }
};

module.exports = {
    // createUserAlbum,
    deleteUserAlbum,
    inviteToAlbum,
};
