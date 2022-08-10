const fs = require('fs');
const ModelPhoto = require('./photo.model');

const uploadPhoto = (req, res) => {
    const file = req.file;
    res.send(file);
};

const uploadPhotoToDB = async (photoInfo) => {
    const newPhotoDB = new ModelPhoto(photoInfo);
    await newPhotoDB.save();
};

const deletePhoto = async (path) => {
    await ModelPhoto.deleteOne({ path });
    fs.unlink(path.toString(), (err) => {
        if (err) console.log(err);
    });
};

const findPath = async (photoID) => {
    const photoInfo = await ModelPhoto.findOne({ _id: photoID });
    return photoInfo.path;
};

const addToAlbum = async (req, res) => {
    const { photoID, albumID } = req.body;
    console.log(photoID);
    await ModelPhoto.updateOne({ _id: photoID }, { $set: { albumID } });
};

const checkOwner = async (req, res) => {
    const resultCheckOwner = await ModelPhoto.count({ _id: req.body.photoID, username: req.user.username });
    return resultCheckOwner !== 0;
};

const checkPhotoExist = async (photoID) => {
    const photoInfo = await ModelPhoto.count({ _id: photoID });
    return photoInfo;
};

const showPhoto = async (username) => {
    const showListPhoto = await ModelPhoto.find({ username });
    return showListPhoto;
};

const showPhotoInAlbum = async (username, albumID) => {
    const showListPhoto = await ModelPhoto.find({ username, albumID });
    console.log(showListPhoto);
    return showListPhoto;
};

module.exports = {
    uploadPhoto,
    uploadPhotoToDB,
    deletePhoto,
    addToAlbum,
    checkOwner,
    findPath,
    checkPhotoExist,
    showPhoto,
    showPhotoInAlbum,
};
