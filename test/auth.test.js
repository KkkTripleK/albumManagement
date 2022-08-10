const request = require('supertest');
const authService = require('../src/modules/authentication/auth.service');
const { ErrorHandling } = require('../src/errors/error-handling');
const { app } = require('../src/app');

jest.mock('../src/modules/authentication/auth.service');

afterAll(async () => {
    await app.close();
});

jest.setTimeout(20000);

describe('POST /login', () => {
    it('check login success', async () => {
        authService.checkActiveUser.mockResolvedValue();
        const response = await request(app).post('/login').send({
            username: 'khanhhoa12',
            password: '1232123',
        });
        expect(response.status).toBe(200);
        expect(response.body.accessToken).not.toBeNull();
    });

    it('check login fail: Your username not exist!', async () => {
        authService.checkActiveUser.mockRejectedValue({
            errorCode: 500,
            error: 'Your username not exist!!',
        });
        const response = await request(app).post('/login').send({
            username: 'khanhhoa12',
            password: '1232123',
        });
        expect(response.status).toBe(500);
    });
});
describe('POST /register', () => {
    it('check register successful', async () => {
        authService.userRegister.mockResolvedValue();
        const response = await request(app).post('/register').send({
            username: 'khanhhoa12',
            password: '1232123',
            email: 'nguyenkhanhhoapso@gmail.com',
        });
        expect(response.status).toBe(200);
    });

    it('check register failed: user already exist!', async () => {
        authService.userRegister.mockRejectedValue({
            errorCode: 500,
            error: 'User already EXSIT!',
        });
        const response = await request(app).post('/register').send({
            username: 'khanhhoa12',
            password: '1232123',
            email: 'nguyenkhanhhoapso@gmail.com',
        });
        expect(response.status).toBe(500);
    });

    it('check register failed!', async () => {
        authService.userRegister.mockRejectedValue({
            errorCode: 500,
            error: 'Create user FAILED',
        });
        const response = await request(app).post('/register').send({
            username: 'khanhhoa12',
            password: '1232123',
            email: 'nguyenkhanhhoapso@gmail.com',
        });
        expect(response.status).toBe(500);
    });
});
describe('POST /register/verify', () => {
    it('check verify register successful', async () => {
        authService.activeUser.mockResolvedValue();
        const response = await request(app).post('/register/verify').send({
            username: 'khanhhoa12',
            activeCode: '123451',
        });
        expect(response.status).toBe(200);
    });

    it('check verify register failed', async () => {
        authService.activeUser.mockRejectedValue(new ErrorHandling(500, 'Can not find your username!'));
        const response = await request(app).patch('/register/verify').send({
            username: 'khanhhoa12',
            activeCode: '1234510',
        });
        expect(response.status).toBe(500);
    });

    it('check active user successful', async () => {
        authService.activeUser.mockResolvedValue();
        const response = await request(app).post('/register/verify').send({
            username: 'khanhhoa12',
            activeCode: '123451',
        });
        expect(response.status).toBe(200);
    });
});
