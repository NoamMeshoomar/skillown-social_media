const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const usersRoute = require('./routes/users');
const postsRoute = require('./routes/posts');
const notificiationsRoute = require('./routes/notifications');
const followersRoute = require('./routes/followers');

const app = express();

const beginURL = '/api';

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, () => console.log('Connected to MongoDB'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

app.use(cors());
app.use(helmet({
    contentSecurityPolicy: false,
}));

app.disable('x-powered-by');

app.use(beginURL + '/users', usersRoute);
app.use(beginURL + '/posts', postsRoute);
app.use(beginURL + '/notifications', notificiationsRoute);
app.use(beginURL + '/followers', followersRoute);

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => console.log(`Server is running on port ${ PORT }`));