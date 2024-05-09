import { add, addMinutes } from "date-fns"
import { useEffect, useState } from "react"
import { Text } from "react-native"

type Duration = {
    minutes?: number | null
    seconds?: number | null
}

interface TimerProps {
    duration: Duration
    onEnded: () => void
}

function Timer({duration, onEnded}: TimerProps) {

    const [startedAt] = useState<Date>(new Date())
    const [elapsedTime, setElapsedTime] = useState<number>(0 )

    const endedTime = add(startedAt, {
        minutes: duration.minutes,
        seconds: duration.seconds
    })

    function calcElapsedTime() {
        const currentTime = new Date()
        const elapsedTime = Math.floor((endedTime.getTime() - currentTime.getTime()) / 1000);
        if(elapsedTime <= 0) return onEnded()
        setElapsedTime(elapsedTime)
    }

    useEffect(() => {
        const timer = setInterval(calcElapsedTime, 1000)
        return () => clearInterval(timer)
    }, [elapsedTime])

    const minutes = Math.floor(elapsedTime / 60)
    const seconds = elapsedTime % 60

    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds

    return (
        <Text>{formattedMinutes}:{formattedSeconds}</Text>
    )
}

export default Timer