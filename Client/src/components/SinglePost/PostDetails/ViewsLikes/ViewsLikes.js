import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from '../../../../utils/Axios';
import { useSelector } from 'react-redux';

import viewsIcon from '../../../../assets/icons/eye.svg';
import likesIcon from '../../../../assets/icons/like.svg';

import './ViewsLikes.css';

const ViewsLikes = ({ id, views, likes }) => {
    const [likesNum, setLikesNum] = useState(null);
    const [viewsNum, setViewsNum] = useState(null);

    useEffect(() => {
        if(id !== undefined) {
            Axios({
                method: 'PUT',
                url: `/posts/view/${ id }`
            })
            .then(res => setViewsNum(res.data));
        }
    }, [id]);

    const token = localStorage.getItem('auth-token');

    const isLogged = useSelector(state => state.isLogged);
    const history = useHistory();

    const handleLike = () => {
        if(!isLogged) return history.push('/signin');

        Axios({
            method: 'PUT',
            url: `/posts/like/${ id }`,
            headers: {
                'auth-token': token
            }
        })
        .then(res => setLikesNum(res.data));
    }

    return(
        <div className="ViewsLikes">
            <div className="views">
                <img src={ viewsIcon } width="34" alt=""/>
                <h3>{ viewsNum !== null ? viewsNum : views }</h3>
            </div>
            <div className="likes">
                <img src={ likesIcon } width="26" onClick={ handleLike } alt=""/>
                <h3>{ likesNum !== null ? likesNum : likes }</h3>
            </div>
        </div>
    )
}

export default ViewsLikes;