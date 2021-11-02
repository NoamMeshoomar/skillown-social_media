import React, { useState, useRef, useEffect } from 'react';
import Axios from '../../../utils/Axios';
import { useDispatch } from 'react-redux';
import { imageChange } from '../../../actions';
import { mediaBeginUrl } from '../../../utils/MediaBeginUrl';

import './UpdateProfileImage.css';

const UpdateProfileImage = () => {
    const [user, setUser] = useState(null);
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const imageRef = useRef(null);

    const dispatch = useDispatch();

    useEffect(() => {
        Axios({
            method: 'GET',
            url: '/users/current-user',
            headers: {
                'auth-token': localStorage.getItem('auth-token')
            }
        })
        .then(res => setUser(res.data.user));
    }, []);

    const handleChangeImage = e => {
        e.preventDefault();
        
        const token = localStorage.getItem('auth-token');

        const data = new FormData();
    
        data.append('file', file);

        Axios.put('/users/updateimage', data, {
            headers: {
                'auth-token': token
            }
        })
        .then(res => { 
            dispatch(imageChange(res.data.image));
            setMessage(res.data.message);
        })
        .catch(err => setMessage(err.response.data.message));
    }

    const handleFileInputChange = e => {
        setFile(e.target.files[0]);

        const reader = new FileReader();

        reader.onload = function(e) {
            imageRef.current.src = e.target.result;
        }

        reader.readAsDataURL(e.target.files[0]);
    }

    return(
        <div className="UpdateProfileImage">
            <h1>Update your profile image</h1>
            <div className="profile-image">
                <form onSubmit={ handleChangeImage } encType="multipart/form-data" >
                    <div>
                        <img ref={ imageRef } src={ user !== null ? `${ mediaBeginUrl }/images/${ user.image }` : undefined } alt="" />
                        <input type="file" name="file" onChange={ handleFileInputChange } />
                    </div>
                    { file !== null && <button type="submit">UPDATE IMAGE</button> }
                </form>
                { message !== '' &&
                    <div className="message">
                        <h3>{ message }</h3>
                    </div>
                }
            </div>
        </div>
    )
}

export default UpdateProfileImage;