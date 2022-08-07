require('dotenv').config({ path: './src/configs/.env' });
const express = require('express');

const app = express();
const { urlencoded } = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const YAML = require('yamljs');
const { authRoute } = require('./modules/authentication/auth.route');
const { userRoute } = require('./modules/users/user.route');
const { photoRoute } = require('./modules/photos/photo.route');
const { albumRoute } = require('./modules/albums/album.route');
const { userAlbumRoute } = require('./modules/users-albums/user-album.route');
const { moongose } = require('./configs/database');
const helperJWT = require('./helpers/helper.jwt');

const swaggerDocument = YAML.load('swagger-config.yaml');

// const options = {
//     definition: {
//         openapi: '3.0.0',
//         info: {
//             title: 'Album Management',
//             version: '1.0.0',
//             description: 'Swagger',
//         },
//         servers: [
//             {
//                 url: 'http://localhost:8080',
//             },
//         ],
//     },
//     apis: ['./src/modules/users/*js'],
// };

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(authRoute);
app.use(userRoute);
app.use(photoRoute);
app.use(albumRoute);
app.use(userAlbumRoute);
// const specs = swaggerJsDoc(options);
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use((err, req, res, next) => {
    res.status(err.errorCode).json({ details: err.errorMessage });
});

app.listen(process.env.PORT, () => {
    console.log('___Server is RUNING!');
});
