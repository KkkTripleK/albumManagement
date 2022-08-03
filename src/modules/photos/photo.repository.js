const multer = require('multer');
const modelPhoto = require('./photo.model');

const uploadPhoto = async (req, res) => {
    //
};
const deletePhoto = async (req, res) => {
    //
};

const addToAlbum = async (req, res) => {
    //
};
module.exports = {
    uploadPhoto,
    deletePhoto,
    addToAlbum,
};

// const fileStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null,'./image');
//     },
//     filename: (req, file, cb) =>{
//         cb(null, Date.now() + '--' + file.originalname)
//     }
// });

// const upload = multer({ storage: fileStorage});
// app.post("/single", upload.single("image"), (req,res) => {
//     console.log(req.file);
//     res.send("Single file is uploaded");
// })
