const multer = require('multer');
const photoRepo = require('./photo.repository');
const { Error } = require('../../errors/error-handling');

const uploadPhoto = async (req, res) => {
    const { username } = req.body;
    const fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'src/assets/image');
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}--${file.originalname}`);
        },
    });

    const upload = multer({ storage: fileStorage }).single('image');
    try {
        upload(req, res, async (err) => {
            photoRepo.uploadPhoto(req, res);
            const filename = req.file.filename;
            const path = req.file.path;
            const photoInfo = {
                username,
                filename,
                path,
            };
            await photoRepo.uploadPhotoToDB(photoInfo);
        });
    } catch (error) {
        throw new Error(500, 'Upload photo Failed!');
    }
};

const deletePhoto = async (req, res) => {
    try {
        const path = await photoRepo.findPath(req.body.filename);
        await photoRepo.deletePhoto(path);
        res.status(200).send('Delete photo Successful!');
    } catch (error) {
        console.log(error);
        throw new Error(500, 'Delete photo Failed!');
    }
};

const addToAlbum = async (req, res) => {
    console.log(req.body);
    try {
        await photoRepo.addToAlbum(req, res);
    } catch (error) {
        throw new Error(500, 'Add photo to album Failed!');
    }
};

module.exports = {
    uploadPhoto,
    deletePhoto,
    addToAlbum,
};
