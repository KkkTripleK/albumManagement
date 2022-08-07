const userAlbumRepo = require('./user-album.repository');
const { ErrorHandling } = require('../../errors/error-handling');
const userRepo = require('../users/user.repository');
const albumService = require('../albums/album.service');

const deleteUserAlbum = async (albumID) => {
    try {
        userAlbumRepo.deleteUserAlbum(albumID);
    } catch (error) {
        throw new Error(500, 'Cannot Delete the Album');
    }
};

const checkInvited = async (username) => {
    try {
        const resultCheckExistInvitee = await userRepo.checkExistUsername(username);
        if (!resultCheckExistInvitee) {
            throw new ErrorHandling(500, 'Invited user not Exsit!');
        }
    } catch (error) {
        if (error instanceof ErrorHandling) {
            throw error;
        } else {
            throw new ErrorHandling(500, 'Check invited user failed!');
        }
    }
};

// check the relationship between invited and album
const checkInviteeAlbumExist = async (req, res) => {
    try {
        const result = await userAlbumRepo.checkInviteeAlbumExist(req.body.invitee, req.body.albumID);
        if (result !== false) {
            throw new ErrorHandling(500, 'Invitee is invited already!');
        }
    } catch (error) {
        if (error instanceof ErrorHandling) {
            throw error;
        } else {
            throw new ErrorHandling(500, 'Can not check the relationship between invitee and album!');
        }
    }
};

const inviteToAlbum = async (req, res) => {
    try {
        await checkInvited(req.body.invitee);
        await checkInviteeAlbumExist(req, res);
        await albumService.checkAuthor(req, res);
        console.log(req.user.role);
        if (req.user.role !== 'Author') {
            throw new ErrorHandling(500, 'You do not have permission to invite other user to this album!');
        }
        const { invitee, albumID } = req.body;
        const role = 'Invited';
        await userAlbumRepo.createUserAlbum(invitee, albumID, role);
    } catch (error) {
        if (error instanceof ErrorHandling) {
            throw error;
        } else {
            throw new ErrorHandling(500, 'Invite to album Failed!');
        }
    }
};

const removeUserFromAlbum = async (req, res) => {
    try {
        // kiem tra mqh cua user va album
        // kiem tra mqh cua remover va album
    } catch (error) {
        if (error instanceof ErrorHandling) {
            throw error;
        } else {
            throw new ErrorHandling(500, 'Invite to album Failed!');
        }
    }
};

module.exports = {
    deleteUserAlbum,
    inviteToAlbum,
    removeUserFromAlbum,
};
