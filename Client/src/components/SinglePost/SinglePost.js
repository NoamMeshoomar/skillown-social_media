import React, { Fragment, useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import Axios from '../../utils/Axios';
import { mediaBeginUrl } from '../../utils/MediaBeginUrl';

// import VideoPlayer from '../VideoPlayer/VideoPlayer';
import Comments from './Comments/Comments';
import PostDetails from './PostDetails/PostDetails';
import PageNotFound from '../Errors/PageNotFound/PageNotFound';

import './SinglePost.css';

const SinglePost = ({ match }) => {
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    const postId = match.params.postId;

    useEffect(() => {
        Axios.get(`/posts/post/${ postId }`)
        .then(res => {
            setPost(res.data.post);
            setComments(res.data.comments);
        })
        .catch(err => console.log(err));
    }, [postId]);

    const springProps = useSpring({ opacity: 1, transform: 'translateX(0)', from: { opacity: 0, transform: 'translateX(-100px)' } });

    return(
        <Fragment>
            { post !== null ? <animated.div style={ springProps }>
                <div className="SinglePost">
                    {/* <VideoPlayer url={ post.video } /> */}
                    <video src={ post.video !== undefined ? `${ mediaBeginUrl }/videos/${ post.video }` : '' } style={{ backgroundColor: '#000' }} controls autoPlay="autoplay"></video>
                    <PostDetails id={ post.id } title={ post.title } description={ post.description } views={ post.views } likes={ post.likes } createdAt={ post.createdAt } user={ post.userId } />
                    <Comments postId={ post.id } comments={ comments } />
                </div>
            </animated.div> : <PageNotFound /> }
        </Fragment>
    )
}

export default SinglePost;