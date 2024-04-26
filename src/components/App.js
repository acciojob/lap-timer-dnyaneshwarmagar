import React, { useState, useEffect, useRef } from 'react';
import './../styles/App.css';

const App = () => {
  const [time, setTime] = useState(0); // Time in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef();

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const startTimer = () => {
    if (!isRunning) {
      const startTime = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
      setIsRunning(true);
    }
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setIsRunning(false);
    setLaps([]);
  };

  const recordLap = () => {
    setLaps([...laps, time]);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / (60 * 1000));
    const seconds = Math.floor((time % (60 * 1000)) / 1000);
    const centiseconds = Math.floor((time % 1000) / 10);

    const formatNumber = (num) => num.toString().padStart(2, '0');
    return `${formatNumber(minutes)}:${formatNumber(seconds)}.${formatNumber(centiseconds)}`;
  };

  return (
    <div className="app" id="root">
      <h1 className="timer">{!!formatTime(time)?formatTime(time):"00:00:00"}</h1>
      <div className="buttons">
        {!isRunning ? (
          <button onClick={startTimer}>Start</button>
        ) : (
          <button onClick={stopTimer}>Stop</button>
        )}
        <button onClick={isRunning ? recordLap : null} disabled={!isRunning}>
          Lap
        </button>
        <button onClick={resetTimer}>Reset</button>
      </div>
      <div className="laps">
        <h2>Laps</h2>
        <ul>
          {laps.map((lap, index) => (
            <li key={index}>{formatTime(lap)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
