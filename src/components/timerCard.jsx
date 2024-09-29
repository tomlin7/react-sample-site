import styles from "./timerCard.module.css";

import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

export const TimerCard = ({
  timerTime,
  setTimerTime,
  isRunning,
  setIsRunning,
  elapsedTime,
  setElapsedTime,
  totalTime,
}) => {
  // validating timer user input
  const handleTimeInput = (unit, value) => {
    if (value === "") {
      setTimerTime((prevTime) => ({
        ...prevTime,
        [unit]: 0,
      }));
      return;
    }

    const numValue = Number(value);
    if (isNaN(numValue)) return;

    setTimerTime((prevTime) => ({
      ...prevTime,
      [unit]: Math.min(
        unit === "hours" ? 23 : 59,
        Math.max(0, Math.floor(numValue))
      ),
    }));
  };

  // incrementing/decrementing timer time using buttons
  // `value` can be negative/positive
  const handleTimerChange = (unit, value) => {
    setTimerTime((prevTime) => ({
      ...prevTime,
      [unit]: Math.max(0, prevTime[unit] + value),
    }));
  };

  // toggle the timer widget
  const toggleTimer = () => {
    if (!isRunning && elapsedTime >= totalTime.current) {
      // reset time elapsed
      setElapsedTime(0);
    }
    setIsRunning(!isRunning);
  };

  // get formatted time string for chronograph
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  // helper function to calculate chronograph
  const calculateRotation = () => {
    return (elapsedTime / totalTime.current) * 360;
  };

  return (
    <div className={styles.timerCard}>
      {/* Timer Chronograph */}
      <div className={styles.timeCircleContainer}>
        <div className={styles.timerCircle}>
          <svg className={styles.chronograph} viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#ef4444"
              strokeWidth="5"
              strokeDasharray="283"
              strokeDashoffset={(283 * calculateRotation()) / 360}
              className={styles.timerCircleAnimation}
            />
          </svg>
          <span className={styles.timerDisplay}>
            {formatTime(
              isRunning ? totalTime.current - elapsedTime : totalTime.current
            )}
          </span>
        </div>
      </div>

      {/* Timer Controls */}
      <div className={styles.timerControls}>
        <div className={styles.timeButtons}>
          <div className={styles.timeButton}>
            <div>Hours</div>
            <button onClick={() => handleTimerChange("hours", 1)}>
              <BsFillCaretUpFill />
            </button>
            <input
              className={styles.timeInput}
              type="number"
              value={String(timerTime.hours).padStart(2, "0")}
              onChange={(e) => handleTimeInput("hours", e.target.value)}
              min="0"
              max="23"
            />
            <button onClick={() => handleTimerChange("hours", -1)}>
              <BsFillCaretDownFill />
            </button>
          </div>
          <div className={styles.timeButtonSep}>
            <span className={styles.timeText}>:</span>
          </div>
          <div className={styles.timeButton}>
            <div>Minutes</div>
            <button onClick={() => handleTimerChange("minutes", 1)}>
              <BsFillCaretUpFill />
            </button>
            <input
              className={styles.timeInput}
              type="number"
              value={String(timerTime.minutes).padStart(2, "0")}
              onChange={(e) => handleTimeInput("minutes", e.target.value)}
              min="0"
              max="59"
            />
            <button onClick={() => handleTimerChange("minutes", -1)}>
              <BsFillCaretDownFill />
            </button>
          </div>
          <div className={styles.timeButtonSep}>
            <span className={styles.timeText}>:</span>
          </div>
          <div className={styles.timeButton}>
            <div>Seconds</div>
            <button onClick={() => handleTimerChange("seconds", 1)}>
              <BsFillCaretUpFill />
            </button>
            <input
              className={styles.timeInput}
              type="number"
              value={String(timerTime.seconds).padStart(2, "0")}
              onChange={(e) => handleTimeInput("seconds", e.target.value)}
              min="0"
              max="59"
            />
            <button onClick={() => handleTimerChange("seconds", -1)}>
              <BsFillCaretDownFill />
            </button>
          </div>
        </div>
        <button className={styles.startButton} onClick={toggleTimer}>
          {isRunning ? "Pause" : "Start"}
        </button>
      </div>
    </div>
  );
};
