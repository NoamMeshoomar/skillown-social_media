const Notifications = require('../models/Notifications');

module.exports = {
    getNotifications: (req, res) => {
        Notifications.find({ authorId: req.user._id }).populate('userId', 'image displayedUsername')
        .then(notifications => res.status(200).json({ notifications }))
        .catch(err => res.status(400).json({ err }));
    },
    deleteReadNotifications: (req, res) => {
        Notifications.deleteMany({ authorId: req.user._id })
        .then(notifications => res.status(200).json({ notifications }))
        .catch(err => res.status(400).json({ err }));
    }
}