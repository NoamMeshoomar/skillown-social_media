import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import Axios from '../../utils/Axios';

import uploadIcon from '../../assets/icons/upload.svg';

import './UploadPost.css';

const UploadPost = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState('empty');
    const [isVideo, setIsVideo] = useState(null);

    const token = localStorage.getItem('auth-token');

    const history = useHistory();

    useEffect(() => {
        (file && file !== 'empty') && (file.type === 'video/mp4' || 
        file.type === 'video/avi') ? setIsVideo(true) : setIsVideo(false);
    }, [file]);

    const handleUploadFile = e => {
        e.preventDefault();

        let fd = new FormData();

        fd.append('title', title);
        fd.append('description', description);
        fd.append('video', file);

        Axios.post('/posts', fd, {
            headers: {
                'auth-token': token
            }
        })
        .then(() => history.push('/'))
        .catch(err => console.log(err.response));
    }

    const springProps = useSpring({ opacity: 1, transform: 'translateY(0)', from: { opacity: 0, transform: 'translateY(100px)' } })

    return(
        <animated.div style={ springProps } className="UploadPost">
            <div className="upload-info">
                <img src={ uploadIcon } width="150" alt=""/>
                <h3>You can upload and share <br/> video of your skills with people!</h3>
            </div>
            <form encType="multipart/form-data">
                <input type="text" placeholder="Title" autoFocus onChange={ e => setTitle(e.target.value) } />
                <textarea cols="30" rows="8" placeholder="Description" onChange={ e => setDescription(e.target.value) }></textarea>
                <input type="file" id="files" onChange={ e => setFile(e.target.files[0]) } />
                { isVideo && <div className="video">
                    <video src={ window.URL.createObjectURL(file) } style={ { marginTop: 20, borderRadius: 20 } } width="100%" muted></video>
                </div> }
                { !isVideo && file !== 'empty' && <div className="error-message">
                    <h3>File type must be video.</h3>
                    <h3>mp4 | avi</h3>
                </div> }
                <button type="submit" onClick={ handleUploadFile }>UPLOAD</button>
            </form>
        </animated.div>
    )
}

export default UploadPost;