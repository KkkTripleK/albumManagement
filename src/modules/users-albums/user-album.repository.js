const ModelUserAlbum = require('./user-album.model');

const createUserAlbum = async (username, albumID, role) => {
    console.log({ albumID });
    const newUserAlbum = new ModelUserAlbum({ username, albumID, role });
    await newUserAlbum.save();
};

const checkAuthor = async (username, albumID) => {
    const resultFindID = await ModelUserAlbum.findOne({ username, albumID });
    console.log(resultFindID);
    return resultFindID;
};

const deleteUserAlbum = async (id) => {
    await ModelUserAlbum.deleteOne({ id });
};

const checkInviteeAlbumExist = async (username, albumID) => {
    const resultCheckExist = await ModelUserAlbum.count({ username, albumID });
    return resultCheckExist !== 0;
};

module.exports = {
    createUserAlbum,
    checkAuthor,
    deleteUserAlbum,
    checkInviteeAlbumExist,
};
