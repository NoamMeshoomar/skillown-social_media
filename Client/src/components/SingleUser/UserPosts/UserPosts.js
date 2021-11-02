import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import Axios from '../../../utils/Axios';
import { mediaBeginUrl } from '../../../utils/MediaBeginUrl';

import playIcon from '../../../assets/icons/play.svg';
import viewsIcon from '../../../assets/icons/eye.svg';
import likesIcon from '../../../assets/icons/like.svg';

import './UserPosts.css';

const UserPosts = ({ id, username }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if(id !== undefined) {
            Axios({
                method: 'GET',
                url: `/posts/userposts/${ id }`,
            })
            .then(res => setPosts(res.data))
            .catch(err => console.error(err));
        }
    }, [id]);

    const springProps = useSpring({ opacity: 1, transform: 'translateX(0)', from: { opacity: 0, transform: 'translateX(-120px)' } })

    return(
        <animated.div style={ springProps }>
            <div className="UserPosts">
                <h1>{ username }'s Posts</h1>
                <div className="posts">
                    { posts.map(post => {
                        return(
                            <Link key={ post._id } to={ `/post/${ post.id }` } className="post">
                                <div className="thumbnail">
                                    <img className="thumbnail-image" width="240" height="135" src={ `${ mediaBeginUrl }/thumbnails/${ post.thumbnail }` } alt="" />
                                    <img className="play-icon" src={ playIcon } width="72" alt=""/>
                                </div>
                                <div className="post-information">
                                    <h1>{ post.title.length >= 18 ? `${ post.title.slice(0, 18) }...` : post.title }</h1>
                                    <div className="post-details">
                                        <div className="views">
                                            <img src={ viewsIcon } alt=""/>
                                            <h3>{ post.views }</h3>
                                        </div>
                                        <div className="likes">
                                            <img src={ likesIcon } alt=""/>
                                            <h3>{ post.likes }</h3>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    }) }
                </div>
            </div>
        </animated.div>
    )
}

export default UserPosts;