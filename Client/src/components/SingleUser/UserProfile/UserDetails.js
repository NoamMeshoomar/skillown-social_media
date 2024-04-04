import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Axios from '../../../utils/Axios';
import { mediaBeginUrl } from '../../../utils/MediaBeginUrl';

import './UserDetails.css';

const UserDetails = ({ id, image, username, followers }) => {
    const [followersNum, setFollowersNum] = useState(null);
    const [isFollow, setIsFollow] = useState(null);
    const [authUserId, setAuthUserId] = useState(null);

    const isLogged = useSelector(state => state.isLogged);
    const history = useHistory();

    useEffect(() => {
        if(!isLogged) return;

        if(id !== undefined) {
            Axios({
                method: 'GET',
                url: `/followers/checkfollowing/${ id }`,
                headers: {
                    'auth-token': localStorage.getItem('auth-token')
                }
            })
            .then(res => setIsFollow(Boolean(res.data.isFollowing)))
            .catch(err => console.error(err));
        }

        Axios({
            method: 'GET',
            url: '/users/current-user',
            headers: {
                'auth-token': localStorage.getItem('auth-token')
            }
        })
        .then(res => {
            setAuthUserId(res.data.user._id);
        });
    }, [isLogged, id]);

    const handleFollowing = () => {
        if(!isLogged) return history.push('/signin');

        Axios({
            method: 'POST',
            url: `/followers/follow/${ id }`,
            headers: {
                'auth-token': localStorage.getItem('auth-token')
            }
        })
        .then(res => {
            setIsFollow(res.data.isFollowing);
            setFollowersNum(res.data.followers);
        })
        .catch(err => console.error(err.response));
    }

    return(
        <div className="UserDetails">
            <div className="user">
                <img src={ image !== undefined ? `${ mediaBeginUrl }/images/${ image }` : '' } alt=""/>
                <div className="user-details">
                    <h1>{ username }</h1>
                    <h3>{ followersNum !== null ? followersNum : followers } Followers</h3>
                </div>
            </div>
            { authUserId !== id && <button className="follow-btn" style={ isFollow ? { border: '2px solid var(--defaultGreen)', backgroundColor: 'transparent', color: 'var(--defaultGreen)' } : {} } onClick={ handleFollowing }>{ isFollow ? 'Unfollow' : 'Follow' }</button> }
        </div>
    )
}

export default UserDetails;