const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const dataSchema = new Schema(
    {
        filename: { type: String, required: true },
        username: { type: String, required: true },
        description: { type: String },
        path: { type: String, required: true },
        albumID: { type: String },
    },
    { timestamps: true }
);

const modelPhoto = mongoose.model('photo', dataSchema);
module.exports = modelPhoto;
