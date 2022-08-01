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
        isActive: { type: Boolean, required: true, default: false },
        activeCode: { type: String, default: '0000' },
        jwt: { type: String, required: false },
    },
    { timestamps: true }
);

const userSchema = mongoose.model('User', dataSchema);
module.exports = userSchema;
