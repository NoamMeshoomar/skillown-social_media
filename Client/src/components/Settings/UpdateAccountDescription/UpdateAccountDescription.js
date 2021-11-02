import React, { useState } from 'react';
import Axios from '../../../utils/Axios';

import './UpdateAccountDescription.css';

const UpdateAccountDescription = () => {
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const token = localStorage.getItem('auth-token');

    const handleChangeDescription = e => {
        e.preventDefault();

        Axios({
            method: 'PUT',
            url: '/users/updatedescription',
            headers: {
                'auth-token': token
            },
            data: {
                description
            }
        })
        .then(res => setMessage(res.data.message))
        .catch(err => setMessage(err.response.data.message));
    }

    return(
        <div className="UpdateAccountDescription">
            <h1>Update your account description</h1>
            <form>
                <textarea cols="40" rows="9" placeholder="Write your account description" onChange={ e => setDescription(e.target.value) }></textarea>
                <button type="submit" onClick={ handleChangeDescription }>Update</button>
                { message !== '' && <div className="message">
                    <h3>{ message }</h3>
                </div> }
            </form>
        </div>
    )
}

export default UpdateAccountDescription;