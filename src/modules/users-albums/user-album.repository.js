const ModelUserAlbum = require('./user-album.model');

const createUserAlbum = async (username, albumID) => {
    try {
        const newUserAlbum = new ModelUserAlbum({ username, albumID });
        await newUserAlbum.save();
    } catch (error) {
        console.log(error);
        throw new Error(500, 'Create User Album Failed!');
    }
};

const checkAuthor = async (req, res) => {
    try {
        const { albumID } = req.body;
        const resultFindID = await ModelUserAlbum.findOne({ albumID });
        req.body.role = resultFindID.role;
        console.log(req.body);
    } catch (error) {
        throw new Error(500, 'Check Author Failed');
    }
};

const deleteUserAlbum = async (id) => {
    console.log({ id });
    try {
        await ModelUserAlbum.deleteOne({ id });
    } catch (error) {
        throw new Error(500, 'Can not delete your Album!');
    }
};

module.exports = {
    createUserAlbum,
    checkAuthor,
    deleteUserAlbum,
};
