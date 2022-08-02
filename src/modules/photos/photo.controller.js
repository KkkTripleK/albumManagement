const photoService = require('./photo.service');

const uploadPhoto = (req, res, next) => {
    res.send('hello');
};

const deletePhoto = (req, res, next) => {
    //
};

module.exports = {
    uploadPhoto,
    deletePhoto,
};
