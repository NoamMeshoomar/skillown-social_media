import React from 'react';
import { useSpring, animated } from 'react-spring';
import { mediaBeginUrl } from '../../utils/MediaBeginUrl';

import playIcon from '../../assets/icons/play.svg';
import viewsIcon from '../../assets/icons/eye.svg';
import likesIcon from '../../assets/icons/like.svg';

import './Post.css';

const Post = ({ thumbnail, title, views, likes, userImage, userName, userFollowers }) => {
    const springProps = useSpring({ opacity: 1, transform: 'scale(1)', from: { opacity: 0, transform: 'scale(0.2)' } });

    return(
        <animated.div style={ springProps }>
            <div className="Post">
                <div className="thumbnail">
                    <img className="thumbnail-image" width="230" height="135" src={ `${ mediaBeginUrl }/thumbnails/${ thumbnail }` } alt="" />
                    <img className="play-icon" src={ playIcon } width="72" alt=""/>
                </div>
                <div className="post-information">
                    <div className="user-post">
                        <img src={ `${ mediaBeginUrl }/images/${ userImage }` } alt=""/>
                        <div className="user-information">
                            <h3>{ userName }</h3>
                            <p>{ userFollowers } Followers</p>
                        </div>
                    </div>
                    <h1>{ title.length >= 18 ? `${ title.slice(0, 18) }...` : title }</h1>
                    <div className="post-details">
                        <div className="views">
                            <img src={ viewsIcon } alt=""/>
                            <h3>{ views }</h3>
                        </div>
                        <div className="likes">
                            <img src={ likesIcon } alt=""/>
                            <h3>{ likes }</h3>
                        </div>
                    </div>
                </div>
            </div>
        </animated.div>
    )
}

export default Post;