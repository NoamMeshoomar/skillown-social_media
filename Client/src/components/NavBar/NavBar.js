import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Axios from '../../utils/Axios';
import { mediaBeginUrl } from '../../utils/MediaBeginUrl';
import { useSelector, useDispatch } from 'react-redux';
import { isLogged, currentUser } from '../../actions';

import NotificationsBell from './NotificationsBell/NotificationsBell';

import logo from '../../assets/images/logo.svg';
import loginIcon from '../../assets/icons/sign-in.svg';
import uploadIcon from '../../assets/icons/upload.svg';

import './NavBar.css';

const NavBar = () => {
    const [mouseHover, setMouseHover] = useState(false);

    const isLoggedBool = useSelector(state => state.isLogged);
    const currentUserObj = useSelector(state => state.user);

    const history = useHistory();

    const dispatch = useDispatch();

    useEffect(() => {
        if(localStorage.getItem('auth-token') === null) return;

        setTimeout(() => {
            Axios({
                method: 'GET',
                url: '/users/current-user',
                headers: {
                    'auth-token': localStorage.getItem('auth-token')
                }
            })
            .then(res => {            
                dispatch(currentUser(res.data.user));
                dispatch(isLogged(true));
            })
            .catch(() => {
                localStorage.removeItem('auth-token');
                dispatch(currentUser(null));
                dispatch(isLogged(false));
            });
        }, 200);
    }, [dispatch]);

    const logout = () => {
        localStorage.removeItem('auth-token');
        dispatch(currentUser(null));
        dispatch(isLogged(false));
        history.push('/signin');
    }

    return(
        <div className="NavBar">
            <Link to="/">
                <img className="logo" src={ logo } alt=""/>
            </Link>
            { !isLoggedBool ? <Link to="/signin">
                <img className="singin" width="25" src={ loginIcon } alt=""/>
            </Link> : <div className="right-links">
                <Link to="/upload" className="upload-btn">
                    <img src={ uploadIcon } width="32" alt=""/>
                </Link>
                <NotificationsBell />
                <div className="profile" onMouseEnter={ () => setMouseHover(true) } onMouseLeave={ () => setMouseHover(false) }>
                    <img src={ `${ mediaBeginUrl }/images/${ currentUserObj.image }` } width="45" height="45" alt=""/>
                    { mouseHover && <div className="user-menu">
                        <h3>{ currentUserObj.displayedUsername }</h3>
                        <div className="links">
                            <Link to="/settings">Settings</Link>
                            <Link to="/" onClick={ logout }>Logout</Link>
                        </div>
                    </div> }
                </div>
            </div> }
        </div>
    )
}

export default NavBar;