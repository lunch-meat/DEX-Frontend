import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

export default ({ onComplete }) => {
    const renderTime = ({ remainingTime }) => {
        const minutes = Math.floor(remainingTime / 60)
        const seconds = remainingTime % 60

        return `${minutes}:${seconds}`
    };

    return (
        <CountdownCircleTimer
            isPlaying
            duration={600}
            size={72}
            strokeLinecap={3}
            strokeWidth={5}
            colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
            onComplete={() => {
                onComplete()
                return [false, 0];
            }}
        >
            {renderTime}
        </CountdownCircleTimer>
    );
};
