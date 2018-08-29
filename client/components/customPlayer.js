import React from 'react'

const customPlayer = (props) => {
    //Line 197
    const audioControls = () => {
        const audioTag = document.getElementById('audio')
        const toggle = props.isPlayback ? 'pause' : 'play'

        audioTag[toggle]()
    }

    return (
        <div className="display-block">
            <audio
                id='audio'
                src={props.src}
                onTimeUpdate={props.onTimeUpdate}
                onPlay={props.onPlay}
                onPause={props.onPause}
                onEnded={props.onEnded}
            />
            <button id='player' onClick={audioControls} >{props.isPlayback ? 'Pause' : 'Play'}</button>
        </div>

    )
}

export default customPlayer