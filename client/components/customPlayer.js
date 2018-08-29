import React from 'react'

const customPlayer = (props) => {
    const player = document.getElementById('player');
    const audioControls = (event) => {
        const audioTag = document.getElementById('audio')
        const toggle = props.isPlayback ? 'pause' : 'play'
        // Toggle playback of audio
        audioTag[toggle]()
    }

    if (player) {
        props.isPlayback ? player.classList.add('playing') : player.classList.remove('playing')
    }
    return (
        <div>
            <audio
                id='audio'
                src={props.src}
                onTimeUpdate={props.onTimeUpdate}
                onPlay={props.onPlay}
                onPause={props.onPause}
            />
            <a id='player' className='play' onClick={audioControls} ></a>
        </div>

    )
}

export default customPlayer