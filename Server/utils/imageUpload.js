const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${ __dirname }../../uploads/images`);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        
        cb(null, file.fieldname + '-' + shortid.generate() + '-' + Date.now() + ext);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 2 },
    fileFilter
});

module.exports = upload;