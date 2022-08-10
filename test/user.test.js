const request = require('supertest');
const userService = require('../src/modules/users/user.service');
const authService = require('../src/modules/authentication/auth.service');
const helperMiddleware = require('../src/helpers/helper.middleware');
const { ErrorHandling } = require('../src/errors/error-handling');
const { app } = require('../src/app');

jest.mock('../src/modules/users/user.service');
jest.mock('../src/helpers/helper.middleware');
jest.mock('../src/modules/authentication/auth.service');

afterAll(async () => {
    await app.close();
});

jest.setTimeout(20000);

describe('GET /user/show-info', () => {
    it('show info', async () => {
        helperMiddleware.checkAccessToken.mockImplementation((req, res, next) => {
            next();
        });
        userService.showInfo.mockResolvedValue();
        const response = await request(app).get('/user/show-info').set({
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiZGV2MTdrIiwiaWF0IjoxNjU5NTM2ODk4LCJleHAiOjE2NTk2MjMyOTh9.AjAqgXFgqhSfA6aVLh5646NXn2dK9QVcue5y2TIwcyA',
        });
        expect(response.status).toBe(200);
    });

    it('show info failed', async () => {
        helperMiddleware.checkAccessToken.mockImplementation((req, res, next) => {
            next(error);
        });
        userService.showInfo.mockRejectedValue({
            errorCode: 500,
        });
        const response = await request(app).get('/user/show-info').set({
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiZGV2MTdrIiwiaWF0IjoxNjU5NTM2ODk4LCJleHAiOjE2NTk2MjMyOTh9.AjAqgXFgqhSfA6aVLh5646NXn2dK9QVcue5y2TIwcyA',
        });
        expect(response.status).toBe(500);
    });

    it('show info failed', async () => {
        helperMiddleware.checkAccessToken.mockImplementation((req, res, next) => {
            next();
        });
        userService.showInfo.mockImplementation((req, res, next) => {
            next(error);
        });
        const response = await request(app).get('/user/show-info').set({
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiZGV2MTdrIiwiaWF0IjoxNjU5NTM2ODk4LCJleHAiOjE2NTk2MjMyOTh9.AjAqgXFgqhSfA6aVLh5646NXn2dK9QVcue5y2TIwcyA',
        });
        expect(response.status).toBe(500);
    });
});

describe('PATCH /user/forgot-password', () => {
    it('forgot password success', async () => {
        userService.forgotPassword.mockResolvedValue();
        const response = await request(app).patch('/user/forgot-Password').send({
            username: 'hoaNK',
        });
        expect(response.status).toBe(200);
    });

    it('forgot password failed', async () => {
        userService.forgotPassword.mockRejectedValue({
            error: 500,
        });
        const response = await request(app).patch('/user/forgot-Password').send({
            username: 'hoaNK',
        });
        expect(response.status).toBe(500);
    });
});

describe('PATCH /user/forgot-password/verify', () => {
    it('verify forgot password successful', async () => {
        authService.verifyForgotPassword.mockResolvedValue();
        const response = await request(app).patch('/user/forgot-password/verify').send({
            username: 'hoaNK',
            activeCode: '120697',
        });
        expect(response.status).toBe(200);
    });

    it('verify forgot password failed', async () => {
        authService.verifyForgotPassword.mockRejectedValue({
            error: 500,
        });
        const response = await request(app).patch('/user/forgot-password/verify').send({
            username: 'hoaNK',
            activeCode: '120697',
        });
        expect(response.status).toBe(500);
    });
});

describe('PATCH /user/change-password', () => {
    it('change password successful', async () => {
        userService.changePassword.mockResolvedValue();
        const response = await request(app).patch('/user/change-password').send({
            password: '1232123',
            newpassword: '120697',
        });
        expect(response.status).toBe(200);
    });

    it('change password successful', async () => {
        userService.changePassword.mockRejectedValue({
            error: 500,
        });
        const response = await request(app).patch('/user/change-password').send({
            password: '1232123',
            newpassword: '120697',
        });
        expect(response.status).toBe(500);
    });
});

describe('PATCH /user/change-info', () => {
    it('change info successful', async () => {
        helperMiddleware.checkAccessToken.mockImplementation((req, res, next) => {
            next();
        });
        userService.changeInfo.mockResolvedValue();
        const response = await request(app).patch('/user/change-info').send({
            name: 'Hoa NK',
        });
        expect(response.status).toBe(200);
    });

    it('change info successful', async () => {
        helperMiddleware.checkAccessToken.mockImplementation((req, res, next) => {
            next(error);
        });
        userService.changeInfo.mockResolvedValue();
        const response = await request(app).patch('/user/change-info').send({
            name: 'Hoa NK',
        });
        expect(response.status).toBe(500);
    });

    it('change info successful', async () => {
        helperMiddleware.checkAccessToken.mockImplementation((req, res, next) => {
            next();
        });
        userService.changeInfo.mockImplementation((req, res, next) => {
            next(error);
        });
        const response = await request(app).patch('/user/change-info').send({
            name: 'Hoa NK',
        });
        expect(response.status).toBe(500);
    });
});
