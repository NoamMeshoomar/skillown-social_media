const mongoose = require('mongoose');

const commentsSchema = mongoose.Schema({
    postId: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' },
    comment: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('comments', commentsSchema);