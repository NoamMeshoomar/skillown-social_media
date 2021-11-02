import React, { useState, useRef } from 'react';

import playIcon from '../../assets/icons/videoPlayerPlay.svg';
import pauseIcon from '../../assets/icons/pause.svg';
import fullScreenIcon from '../../assets/icons/switch-to-full-screen-button.svg';

import './VideoPlayer.css';

const Video = ({ url }) => {
    const [playing, setPlaying] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);

    const videoContainerRef = useRef(null);
    const videoRef = useRef(null);

    const play = () => {
        if(!playing) {
            setPlaying(true);
            videoRef.current.play();
        } else if (playing) {
            setPlaying(false);
            videoRef.current.pause();
        }
    }

    const fullScreen = () => {
        if(!fullscreen) {
            setFullscreen(true);
            videoContainerRef.current.requestFullscreen();
        } else if (fullscreen) {
            setFullscreen(false);
            document.exitFullscreen();
        }
    }

    return(
        <div className="Video" ref={ videoContainerRef }>
            <video ref={ videoRef } src={ `http://localhost:8080/videos/${ url }` } width={ !fullscreen ? "590" : "100%"} height={ !fullscreen ? "400" : "100%"}></video>
            <div className="controls">
                <div className="play-btn" onClick={ play }>
                    <img src={ playing ? pauseIcon : playIcon } width="32" height="38" alt=""/>
                </div>
                <div className="full-screen-btn" onClick={ fullScreen }>
                    <img src={ fullScreenIcon } width="26" alt=""/>
                </div>
            </div>
        </div>
    )
}

export default Video;