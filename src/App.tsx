import React, { useEffect, useState } from 'react';
import './App.css';

let limit = 3;
function App() {
  const [queue, setQueue] = useState<number[]>([]);
  const [count, setCount] = useState<number>(1);

  function addToQueue() {
    const q = [...queue];
    const qlen = q.length + 1;
    if (count < limit) {
      setCount((c) => c + 1);
    }
    q.push(qlen);
    setQueue(q);
  }

  function removeFromQueue() {
    setCount((c) => c + 1);
    setQueue((q) => q);
  }

  useEffect(() => {}, [count]);

  return (
    <>
      <div>
        <button onClick={addToQueue}>Add loader</button>
      </div>
      <>
        {queue.map((val) => {
          return (
            <MyComp start={val <= count} key={val} clear={removeFromQueue} />
          );
        })}
      </>
    </>
  );
}

interface IMyComp {
  start: boolean;
  clear: Function;
}

const MyComp: React.FC<IMyComp> = ({ start, clear }) => {
  const [width, setWidth] = useState<number>(0);
  useEffect(() => {
    let t: number;
    if (start) {
      t = setInterval(() => {
        setWidth((width) => {
          const newW = width + 1;
          if (newW === 5) {
            clearInterval(t);
            clear();
          }
          console.log('Ishwar ,', newW);
          return newW;
        });
      }, 1000);
    }
    return () => {
      clearTimeout(t);
    };
  }, [start]);
  return (
    <div className="loader">
      <div
        className="progressbar"
        style={{ width: `${(width / 5) * 100}%` }}
      ></div>
    </div>
  );
};

export default App;
