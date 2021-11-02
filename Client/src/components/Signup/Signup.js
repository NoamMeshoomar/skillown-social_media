import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import Axios from '../../utils/Axios';

import signuppageImg from '../../assets/images/signuppage.png';
import errorIcon from '../../assets/icons/error.svg';

import './Signup.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const history = useHistory();

    const handleRegister = e => {
        e.preventDefault();

        Axios({
            method: 'POST',
            url: '/users/register',
            data: {
                username,
                email,
                password,
                confirmPassword
            }
        })
        .then(() => history.push('/signin'))
        .catch(err => setError(err.response.data.error));
    }

    const springProps = useSpring({ opacity: 1, transform: 'translateY(0)', from: { opacity: -10, transform: 'translateY(200px)' } })

    return(
        <div className="Signup">
            <img className="side-image" src={ signuppageImg } alt=""/>
            <animated.div style={ springProps }>
                <div className="form-area">
                    <div className="form-title">
                        <h1>CREATE A NEW ACCOUNT</h1>
                        <h3>
                            Sign Up to Skillown and share your <br/> skills with people!
                        </h3>
                    </div>
                    <form className="signup-form">
                        <input type="text" placeholder="Username" onChange={ e => setUsername(e.target.value) } />
                        <input type="email" placeholder="E-mail" onChange={ e => setEmail(e.target.value) } />
                        <input type="password" placeholder="Password" onChange={ e => setPassword(e.target.value) } />
                        <input type="password" placeholder="Confirm Password" onChange={ e => setConfirmPassword(e.target.value) } />
                        { error === '' ? null : <div className="errors">
                            <img src={ errorIcon } style={ { marginRight: 10 } } width="20" alt=""/>
                            <h3>{ error }</h3>
                        </div> }
                        <button type="submit" onClick={ handleRegister }>SIGN UP</button>
                    </form>
                    <h3 className="exist-account">Already have an account? <Link to="/signin">Sign In</Link></h3>
                </div>
            </animated.div>
        </div>
    )
}

export default Signup;