const request = require('supertest');
const { ErrorHandling } = require('../src/errors/error-handling');
const { app } = require('../src/app');
const helperMiddleware = require('../src/helpers/helper.middleware');
const userAlbumService = require('../src/modules/users-albums/user-album.service');

jest.mock('../src/helpers/helper.middleware');
jest.mock('../src/modules/users-albums/user-album.service');

afterAll(async () => {
    await app.close();
});

describe('POST /album/invite', () => {
    it('invite user to album successful', async () => {
        helperMiddleware.checkAccessToken.mockImplementation((req, res, next) => {
            next();
        });
        userAlbumService.inviteToAlbum.mockResolvedValue();
        const response = await request(app).post('/album/invite').send({
            invitee: 'hoak12',
            albumID: 'River - v1',
        });
        expect(response.status).toBe(200);
    });

    it('invite user to album failed', async () => {
        helperMiddleware.checkAccessToken.mockImplementation((req, res, next) => {
            next();
        });
        userAlbumService.inviteToAlbum.mockRejectedValue({
            errorCode: 500,
        });
        const response = await request(app).post('/album/invite').send({
            invitee: 'hoak12',
            albumID: 'River - v1',
        });
        expect(response.status).toBe(500);
    });
});

describe('DELETE /album/remove', () => {
    it('remove user from album successful', async () => {
        helperMiddleware.checkAccessToken.mockImplementation((req, res, next) => {
            next();
        });
        userAlbumService.removeUserFromAlbum.mockResolvedValue();
        const response = await request(app).delete('/album/remove').send({
            removeID: 'hoak12',
            albumID: 'River - v1',
        });
        expect(response.status).toBe(200);
    });

    it('remove user from album failed', async () => {
        helperMiddleware.checkAccessToken.mockImplementation((req, res, next) => {
            next();
        });
        userAlbumService.removeUserFromAlbum.mockRejectedValue({
            errorCode: 500,
        });
        const response = await request(app).delete('/album/remove').send({
            removeID: 'hoak12',
            albumID: 'River - v1',
        });
        expect(response.status).toBe(500);
    });
});
