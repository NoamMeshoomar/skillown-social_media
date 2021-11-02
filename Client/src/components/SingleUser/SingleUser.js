import React, { Fragment, useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import Axios from '../../utils/Axios';

import RandomPosts from '../DisplayPostsTypes/RandomPosts/RandomPosts';
import UserProfile from './UserProfile/UserDetails';
import UserPosts from './UserPosts/UserPosts';
import PageNotFound from '../Errors/PageNotFound/PageNotFound';

import './SingleUser.css';

const SingleUser = (props) => {
    const [user, setUser] = useState({});

    const userName = props.match.params.userName;

    useEffect(() => {
        Axios.get(`/users/singleuser/${ userName }`)
        .then(res => setUser(res.data.user));
    }, [userName]);

    const springProps = useSpring({ opacity: 1, transform: 'translateY(0)', from: { opacity: 0, transform: 'translateY(-120px)' } });

    return(
        <Fragment>
            { user !== null ? <div className="user-page">
                <div className="SingleUser">
                    <animated.div style={ springProps }>
                        <UserProfile id={ user._id } image={ user.image } username={ user.displayedUsername } followers={ user.followers } />
                        <p className="user-description">{ user.description }</p>
                    </animated.div>
                    <UserPosts id={ user._id } username={ user.displayedUsername } />
                </div>
                <RandomPosts />
            </div> : <PageNotFound /> }
        </Fragment>
    )
}

export default SingleUser;