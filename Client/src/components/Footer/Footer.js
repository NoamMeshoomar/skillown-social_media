import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.css';

const Footer = () => {
    return(
        <div className="Footer">
            <h3>©Copyright <Link to="/">Skillown</Link> all rights reserved</h3>
        </div>
    )
}

export default Footer;