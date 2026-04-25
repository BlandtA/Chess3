import { FunctionComponent, useEffect, useRef, useState } from "react"
import { Player } from "../models/Player"
import { Colors } from "../models/Colors"

interface TimerProps{
    currensPlayer: Player | null
    restart: () => void
}

const Timer: FunctionComponent<TimerProps> = ({currensPlayer, restart}) => {
    const [whiteTime, setWhiteTime] = useState(300)
    const [blackTime, setBlackTime] = useState(300)
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    useEffect(() => {
        startTimer()
    }, [currensPlayer])

    function startTimer(){
        if(timer.current){
            clearInterval(timer.current)
        }
        const callback = currensPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
        timer.current = setInterval(callback, 1000)
    }

    function decrementWhiteTimer(){
        setWhiteTime(previous => previous - 1)
    }

    function decrementBlackTimer(){
        setBlackTime(previous => previous - 1)
    }

    const handleRestart = () => {
        setWhiteTime(300)
        setBlackTime(300)
        restart()
    }

    return (
        <div className="restart">
            <div>
                <button className="button" onClick={handleRestart}>Рестарт</button>
            </div>
            <h2>Белые: {whiteTime}</h2>
            <h2>Черные: {blackTime}</h2>
        </div>
    )
}

export default Timer