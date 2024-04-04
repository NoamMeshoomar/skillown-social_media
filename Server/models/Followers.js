const mongoose = require('mongoose');

const FollowersSchema = new mongoose.Schema({
    // The ID of the follower
    followerUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    // The ID of the user that the other user following him
    followedUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    isFollowing: { type: Boolean }
});

module.exports = mongoose.model('followers', FollowersSchema);