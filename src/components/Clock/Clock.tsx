import React from "react";


interface TimerProps { 
    theme?: string
    time: number
}


function Clock (props: TimerProps) {

const minutes = Math.floor(props.time / 60);
const seconds = Math.floor(props.time % 60);
    return (
        <div style={{backgroundColor: 'white'}}>
            <h4 style={{color:props.theme}}>{props.time>0?  'Time remaining': 'Set a timer'}</h4>
            <h4 style={{color:props.theme}}>{minutes}:{seconds}</h4>
        </div>
    )

}

export default Clock
