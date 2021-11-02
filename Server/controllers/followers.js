const Followers = require('../models/Followers');
const Users = require('../models/Users');

const { notification } = require('../utils/notifications');

module.exports = {
    checkFollowing: (req, res) => {
        if(req.user._id.toString() === req.params.id.toString()) return;
        
        Followers.findOne({ followerUserId: req.user._id, followedUserId: req.params.id })
        .then(follow => res.status(200).json({ isFollowing: follow.isFollowing }))
        .catch(() => res.status(400).json({ message: 'Failed to check if the user is following' }));
    },
    follow: async (req, res) => {
        if(req.user._id.toString() === req.params.id.toString()) return res.status(400).json({
            message: 'Cannot follow urself.'
        });

        const followExist = await Followers.findOne({ followerUserId: req.user._id, followedUserId: req.params.id });
    
        if(followExist !== null) {
            Followers.findOne({ followerUserId: req.user._id, followedUserId: req.params.id }, (err, doc) => {
                if(err) throw err;

                doc.isFollowing = !doc.isFollowing;

                doc.save();
            });

            followExist.isFollowing ? Users.findById(req.params.id, async (err, doc) => {
                if(err) throw err;
    
                doc.followers--;
    
                await doc.save();
    
                res.status(200).json({ isFollowing: false, followers: doc.followers });
            }) : Users.findById(req.params.id, async (err, doc) => {
                if(err) throw err;
    
                doc.followers++;
    
                await doc.save();
    
                res.status(200).json({ isFollowing: true, followers: doc.followers });
            });

            return;
        }

        const newFollower = new Followers({
            followerUserId: req.user._id,
            followedUserId: req.params.id,
            isFollowing: true
        });

        newFollower.save()
        .then(follow => {
            Users.findById(follow.followedUserId, (err, doc) => {
                if(err) throw err;

                doc.followers++;

                doc.save();

                return res.status(200).json({ isFollowing: follow.isFollowing, followers: doc.followers });
            });

            notification(follow.followedUserId, req.user._id, 'FOLLOW');
        });
    }
}