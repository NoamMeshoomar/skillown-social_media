import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from '../../../utils/Axios';
import { mediaBeginUrl } from '../../../utils/MediaBeginUrl';

import bellIcon from '../../../assets/icons/bell.svg';

import './NotificationsBell.css';

const NotificationsBell = () => {
    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);
    const [readed, setReaded] = useState(false);

    const token = localStorage.getItem('auth-token');

    useEffect(() => {
        Axios({
            method: 'GET',
            url: '/notifications',
            headers: {
                'auth-token': token
            }
        })
        .then(res => setNotifications(res.data.notifications));
    }, [token]);

    const handleReadNotifications = () => {
        Axios({
            method: 'DELETE',
            url: '/notifications',
            headers: {
                'auth-token': token
            }
        })
        .then(() => setReaded(true));
    }

    return(
        <div className="NotificationsBell">
            <div className="bell" onClick={ handleReadNotifications }>
                { (notifications.length !== 0) && !readed && <div className="bell-circle">
                    <h3>{ notifications.length }</h3>
                </div> }
                <img src={ bellIcon } width="28" onClick={ () => setOpen(!open) } alt=""/>
            </div>
            { open && <div className="bell-menu">
                <h3 className="close-btn" onClick={ () => setOpen(false) }>x</h3>
                <h1>Notifications</h1>
                { notifications.length === 0 ? <h3 className="no-notifications">No new notifications...</h3> : <div className="notifications">
                    { [...notifications].reverse().map(notification => {
                        return(
                            <div className="notification" key={ notification._id }>
                                <Link to={ `/user/${ notification.userId.displayedUsername }` }>
                                    <img src={ `${ mediaBeginUrl }/images/${ notification.userId.image }` } width="55" alt=""/>
                                </Link>
                                <div className="notification-info">
                                    <h3 className="username">{ notification.userId.displayedUsername }</h3>
                                    <h3>{ (notification.reason === 'FOLLOW' && 'has been followed you') || (notification.reason === 'COMMENT' && 'has commented your post') || (notification.reason === 'LIKE' && 'has liked your post') }</h3>
                                </div>
                            </div>
                        )
                    }) }
                </div> }
            </div> }
        </div>
    )
}

export default NotificationsBell;