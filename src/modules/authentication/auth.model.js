//Tạo model Schema

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dataSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    jwt: {
        type: String,
        required: false
    }
}, { timestamps: true });

const data_Schema = mongoose.model('new_collections', dataSchema);
module.exports = data_Schema;


