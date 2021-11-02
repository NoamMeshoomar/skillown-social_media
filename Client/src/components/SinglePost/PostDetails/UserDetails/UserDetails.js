import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Axios from '../../../../utils/Axios';
import { mediaBeginUrl } from '../../../../utils/MediaBeginUrl';

import './UserDetails.css';

const UserDetails = ({ user }) => {
    // Updated Followers Number
    const [followers, setFollowers] = useState(null);
    const [isFollow, setIsFollow] = useState(null);
    const [authUserId, setAuthUserId] = useState(null);

    const isLogged = useSelector(state => state.isLogged);
    const history = useHistory();

    useEffect(() => {
        if(!isLogged) return;

        if(user._id !== undefined) {
            Axios({
                method: 'GET',
                url: `/followers/checkfollowing/${ user._id }`,
                headers: {
                    'auth-token': localStorage.getItem('auth-token')
                }
            })
            .then(res => setIsFollow(res.data.isFollowing));
        }

        Axios({
            method: 'GET',
            url: '/users/current-user',
            headers: {
                'auth-token': localStorage.getItem('auth-token')
            }
        })
        .then(res => setAuthUserId(res.data.user._id));
    }, [isLogged, user._id]);

    const handleFollowing = () => {
        if(!isLogged) return history.push('/signin');

        Axios({
            method: 'POST',
            url: `/followers/follow/${ user._id }`,
            headers: {
                'auth-token': localStorage.getItem('auth-token')
            }
        })
        .then(res => {
            setIsFollow(res.data.isFollowing);
            setFollowers(res.data.followers);
        })
        .catch(err => console.error(err.response));
    }

    return(
        <div className="UserDetails">
            <div className="user-information">
                <Link to={ `/user/${ user.displayedUsername }` }>
                    <img src={ user.image !== undefined ? `${ mediaBeginUrl }/images/${ user.image }` : '' } width="62" height="62" alt="" />
                </Link>
                <div className="details">
                    <Link to={ `/user/${ user.displayedUsername }` }>
                        <h2>{ user.displayedUsername }</h2>
                    </Link>
                    <h3>{ followers !== null ? followers : user.followers } Followers</h3>
                </div>
            </div>
            { authUserId !== user._id && <button className="follow-btn" style={ isFollow ? { border: '2px solid var(--defaultGreen)', backgroundColor: 'transparent', color: 'var(--defaultGreen)' } : {} } onClick={ handleFollowing }>{ isFollow ? 'Unfollow' : 'Follow' }</button> }
        </div>
    )
}

export default UserDetails;