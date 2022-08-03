const ModelAlbum = require('./album.model');

const checkExsitAlbum = async (req, res) => {
    const { nameAlbum } = req.body;
    const resultCount = await ModelAlbum.count({ nameAlbum });
    return resultCount !== 0;
};

const createAlbum = async (albumInfo) => {
    const newAlbum = new ModelAlbum(albumInfo);
    await newAlbum.save();
    return newAlbum;
};

const deleteAlbum = async (id) => {
    console.log({ id });
    try {
        await ModelAlbum.deleteOne({ id });
    } catch (error) {
        throw new Error(500, 'Can not delete your Album!');
    }
};

// const findAlbumID = async();
module.exports = {
    checkExsitAlbum,
    createAlbum,
    deleteAlbum,
};
