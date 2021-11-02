const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${ __dirname }../../uploads/videos`);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        
        cb(null, file.fieldname + '-' + shortid.generate() + '-' + Date.now() + ext);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'video/mp4' || file.mimetype === 'video/avi' || file.mimetype === 'video/mov' || file.mimetype === 'video/wmv') {
        cb(null, true);
    }

    cb(null, false);
}

const upload = multer({
    storage,
    limits: { fileSize: 8024 * 8024 * 2 },
    fileFilter
});

module.exports = upload;