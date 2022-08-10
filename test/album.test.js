const request = require('supertest');
const { response } = require('express');
const albumService = require('../src/modules/albums/album.service');
const helperMiddleware = require('../src/helpers/helper.middleware');
const { ErrorHandling } = require('../src/errors/error-handling');
const userAlbumService = require('../src/modules/users-albums/user-album.service');
const { app } = require('../src/app');

jest.mock('../src/modules/albums/album.service');
jest.mock('../src/helpers/helper.middleware');
jest.mock('../src/modules/users-albums/user-album.service');

afterAll(async () => {
    await app.close();
});

jest.setTimeout(5000);

describe('POST /album/create', () => {
    it('create album successful', async () => {
        helperMiddleware.checkAccessToken.mockImplementation((req, res, next) => {
            next();
        });
        albumService.createNewAlbum.mockResolvedValue();
        userAlbumService.createUserAlbum.mockResolvedValue();
        const response = await request(app).post('/album/create').set({
            nameAlbum: 'river-1',
        });
        expect(response.status).toBe(200);
    });

    it('create album failed', async () => {
        helperMiddleware.checkAccessToken.mockImplementation((req, res, next) => {
            next(error);
        });
        const response = await request(app).post('/album/create').set({
            nameAlbum: 'river-1',
        });
        expect(response.status).toBe(500);
    });

    it('create album failed', async () => {
        helperMiddleware.checkAccessToken.mockImplementation((req, res, next) => {
            next();
        });
        albumService.createNewAlbum.mockRejectedValue({
            errorCode: 500,
        });
        userAlbumService.createUserAlbum.mockResolvedValue();
        const response = await request(app).post('/album/create').set({
            nameAlbum: 'river-1',
        });
        expect(response.status).toBe(500);
    });
});

describe('GET /album/show', () => {
    it('show album success', async () => {
        helperMiddleware.checkAccessToken.mockImplementation((req, res, next) => {
            next();
        });
        albumService.showAlbum.mockResolvedValue();
        const response = await request(app).get('/album/show').set({
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiZGV2MTdrIiwiaWF0IjoxNjU5NTM2ODk4LCJleHAiOjE2NTk2MjMyOTh9.AjAqgXFgqhSfA6aVLh5646NXn2dK9QVcue5y2TIwcyA',
        });
        expect(response.status).toBe(200);
    });

    it('show album failed', async () => {
        helperMiddleware.checkAccessToken.mockImplementation((req, res, next) => {
            next();
        });
        albumService.showAlbum.mockRejectedValue({
            errorCode: 500,
        });
        const response = await request(app).get('/album/show').set({
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiZGV2MTdrIiwiaWF0IjoxNjU5NTM2ODk4LCJleHAiOjE2NTk2MjMyOTh9.AjAqgXFgqhSfA6aVLh5646NXn2dK9QVcue5y2TIwcyA',
        });
        expect(response.status).toBe(500);
    });
});

describe('PATH /album/update', () => {
    it('update album success', async () => {
        helperMiddleware.checkAccessToken.mockImplementation((req, res, next) => {
            next();
        });
        albumService.checkAuthor.mockResolvedValue();
        albumService.updateAlbum.mockResolvedValue();
        const response = await request(app).patch('/album/update').send({
            albumID: 'ajskdn123',
            description: 'Mountain -v1',
        });
        expect(response.status).toBe(200);
    });

    it('update album failed', async () => {
        helperMiddleware.checkAccessToken.mockImplementation((req, res, next) => {
            next();
        });
        albumService.checkAuthor.mockResolvedValue();
        albumService.updateAlbum.mockRejectedValue({
            errorCode: 500,
        });
        const response = await request(app).patch('/album/update').send({
            albumID: 'ajskdn123',
            description: 'Mountain -v1',
        });
        expect(response.status).toBe(500);
    });
});

describe('DELETE /album/delete', () => {
    it('delete album successful', async () => {
        helperMiddleware.checkAccessToken.mockImplementation((req, res, next) => {
            next();
        });
        albumService.checkAlbumExsit.mockResolvedValue();
        albumService.checkAuthor.mockImplementation((req, res) => {
            req.user = { role: 'Author' };
        });
        albumService.deleteAlbum.mockResolvedValue();
        userAlbumService.deleteUserAlbum.mockResolvedValue();
        const response = await request(app).delete('/album/delete').send({
            albumID: '123123',
        });
        expect(response.status).toBe(200);
    });

    it('delete album failed', async () => {
        helperMiddleware.checkAccessToken.mockImplementation((req, res, next) => {
            next();
        });
        albumService.checkAlbumExsit.mockRejectedValue({
            errorCode: 500,
        });
        const response = await request(app).delete('/album/delete').send({
            albumID: '123123',
        });
        expect(response.status).toBe(500);
    });

    it('delete album failed', async () => {
        helperMiddleware.checkAccessToken.mockImplementation((req, res, next) => {
            next();
        });
        albumService.checkAlbumExsit.mockRejectedValue(new ErrorHandling(500, 'Delete album failed!'));
        const response = await request(app).delete('/album/delete').send({
            albumID: '123123',
        });
        expect(response.status).toBe(500);
    });
});
