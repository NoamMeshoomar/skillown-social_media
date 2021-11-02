const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../models/Users');

const validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

module.exports = {
    register: async (req, res) => {
        const { username, email, password, confirmPassword } = req.body;

        const usernameExist = await Users.findOne({ username: username.toLowerCase() });
        const emailExist = await Users.findOne({ email: email.toLowerCase() });

        // Check if User with Username already exist
        if(usernameExist) return res.status(400).json({
            error: 'Username exist or not valid'
        });

        // Check if User with Email already exist
        if(emailExist) return res.status(400).json({
            error: 'Email exist or not valid'
        });

        // Check if username is not empty
        if(username.length === 0) return res.status(400).json({
            error: 'Username cannot be empty'
        });

        // Check if username is alphanumeric
        if(!username.match(/^[0-9a-zA-Z]+$/)) return res.status(400).json({
            error: 'Username can only contains Letters and Numbers'
        });

        // Check if username is 4-15 characters
        if(username.length < 4 || username.length > 15) return res.status(400).json({
            error: 'Username must be 4-15 characters'
        });

        // Validate the email format
        if(!validateEmail(email)) return res.status(400).json({
            error: 'Email must be valid'
        });
        
        // Check if password is not empty
        if(password.length === 0) return res.status(400).json({
            error: 'Password cannot be empty'
        });

        // Check if password length is 5-35 characters
        if(password.length < 5 || username.length > 35) return res.status(400).json({
            error: 'Password must be 5-35 characters'
        });

        // Check is password and confirmPassowrd is match
        if(password !== confirmPassword) return res.status(400).json({
            error: 'Passwords should be match'
        });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new Users({
            username: username.toLowerCase(),
            displayedUsername: username,
            email: email.toLowerCase(),
            password: hashedPassword
        });

        try {
            await newUser.save();

            res.status(200).json({
                message: 'Registered Successfully'
            });
        } catch (err) {
            res.status(400).json({ err });
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body;

        const user = await Users.findOne({ email: email.toLowerCase() });

        if(!user) return res.status(400).json({
            error: 'Email is not valid'
        });

        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword) return res.status(400).json({
            error: 'Password is not valid'
        });

        const token = jwt.sign({ _id: user._id }, 
            process.env.JWT_SECRET,
        { expiresIn: '12h' });

        Users.findById(user._id, 'displayedUsername image followers createdAt')
        .then(user => {
            res.status(200).header(token).json({
                token,
                user
            }); 
        })
        .catch(() => res.status(400).json({ error: 'Failed to Sign in' }));
    },
    getCurrentUser: (req, res) => {
        Users.findById(req.user._id, 'image displayedUsername email followers createdAt')
        .then(user => res.status(200).json({ user }))
        .catch(err => res.status(400).json({ err }));
    },
    getSingleUser: (req, res) => {
        Users.findOne({ username: req.params.userName.toLowerCase() }, 'image displayedUsername description followers createdAt')
        .then(user => {
            res.status(200).json({
                user
            });
        })
        .catch(err => { res.status(400).json({ err }) });
    },
    getTopSkillers: async (req, res) => {
        Users.find(null, 'image displayedUsername followers createdAt').sort('-followers').limit(3)
        .then(users => {
            res.status(200).json({
                users
            });
        })
        .catch(err => { res.status(400).json({ err }) })
    },
    updateImage: (req, res) => {
        if(req.file === undefined) {
            return res.status(400).json({ message: 'File type can only be JPEG/JPG/PNG' });
        }

        const { filename } = req.file;

        Users.findByIdAndUpdate(req.user._id, { image: filename }, { new: true })
        .then(user => {
            res.status(200).json({ 
                message: 'Profile image updated successfully',
                image: user.image
            });
        })
        .catch(() => res.status(400).json({ message: 'Failed to update the image' }));
    },
    updateDescription: (req, res) => {
        const { description } = req.body;

        if(description.length < 5 || description.length > 200) return res.status(400).json({ 
            message: 'Description must be 5-200 characters' 
        });

        Users.findByIdAndUpdate(req.user._id, { description }, { new: true })
        .then(() => res.status(200).json({ message: 'Description updated successfully' }))
        .catch(() => res.status(400).json({ message: 'Failed to update the description' }));
    }
}