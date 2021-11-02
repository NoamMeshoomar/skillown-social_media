const Notifications = require('../models/Notifications');

const notification = async (authorId, userId, reason) => {
    if(authorId.toString() === userId.toString()) {
        null;
    } else if(authorId !== userId) {
        const newNotification = new Notifications({
            authorId,
            userId,
            reason
        });
    
        await newNotification.save();
    }
}

module.exports = {
    notification
};