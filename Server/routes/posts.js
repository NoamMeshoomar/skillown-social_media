const express = require('express');

const { 
    getAllPosts,
    getSinglePost,
    getSpecificUserPost,
    getRandomPosts,
    createPost, 
    createComment,
    deletePost,
    addView,
    addLike
} = require('../controllers/posts');

const auth = require('../utils/verifyToken');

const upload = require('../utils/videoUpload');

const router = express.Router();

router.get('/', getAllPosts);
router.get('/post/:postId', getSinglePost);
router.get('/userposts/:id', getSpecificUserPost);
router.get('/random', getRandomPosts);
router.post('/', auth, upload.single('video'), createPost);
router.post('/comment/:postId', auth, createComment);
router.delete('/:postId', auth, deletePost);
router.put('/view/:id', addView);
router.put('/like/:id', auth, addLike);

module.exports = router;