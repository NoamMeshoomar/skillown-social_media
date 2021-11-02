const express = require('express');

const router = express.Router();

const auth = require('../utils/verifyToken');

const {
    getNotifications,
    deleteReadNotifications
} = require('../controllers/notifications');

router.get('/', auth, getNotifications);
router.delete('/', auth, deleteReadNotifications);

module.exports = router;