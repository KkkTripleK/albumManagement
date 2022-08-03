const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const dataSchema = new Schema(
    {
        username: { type: String, required: true },
        albumID: { type: String, required: true },
        role: { type: String, required: true, default: 'Author' },
    },
    { timestamps: true }
);

const modelUserAlbum = mongoose.model('users-album', dataSchema);
module.exports = modelUserAlbum;
