// Tạo Schema user

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const dataSchema = new Schema(
    {
        id: { type: Object, required: true },
        username: { type: String, required: true },
        password: { type: String, required: true },
        name: { type: String },
        email: { type: String, required: true },
        dob: { type: Date },
        gender: { type: String },
        phone: { type: String, required: true },
        isActive: { type: String, required: true },
        activeCode: { type: String },
        jwt: { type: String, required: false },
    },
    { timestamps: true }
);

const modelUser = mongoose.model('new_collections', dataSchema);
module.exports = modelUser;
