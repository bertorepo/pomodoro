import React, { useState, useRef } from 'react';
import './App.css';

function padTime(time) {
  return time.toString().padStart(2, '0');
}

const App = () => {
  const time = 60 * 60;
  const [timeLeft, setTimeLeft] = useState(time);
  const [isRunning, setIsRunning] = useState(false);
  const [title, setTitle] = useState('Let the countdown begin!');
  const intervalRef = useRef();

  function startTimer() {
    if (intervalRef.current != null) return;
    setIsRunning(true);
    setTitle('Nice One!');
    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft >= 1) return timeLeft - 1;

        resetTimer();
        return 0;
      });
    }, 1000);
  }

  function stopTimer() {
    if (intervalRef.current == null) return;
    setIsRunning(false);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTitle('Dont Surrender!');
  }
  function resetTimer() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTitle(title);
    setTimeLeft(time);
    setIsRunning(false);
  }

  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft - minutes * 60);

  return (
    <>
      <div className="app">
        <div className="centerDiv">
          <h1>Pomodoro!</h1>
          <h3>{title}</h3>
          <div className="timer">
            <span>{minutes}</span>
            <span>:</span>
            <span>{seconds}</span>
          </div>

          <div className="buttons">
            {!isRunning && <button onClick={startTimer}>Start</button>}
            {isRunning && <button onClick={stopTimer}>Stop</button>}
            <button onClick={resetTimer}>Reset</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
