require('dotenv').config({ path: './src/configs/.env' });
const express = require('express');

const app = express();
const { urlencoded } = require('express');
const { authRoute } = require('./modules/authentication/auth.route');
const { userRoute } = require('./modules/users/user.route');
const { photoRoute } = require('./modules/photos/photo.route');
const { albumRoute } = require('./modules/albums/album.route');
const { userAlbumRoute } = require('./modules/users-albums/user-album.route');
const { moongose } = require('./configs/database');
const helperJWT = require('./helpers/helper.jwt');

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(authRoute);
app.use(userRoute);
app.use(photoRoute);
app.use(albumRoute);
app.use(userAlbumRoute);

app.use((err, req, res, next) => {
    res.status(err.errorCode).json({ details: err.errorMessage });
});

app.listen(process.env.PORT, () => {
    console.log('___Server is RUNING!');
});
