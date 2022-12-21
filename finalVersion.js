
import React, { useEffect, useState } from "react";

/**
 * A simple countdown timer implemented as a functional React component.
 * The timer displays the remaining time in minutes and seconds, and updates every
 * second until the time runs out. When the time runs out, a message is displayed.
 * @param {number} [duration=25] - The duration of the timer in minutes.
 * @returns {React.ReactElement} A React element representing the countdown timer.
 */
export default function App({ duration = 25 }) {
  
  const [minutes, setMinutes] = useState(duration);
  const [seconds, setSeconds] = useState(0);

  /**
   * An effect hook that updates the countdown every second.
   * The hook sets up an interval that decrements the remaining time by one second
   * every time it runs. When the time runs out, the interval is cleared.
   */
  useEffect(() => {
    
    if (minutes === 0 && seconds === 0) {                                                           // If the time has already run out, there's nothing to do
      return;
    }
    
    const interval = setInterval(() => {                                                            // Set up an interval to decrement the remaining time every second
      if (seconds > 0) {                                                                            // If there are still seconds remaining, decrement the seconds
        setSeconds(prevSeconds => prevSeconds - 1);
      } else if (minutes > 0) {                                                                     // If there are no seconds remaining but there are still minutes, decrement the minutes and set the seconds to 59
        setMinutes(prevMinutes => prevMinutes - 1);
        setSeconds(59);
      }
    }, 1000);
    
    return () => clearInterval(interval);                                                           // Return a cleanup function to clear the interval when the component is unmounted
  }, [minutes, seconds]);                                                                           // Re-run the effect when the minutes or seconds change

  return (
    <div>
      <Time minutes={minutes} seconds={seconds} />
      <br />
      {/* Display a message when the time runs out */}
      {minutes === 0 && seconds === 0 && <EndMessage />}
    </div>
  );
}

/**
 * Renders the minutes and seconds, with leading zeros if necessary.
 * @param {number} minutes - The number of minutes remaining.
 * @param {number} seconds - The number of seconds remaining.
 * @returns {React.ReactElement} A React element representing the minutes and seconds.
 */
function Time({ minutes, seconds }) {
  return (
    <div>
      <span>{String(minutes).padStart(2, "0")}</span>
      <span>:</span>
      <span>{String(seconds).padStart(2, "0")}</span>
    </div>
  );
}

/**
 * Renders a message when the time runs out.
 * @returns {React.ReactElement} A React element representing the message.
 */
function EndMessage() {
  return <h1>Time's up!</h1>
}
