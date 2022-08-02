const mongoose = require('mongoose');

mongoose
    .connect(process.env.dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('___Database is CONNECTED!'))
    .catch((err) => console.log(err));

module.exports = { mongoose };
