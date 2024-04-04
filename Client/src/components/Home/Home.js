import React from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { useSelector } from 'react-redux';

import UserProfile from './UserProfile/UserProfile';
import PaginationPosts from '../DisplayPostsTypes/PaginationPosts/PaginationPosts';
import TopSkillers from './TopSkillers/TopSkillers';

import signInIcon from '../../assets/icons/sign-in.svg';

import './Home.css';

const Home = () => {
    const springProps = useSpring({ transform: 'translateY(0)', opacity: 1, from: { transform: 'translateY(120px)', opacity: 0 } });
    
    const isLogged = useSelector(state => state.isLogged);

    return(
        <div className="Home">
            { !isLogged ? <animated.div className="sign-in" style={springProps}>
                    <div className="sign-in-text">
                        <img src={ signInIcon } width="25" alt=""/>
                        <h3>Sign in for more options</h3>
                    </div>
                    <Link className="sign-in-button" to="/signin">SIGN IN</Link>
            </animated.div> : <UserProfile /> }
            <PaginationPosts />
            <TopSkillers />
        </div>
    )
}

export default Home;