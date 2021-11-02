import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import Axios from '../../../utils/Axios';
import { mediaBeginUrl } from '../../../utils/MediaBeginUrl';

import './UserProfile.css';

const UserProfile = () => {
    const [user, setUser] = useState({});

    const token = localStorage.getItem('auth-token');

    useEffect(() => {
        Axios({ 
            method: 'GET',
            url: '/users/current-user',
            headers: {
                'auth-token': token
            }
         })
         .then(res => setUser(res.data.user));
    }, [token]);

    const springProps = useSpring({ opacity: 1, transform: 'translateY(0)', from: { transform: 'translateY(120px)', opacity: 0 } })

    return(
        <animated.div style={ springProps }>
            <div className="UserProfile">
                <img src={ user.image !== undefined ? `${ mediaBeginUrl }/images/${ user.image }` : '' } alt=""/>
                <h1>{ user.displayedUsername }</h1>
                <h3>Created in <span>{ new Intl.DateTimeFormat('en-US').format(user.date) }</span></h3>
                <Link to="/settings">Account Settings</Link>
            </div>
        </animated.div>
    )
}

export default UserProfile;