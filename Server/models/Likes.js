const mongoose = require('mongoose');

const LikesSchema = new mongoose.Schema({
    userId: { type: String, requried: true },
    postId: { type: String, required: true },
    isLiked: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('likes', LikesSchema);