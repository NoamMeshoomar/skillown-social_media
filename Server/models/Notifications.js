const mongoose = require('mongoose');

const notificationsSchema = new mongoose.Schema({
    authorId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' },
    reason: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('notifications', notificationsSchema);