import { useState, useRef } from 'react';

/* 
type Props = {
    words: {
        [key: string]: []
    }
}
{ words }: Props
*/

const StopWatch = (initialState = 0) => {
    const [timer, setTimer] = useState(initialState);
    const [isActive, setIsActive] = useState(false)//true
    const [isPaused, setIsPaused] = useState(true)
    const countRef = useRef<number | null>(null)

    const formatTime = () => {
        const getSeconds = `0${(timer % 60)}`.slice(-2)
        const minutes = Math.floor(timer / 60)
        const getMinutes = `0${minutes % 60}`.slice(-2)

        return `${getMinutes} : ${getSeconds}`
    }

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
        countRef.current = setInterval(() => {
            setTimer((timer) => timer + 1)
        }, 1000)
    }

    const handlePause = () => {
        clearInterval(countRef.current);
        setIsPaused(true);
        setIsActive(false);
    }

    const handleResume = () => {
        setIsPaused(false);
        setIsActive(true);
        countRef.current = setInterval(() => {
            setTimer((timer) => timer + 1)
        }, 1000)
    }

    const handleReset = () => {
        clearInterval(countRef.current)
        setIsActive(false)
        setIsPaused(true)
        setTimer(0)
    }


    return (
        { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset, formatTime }
    );
}

export default StopWatch;
