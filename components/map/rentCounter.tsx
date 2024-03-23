import { useEffect, useState } from "react"
import { View, Text } from "react-native"

interface RentCounterProps {
    startedAt: Date
}

function RentCounter({startedAt}: RentCounterProps) {
    const startedTime = new Date(startedAt)
    const [elapsedTime, setElapsedTime] = useState<number>(0)

    function calculateElapsedTime() {
        const currentTime = new Date();
        const elapsedTime = Math.floor((currentTime.getTime() - startedTime.getTime()) / 1000);
        setElapsedTime(elapsedTime);
    }

    useEffect(() => {
        const timer = setInterval(calculateElapsedTime, 1000)
        return () => clearInterval(timer)
    }, [elapsedTime])

    const minutes = Math.floor(elapsedTime / 60)
    const seconds = elapsedTime % 60

    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds

    return (
        <View>
            <Text>Прошло времени: {formattedMinutes}:{formattedSeconds}</Text>
        </View>
    )
}

export default RentCounter