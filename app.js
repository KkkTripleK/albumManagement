require('dotenv').config({ path: './src/configs/.env' });
const express = require('express');

const app = express();
const { urlencoded } = require('express');
const { route } = require('./src/modules/authentication/auth.route');

const authService = require('./src/modules/authentication/auth.service');

app.listen(process.env.PORT, () => {
    console.log('Server is runing');
});
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(route);

// authService.verifyTokenExpired(
// eslint-disable-next-line max-len
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImhvYU5LIiwiaWF0IjoxNjU5MTUyMTIwLCJleHAiOjE2NTkxNTIxNDB9.QAUHuRjeNgD7_DTpWhp1693v5IqsJp843k8OmBHRUaw'
// );
