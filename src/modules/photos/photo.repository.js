const fs = require('fs');
const ModelPhoto = require('./photo.model');

const uploadPhoto = (req, res) => {
    const file = req.file;
    res.send(file);
};

const uploadPhotoToDB = async (photoInfo) => {
    console.log(photoInfo);
    const newPhotoDB = new ModelPhoto(photoInfo);
    await newPhotoDB.save();
};

const deletePhoto = async (path) => {
    console.log(path);
    await ModelPhoto.deleteOne({ path });
    fs.unlink(path.toString(), (err) => {
        if (err) console.log(err);
    });
};

const findPath = async (filename) => {
    const photoInfo = await ModelPhoto.findOne({ filename });
    return photoInfo.path;
};

const addToAlbum = async (req, res) => {
    //
};

const checkOwner = async (req, res) => {
    const resulCheckOwner = await ModelPhoto.count(req.body);
    return resulCheckOwner !== 0;
};

const checkPhotoAlbumExist = async (filename) => {
    const photoInfo = await ModelPhoto.findOne({ filename });
    return photoInfo.albumID !== undefined;
};

module.exports = {
    uploadPhoto,
    uploadPhotoToDB,
    deletePhoto,
    addToAlbum,
    checkOwner,
    findPath,
    checkPhotoAlbumExist,
};
