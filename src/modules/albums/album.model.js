const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const dataSchema = new Schema(
    {
        id: { type: String, required: true },
        name: { type: String, required: true },
        desription: { type: String },
        status: { type: Boolean, required: true },
    },
    { timestamps: true }
);

const modelAlbum = mongoose.model('album', dataSchema);
module.exports = modelAlbum;
