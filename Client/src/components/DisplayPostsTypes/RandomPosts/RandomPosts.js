import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import Axios from '../../../utils/Axios';

import Post from '../../Post/Post';

import './RandomPosts.css';

const RandomPosts = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        Axios({
            method: 'GET',
            url: '/posts/random'
        })
        .then(res => setPosts(res.data))
        .catch(err => console.error(err));
    }, []);

    const springProps = useSpring({ opacity: 1, transform: 'translateX(0)', from: { opacity: 0, transform: 'translateX(-120px)' } })

    return(
        <div className="RandomPosts">
            <animated.div style={ springProps }>
                <h1>Random Posts</h1>
            </animated.div>
            <div className="posts">
                { posts.map(post => {
                    return(
                        <Link key={ post._id } to={ `/post/${ post.id }` }>
                            <Post 
                                thumbnail={ post.thumbnail }
                                title={ post.title }
                                views={ post.views } 
                                likes={ post.likes }
                                date={ post.date }
                                userImage={ post.userId.image }
                                userName={ post.userId.displayedUsername }
                                userFollowers={ post.userId.followers }
                            />
                        </Link>
                    )
                }) }
            </div>
        </div>
    )
}

export default RandomPosts;