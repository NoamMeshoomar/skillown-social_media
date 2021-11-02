import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Axios from '../../../utils/Axios';
import { mediaBeginUrl } from '../../../utils/MediaBeginUrl';

import './Comments.css';

const Comments = ({ postId, comments }) => {
    const [comment, setComment] = useState('');
    const [allComments, setAllComments] = useState([]);

    const inputRef = useRef(null);

    useEffect(() => {
        setAllComments(comments);
    }, [comments]);

    const token = localStorage.getItem('auth-token');

    const history = useHistory();
    const isLogged = useSelector(state => state.isLogged);

    const handlePostComment = () => {
        if(!isLogged) return history.push('/signin');

        Axios({
            method: 'POST',
            url: `/posts/comment/${ postId }`,
            headers: {
                'auth-token': token
            },
            data: {
                comment
            }
        })
        .then(res => setAllComments(allComments.concat(res.data)))
        .catch(err => console.log(err.response));
    }

    return(
        <div className="Comments">
            <form>
                <input className="comment-input" ref={ inputRef } type="text" placeholder="Write a comment..." onChange={ e => setComment(e.target.value) } />
                <button className="comment-submit-btn" type="submit" onClick={ e => {
                    e.preventDefault();
                    
                    handlePostComment();
                    
                    inputRef.current.value = '';
                } }>SEND</button>
            </form>
            { allComments.length === 0 ? <div className="no-comments">
                <h3>No Comments...</h3>
            </div> : <div className="all-comments">
                { [...allComments].reverse().map(comment => {
                    return(
                        <div key={ comment._id } className="comment">
                            <Link to={ `/user/${ comment.userId.displayedUsername }` }>
                                <img src={ `${ mediaBeginUrl }/images/${ comment.userId.image }` } width="50" height="50" alt=""/>                            
                            </Link>
                            <div className="comment-details">
                                <h3>{ comment.userId.displayedUsername }</h3>
                                <p>{ comment.comment }</p>
                            </div>
                        </div>
                    )
                }) }
            </div> }
        </div>
    )
}

export default Comments;