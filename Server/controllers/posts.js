const shortid = require('shortid');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;

ffmpeg.setFfmpegPath(ffmpegPath);

const Posts = require('../models/Posts');
const Likes = require('../models/Likes');
const Comments = require('../models/Comments');

const { notification } = require('../utils/notifications');

module.exports = {
    getAllPosts: async (req, res) => {
        const postsLength = (await Posts.find()).length;

        let { skip, limit } = req.query;

        skip = Number(skip);
        limit = Number(limit)

        !skip ? skip = 0 : skip;
        !limit ? limit = 0 : limit;

        skip === NaN ? skip = 0 : null;
        limit === NaN ? limit = 0 : null;

        skip < 0 ? skip = 0 : null;
        limit < 0 ? limit = 0 : null;

        skip > 50 ? skip = 50 : null;
        limit > 50 ? limit = 50 : null;

        Posts.find().populate('userId', 'image displayedUsername followers createdAt').skip(skip).limit(limit).sort('-createdAt').then(posts => {
            res.status(200).json({
                posts,
                has_more: limit + skip >= postsLength ? false : true
            });
        })
        .catch(err => {
            res.status(400).json({ err });
        });
    },
    getSinglePost: async (req, res) => {
        const postId = req.params.postId;

        const post = await Posts.findOne({ id: postId }).populate('userId', 'image displayedUsername followers date');
        const comments = await Comments.find({ postId }).populate('userId', 'image displayedUsername date');

        try {
            res.status(200).json({
                post,
                comments
            });
        } catch (err) {
            res.status(400).json({ err });
        }
    },
    getSpecificUserPost: (req, res) => {
        Posts.find({ userId: req.params.id }).populate('userId', 'displayedUsername')
        .then(posts => res.status(200).json(posts))
        .catch(() => res.status(400).json({ error: 'Failed to load the posts.' }));
    },
    getRandomPosts: async (req, res) => {
        const postsLength = (await Posts.find()).length;

        const randomNumber = Math.floor(Math.random() * postsLength);

        Posts.find().populate('userId').skip(randomNumber).limit(3)
        .then(posts => res.status(200).json(posts))
        .catch(() => res.status(400).json({ error: 'Failed to load the posts.' }));
    },
    createPost: async (req, res) => {
        const { title, description } = req.body;

        if(!req.file) return res.status(400).json({
            error: 'Video field is requried'
        });

        const video = req.file.filename;
        const userId = req.user._id;

        const thumbnailFileName = `thumbnail-${ shortid.generate() + Date.now() }.jpg`;

        if(title.length < 5 || title.length > 50) return res.status(400).json({
            error: 'Title must be 5-50 characters'
        });

        if(description.length < 3 || description.length > 200) return res.status(400).json({
            error: 'Description must be 3-200 characters'
        });

        ffmpeg({ source: `uploads/videos/${ req.file.filename }` })
        .takeScreenshots({
            filename: thumbnailFileName,
            folder: 'uploads/thumbnails',
            timemarks: [5]
        }, '.');

        const newPost = new Posts({
            id: shortid.generate(),
            video,
            thumbnail: thumbnailFileName,
            title,
            description,
            userId
        });

        try {
            await newPost.save();

            res.status(200).json({ message: 'Post Created Successfully' });
        } catch (err) {
           res.status(400).json({ err })
        }
    },
    createComment: async (req, res) => {
        const postId = req.params.postId;
        const userId = req.user._id;

        const post = await Posts.findOne({ id: postId });

        const { comment } = req.body;

        if(!post) return res.status(404).json({
            message: 'Post Not Found'
        });

        const newComment = new Comments({
            postId,
            userId,
            comment
        });

        newComment.save()
        .then(comment => {
            Comments.findOne({ _id: comment._id }).populate('userId', 'image displayedUsername')
            .then(comment => {
                res.status(200).json(comment);
                notification(post.userId, userId, 'COMMENT');
            });
        })
        .catch(err => {
            res.status(400).json({ err });
        });
    },
    deletePost: async (req, res) => {
        const postId = req.params.postId;
        const userId = req.user._id;

        const post = await Posts.findOne({ id: postId });

        if(!post) return res.status(404).json({
            message: 'Post Not Found'
        });

        if(userId !== post.userId.toString()) return res.status(400).json({
            message: 'Failed To Delete The Post'
        });

        Posts.findOneAndDelete({ id: postId })
        .then(() => {
            res.status(200).json({
                message: 'Post Deleted'
            });
        })
        .catch(err => {
            res.status(400).json({ err });
        });
    },
    addView: (req, res) => {
        Posts.findOneAndUpdate({ id: req.params.id }, { $inc: { views: 1 } }, { new: true })
        .then(doc => res.status(200).json(doc.views))
        .catch(err => res.status(400).json({ err }));
    },
    addLike: async (req, res) => {
        const { _id } = req.user;
        const { id } = req.params;

        const likeExist = await Likes.findOne({ userId: _id, postId: id  });

        const addLike = new Likes({
            userId: _id,
            postId: id,
            isLiked: true
        });

        if(!likeExist) {
            await addLike.save();

            await Posts.findOneAndUpdate({ id }, { $inc: { likes: 1 } }, { new: true })
            .then(post => {
                res.status(200).json(post.likes);

                notification(post.userId, _id, 'LIKE');
            });
        } else if(likeExist) {
            Likes.findOne({ userId: _id, postId: id }, async (err, doc) => {
                if(err) res.status(400).json({
                    error: 'Failed to like the post'
                });

                doc.isLiked = !doc.isLiked;

                likeExist.isLiked ? Posts.findOne({ id }, async (err, doc) => {
                    if(err) throw err;

                    doc.likes--;
                    await doc.save();

                    res.status(200).json(doc.likes);
                }) : Posts.findOne({ id }, async (err, doc) => {
                    if(err) throw err;

                    doc.likes++;
                    await doc.save();

                    res.status(200).json(doc.likes);
                });

                await doc.save();
            });
        }
    }
}