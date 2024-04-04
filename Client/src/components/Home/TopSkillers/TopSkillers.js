import React from 'react';
import { useSpring, animated } from 'react-spring';

import TopSkillersTop from './TopSkillersTop/TopSkillersTop';
import TopSkillersUsers from './TopSkillersUsers/TopSkillersUsers';

import './TopSkillers.css';

const TopSkillers = () => {
    const springProps = useSpring({ opacity: 1, transform: 'translateX(0)', from: { opacity: 0, transform: 'translateX(-200px)' } });

    return(
        <animated.div style={springProps}>
            <div className="TopSkillers">
                <TopSkillersTop />
                <TopSkillersUsers />
            </div>
        </animated.div>
    )
}

export default TopSkillers;