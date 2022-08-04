const mongoose = require('mongoose');
const ModelAlbum = require('./album.model');
const userAlbumRepo = require('../users-albums/user-album.repository');
const ModelUserAlbum = require('../users-albums/user-album.model');

const checkExsitAlbum = async (req, res) => {
    const { nameAlbum } = req.body;
    const resultCount = await ModelAlbum.count({ nameAlbum });
    return resultCount !== 0;
};

const createAlbum = async (albumInfo) => {
    console.log('albumInfo');
    const newAlbum = new ModelAlbum(albumInfo);
    await newAlbum.save();
    return newAlbum;
};

const showAlbum = async (req, res) => {
    const { username } = req.body;
    const album = await ModelUserAlbum.find({ username }).populate({ path: 'albumID', model: ModelAlbum });
    album.forEach((item, index) => {
        console.log(`Number ${index}: ${item.albumID.nameAlbum} `);
    });
};

const updateAlbum = async (albumID, param) => {
    try {
        await ModelAlbum.updateOne({ albumID }, { $set: param });
    } catch (error) {
        console.log(error);
    }
};

const deleteAlbum = async (id) => {
    console.log({ id });
    try {
        await ModelAlbum.deleteOne({ id });
    } catch (error) {
        throw new Error(500, 'Can not delete your Album!');
    }
};

module.exports = {
    checkExsitAlbum,
    createAlbum,
    showAlbum,
    updateAlbum,
    deleteAlbum,
};
