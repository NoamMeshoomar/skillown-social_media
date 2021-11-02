import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Axios from '../../../../utils/Axios';

import { mediaBeginUrl } from '../../../../utils/MediaBeginUrl';

import loadingImage from '../../../../assets/images/loading.png';

import './TopSkillersUsers.css';

const TopSkillersUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Axios({
            method: 'GET',
            url: '/users/topskillers'
        })
        .then(res => {
            setUsers(res.data.users);
            setLoading(false);
        })
        .catch(err => console.log(err.response));
    }, []);
    
    return(
        <div className="TopSkillersUsers">
            { loading ? <img className="loading" src={ loadingImage } width="80" alt="" /> : <Fragment>
                { users === 0 ? <h1>No users found...</h1> : <div className="users">
                    { users.map(user => {
                        return(
                            <Link key={ user._id } to={ `/user/${ user.displayedUsername }` } className="user">
                                <img src={ `${ mediaBeginUrl }/images/${user.image}` } alt=""/>
                                <h1>{ user.displayedUsername }</h1>
                                <h3>{ user.followers } Followers</h3>
                            </Link>
                        )
                    }) }
                </div> }
            </Fragment> }
        </div>
    )
}

export default TopSkillersUsers;