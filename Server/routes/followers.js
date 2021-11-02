const express = require('express');

const router = express.Router();

const auth = require('../utils/verifyToken');

const { follow, checkFollowing } = require('../controllers/followers');

router.get('/checkfollowing/:id', auth, checkFollowing);
router.post('/follow/:id', auth, follow);

module.exports = router;