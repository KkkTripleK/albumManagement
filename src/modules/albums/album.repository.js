const mongoose = require('mongoose');
const ModelAlbum = require('./album.model');
// const userAlbumRepo = require('../users-albums/user-album.repository');
const ModelUserAlbum = require('../users-albums/user-album.model');

const checkAlbumExsit = async (albumID) => {
    const resultCount = await ModelAlbum.count({ _id: albumID });
    // console.log(resultCount);
    return resultCount !== 0;
};

const createAlbum = async (albumInfo) => {
    const newAlbum = new ModelAlbum(albumInfo);
    await newAlbum.save();
    return newAlbum;
};

const showAlbum = async (username) => {
    const album = await ModelUserAlbum.find({ username }).populate({ path: 'albumID', model: ModelAlbum });
    const obj = [];
    album.forEach((item, index) => {
        obj[index] = item.albumID;
    });
    return obj;
};

const updateAlbum = async (albumID, param) => {
    await ModelAlbum.updateOne({ _id: albumID }, { $set: param });
};

const deleteAlbum = async (albumID) => {
    await ModelAlbum.deleteOne({ _id: albumID });
};

module.exports = {
    checkAlbumExsit,
    createAlbum,
    showAlbum,
    updateAlbum,
    deleteAlbum,
};
