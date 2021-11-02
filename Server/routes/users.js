const express = require('express');

const { 
    register, 
    login,
    getCurrentUser,
    getSingleUser, 
    getTopSkillers,
    updateImage,
    updateDescription
} = require('../controllers/users');

const auth = require('../utils/verifyToken');

const upload = require('../utils/imageUpload');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/current-user', auth, getCurrentUser);
router.get('/singleuser/:userName', getSingleUser);
router.get('/topskillers', getTopSkillers);
router.put('/updateimage', auth, upload.single('file'), updateImage);
router.put('/updatedescription', auth, updateDescription);

module.exports = router;