import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { useDispatch } from 'react-redux';
import { isLogged, currentUser } from '../../actions';
import Axios from '../../utils/Axios';

import signuppageImg from '../../assets/images/signuppage.png';
import errorIcon from '../../assets/icons/error.svg';

import './Signin.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const history = useHistory();

    const dispatch = useDispatch();

    const handleLogin = e => {
        e.preventDefault();

        Axios({
            method: 'POST',
            url: '/users/login',
            data: {
                email,
                password
            }
        })
        .then(res => {
            localStorage.setItem('auth-token', res.data.token);
            dispatch(currentUser(res.data.user));
            dispatch(isLogged(true));
            history.push('/');
        })
        .catch(err => setError(err.response.data.error));
    }

    const springProps = useSpring({ opacity: 1, transform: 'translateY(0)', from: { opacity: -10, transform: 'translateY(200px)' } })

    return(
        <div className="Signin">
            <img className="side-image" src={ signuppageImg } alt=""/>
            <animated.div style={ springProps }>
                <div className="form-area">
                    <div className="form-title">
                        <h1>SIGN IN TO YOUR ACCOUNT</h1>
                        <h3>
                            Sign In to Skillown and share your <br/> skills with people!
                        </h3>
                    </div>
                    <form className="signin-form">
                        <input type="email" placeholder="E-mail" onChange={ e => setEmail(e.target.value) } />
                        <input type="password" placeholder="Password" onChange={ e => setPassword(e.target.value) } />
                        { error === '' ? null : <div className="errors">
                            <img src={ errorIcon } style={ { marginRight: 10 } } width="20" alt=""/>
                            <h3>{ error }</h3>
                        </div> }
                        <button type="submit" onClick={ handleLogin }>SIGN IN</button>
                    </form>
                    <h3 className="new-account">Do not have an account? <Link to="/signup">Sign Up</Link></h3>
                </div>
            </animated.div>
        </div>
    )
}

export default Signup;