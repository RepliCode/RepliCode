import React from 'react'

const customPlayer = (props) => {

    const audioControls = (event) => {
        const audioTag = document.getElementById('audio')
        const toggle = props.isPlayback ? 'pause' : 'play'
        // Toggle playback of audio
        audioTag[toggle]()
        /// Toggle class of audio player for css transitions
        event.target.classList.toggle('playing')
    }

    return (
        <div>
            <audio
                id='audio'
                src={props.src}
                onTimeUpdate={props.onTimeUpdate}
                onPlay={props.onPlay}
                onPause={props.onPause}
                onEnded={props.onEnded}
            />
            <a id='player' className='play' onClick={audioControls} ></a>
        </div>

    )
}

export default customPlayer