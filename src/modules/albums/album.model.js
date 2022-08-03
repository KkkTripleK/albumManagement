const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const dataSchema = new Schema(
    {
        nameAlbum: { type: String, required: true },
        description: { type: String, default: 'none' },
        privateAlbum: { type: Boolean, required: true, default: true },
    },
    { timestamps: true }
);

const modelAlbum = mongoose.model('album', dataSchema);
module.exports = modelAlbum;
