const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
    id: { type: String, unique: true },
    video: { type: String, required: true, unique: true },
    thumbnail: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('posts', postsSchema);