const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    image: { type: String, default: 'default-profile.jpg' },
    username: { type: String, unique: true, required: true },
    displayedUsername: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    description: { type: String, default: '' },
    followers: { type: Number, default: 0 },
    isNotificated: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    banned: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('users', usersSchema);