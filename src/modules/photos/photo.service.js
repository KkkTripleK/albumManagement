const multer = require('multer');
const photoRepo = require('./photo.repository');
const { ErrorHandling } = require('../../errors/error-handling');

const uploadPhoto = async (req, res) => {
    const { username } = req.user;
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
        throw new ErrorHandling(500, 'Upload photo Failed!');
    }
};

const checkOwner = async (req, res) => {
    try {
        const resultCheckOwner = photoRepo.checkOwner(req, res);
        if (!resultCheckOwner) {
            throw new ErrorHandling(500, 'You are not the Owner!');
        }
    } catch (error) {
        throw new ErrorHandling(500, 'Check owner Failed!');
    }
};

const deletePhoto = async (req, res) => {
    try {
        const path = await photoRepo.findPath(req.body.photoID);
        await photoRepo.deletePhoto(path);
        res.status(200).send('Delete photo Successful!');
    } catch (error) {
        console.log(error);
        throw new ErrorHandling(500, 'Delete photo Failed!');
    }
};

const addToAlbum = async (req, res) => {
    console.log(req.user);
    if (req.user.role === 'Author') {
        try {
            console.log(1);
            await photoRepo.addToAlbum(req, res);
        } catch (error) {
            throw new ErrorHandling(500, 'Add photo to album Failed!');
        }
    } else {
        throw new ErrorHandling(500, 'You do not have permission to add photo to album!');
    }
};

const checkPhotoExist = async (req, res) => {
    console.log(req.body);
    try {
        const resultCheckPhotoExsit = await photoRepo.checkPhotoExist(req.body.photoID);
        console.log(resultCheckPhotoExsit);
        if (resultCheckPhotoExsit === 0) {
            throw new ErrorHandling(500, 'Photo not exist!');
        }
    } catch (error) {
        console.log(error);
    }
};

const showPhoto = async (req, res) => {
    const listPhoto = await photoRepo.showPhoto(req.user.username);
    return listPhoto;
};

const showPhotoInAlbum = async (req, res) => {
    console.log(req.body);
    const listPhoto = await photoRepo.showPhotoInAlbum(req.user.username, req.body.albumID);
    return listPhoto;
};
module.exports = {
    uploadPhoto,
    deletePhoto,
    checkOwner,
    addToAlbum,
    checkPhotoExist,
    showPhoto,
    showPhotoInAlbum,
};
