import React from 'react';
import { useSpring, animated } from 'react-spring';

import UpdateProfileImage from './UpdateProfileImage/UpdateProfileImage';
import UpdateAccountDescription from './UpdateAccountDescription/UpdateAccountDescription';

import './Settings.css';

const Settings = () => {
    const springProps = useSpring({ opacity: 1, transform: 'translateX(0)', from: { opacity: 0, transform: 'translateX(-120px)' } });

    return(
        <animated.div style={ springProps }>
            <div className="Settings">
                <div className="right-settings">
                    <UpdateProfileImage />
                    <UpdateAccountDescription />
                </div>
            </div>
        </animated.div>
    )
}

export default Settings;