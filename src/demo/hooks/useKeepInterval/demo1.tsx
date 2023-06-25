import React, { useEffect, useState } from 'react';
import { useKeepInterval } from 'lhh-ui';

export default function CountDown() {
  const [num, setNum] = useState(0)
  const [interval, setInterval] = useState(1000)
  const [remain, setRemain] = useState(0)
  const [isPause, setIsPause] = useState<boolean>(false)
  const { setKeepInterval, pauseKeepInterval } = useKeepInterval()

  const onClick = () => {
    setIsPause(v => !v)
    if(isPause) {
      setKeepInterval()
    } else {
      const v = pauseKeepInterval()
      setRemain(v)
    }
  }

  useEffect(() => {
    setKeepInterval(() => {
      setNum(n => ++n)
    }, interval)
  }, [interval])

  return (
    <div>
      <h2>
        每
        <input 
          type="number" 
          max={10000}
          min={100}
          value={interval} 
          onChange={e => {
            let v = +e.target.value
            if(v < 100) v = 100;
            if(v > 10000) v = 10000
            setInterval(v)
          }} 
          style={{width: 60}}
        /> 
        ms加一 : {num}
      </h2>
      <h4 style={{color: '#3d74ff'}}>剩余时间: {remain}ms</h4>
      <div>
        <button type='button' onClick={onClick}>{isPause ? '开始' : '暂停'}</button>
      </div>
    </div>
  )
}

