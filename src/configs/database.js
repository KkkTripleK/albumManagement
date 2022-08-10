const mongoose = require('mongoose');

mongoose
    .connect(process.env.dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then()
    .catch((err) => console.log(err));

module.exports = { mongoose };
