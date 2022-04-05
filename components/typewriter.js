import style from './typewriter.module.css'
import React, { useState, useEffect } from 'react';

const tickSpeed = 100;
const waitTicks = 10;

const jules = [
    "jules",
    "JuicyJules",
    "Tsuls",
    "Jewlz",
    "JuiciestJules",
    "Julsy",
    "Juls",
    "Tsulz",
    "Dschuls",
    "Dschoolz",
    "Dschulz",
    "Julian",
    "Jules",
    "Ligma",
]

const chooseWord = () => {
    let random = Math.floor(Math.random() * jules.length);
    return jules[random];
}

const mutateState = ({pos,forward,target,wait}) => {
    if (wait > 0) {
        return {
            pos: pos,
            forward: forward,
            target: target,
            wait: wait - 1,
        }
    }
    if (pos == target.length && forward) {
        return {
            pos: pos,
            forward: false,
            target: target,
            wait: waitTicks
        }
    } else if (pos == 0 && !forward) {
        return {
            pos: 0,
            forward: true,
            target: chooseWord(),
            wait: waitTicks
        }
    }
    let newPos = pos + (forward ? 1 : -1);
    return {
        pos: newPos,
        forward: forward,
        target: target,
        wait: wait,
    }
}

export default function Typewriter(){
    const [state, setState] = useState({
        pos: 0,
        forward: true,
        wait: waitTicks,
        target: chooseWord(),
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setState(mutateState);
        }, tickSpeed)
        return () => clearInterval(interval)
    }, [state]);

    return (
        <div className={style.madeWith}>
            made with <i className={`${style.icon} material-icons ${style.white} ${style.heartbeat}`}>favorite</i> by {' '}
            <div className={style.julesanchor}>
                <a href="https://twitter.com/juiciestjules" className={`${style.jules} ${style.typewritten}`}>{state.target.slice(0,state.pos)}</a>
            </div>
        </div>
    )
}