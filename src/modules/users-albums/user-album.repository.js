const ModelUserAlbum = require('./user-album.model');

const createUserAlbum = async (username, albumID, role) => {
    const newUserAlbum = new ModelUserAlbum({ username, albumID, role });
    await newUserAlbum.save();
};

const checkAuthor = async (req, res) => {
    const { albumID } = req.body;
    const resultFindID = await ModelUserAlbum.findOne({ albumID });
    req.body.role = resultFindID.role;
};

const deleteUserAlbum = async (id) => {
    await ModelUserAlbum.deleteOne({ id });
};

const checkUserAlbumExist = async (req, res) => {
    const resultCheckExist = await ModelUserAlbum.count(req.body);
    return resultCheckExist;
};

module.exports = {
    createUserAlbum,
    checkAuthor,
    deleteUserAlbum,
    checkUserAlbumExist,
};
