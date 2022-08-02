const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const dataSchema = new Schema(
    {
        id: { type: String, required: true },
        name: { type: String, required: true },
        path: { type: String, required: true },
        description: { type: String },
    },
    { timestamps: true }
);

const modelPhoto = mongoose.model('photo', dataSchema);
module.exports = modelPhoto;
