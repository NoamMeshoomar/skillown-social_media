import React from 'react';

import UserDetails from './UserDetails/UserDetails';
import ViewsLikes from './ViewsLikes/ViewsLikes';

import './PostDetails.css';

const PostDetails = ({ id, title, description, views, likes, createdAt, user }) => {
    return(
        <div className="PostDetails">
            <UserDetails user={ user !== undefined && user } />
            <div className="post-information">
                <h1>{ title }</h1>
                <h3>{ createdAt === undefined ? null : Intl.DateTimeFormat('en-US').format(Date.parse(createdAt)) }</h3>
            </div>
            <p>{ description }</p>
            <ViewsLikes id={ id } views={ views } likes={ likes } />
        </div>
    )
}

export default PostDetails;