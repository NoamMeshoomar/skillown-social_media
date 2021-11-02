import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import Axios from '../../../utils/Axios';

import Post from '../../Post/Post';

import navigateUpArrowIcon from '../../../assets/icons/navigate-up-arrow.svg';
import notFoundIcon from '../../../assets/icons/not-found.svg';
import loadingImage from '../../../assets/images/loading.png';

import './PaginationPosts.css';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(null);
    const [skip, setSkip] = useState(0);
    const [loading, setLoading] = useState(true);
    const [unmounted, setUnmounted] = useState(false);

    const limit = 3;

    const springProps = useSpring({ opacity: 1, transform: 'scale(1)', from: { opacity: 0, transform: 'scale(0.2)' } });

    useEffect(() => {
        setUnmounted(true);

        Axios({
            method: 'GET',
            url:`/posts?skip=${ skip }&limit=${ limit }`
        })
        .then(res => {
            setPosts(res.data.posts);
            setHasMore(res.data.has_more);
            setLoading(false);
        });

        return () => unmounted;
    }, [skip, unmounted]);

    const loadPrevPosts = () => {
        setSkip(skip - 3);
    }

    const loadNextPosts = () => {
        setSkip(skip + 3);
    }

    return(
        <div className="Posts">
            { loading ? <img className="loading" src={ loadingImage } width="120" alt="" /> : <Fragment>
                { posts.length === 0 && <animated.div style={ springProps }>
                    <div className="not-found">
                        <img src={ notFoundIcon } width="32px" alt=""/>
                        <h1>No posts found...</h1>
                    </div>
                </animated.div> }
                { skip === 0 ? null : <div onClick={ loadPrevPosts } className="navigate-up">
                    <img src={ navigateUpArrowIcon } width="18" alt=""/>
                </div> }
                <div className="posts-container">
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
                    { !hasMore ? null : <button className="navigate-down" onClick={ loadNextPosts }>Load More</button> }
                </div>
            </Fragment> }
        </div>
    )
}

export default Posts;