// Tạo Schema user

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const dataSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 60,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 150,
        },
        name: { type: String },
        email: { type: String, required: false },
        dob: { type: Date },
        gender: { type: String },
        phone: { type: String, required: false },
        isActive: { type: String, required: true },
        activeCode: { type: String },
        jwt: { type: String, required: false },
    },
    { timestamps: true }
);

const userSchema = mongoose.model('User Table', dataSchema);
module.exports = userSchema;
