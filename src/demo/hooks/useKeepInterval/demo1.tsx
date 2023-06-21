import React, { useEffect, useState } from 'react';
import './index.less';
import { useKeepInterval } from 'lhh-ui';

const interval = 1000
export default function CountDown() {
  const [num, setNum] = useState(0)
  const [remain, setRemain] = useState(0)
  const [isPause, setIsPause] = useState<boolean>(true)
  const { setKeepInterval, pauseKeepInterval } = useKeepInterval()

  const onClick = () => {
    setIsPause(v => !v)
    if(isPause) {
      setKeepInterval()
    } else {
      const v = pauseKeepInterval()
      setRemain(interval - v)
    }
  }

  useEffect(() => {
    setKeepInterval(() => {
      setNum(n => ++n)
    }, interval, true)
  }, [])

  return (
    <div>
      <h2>num: {num}</h2>
      <h4 style={{color: '#3d74ff'}}>剩余时间: {remain}ms</h4>
      <div>
        <button type='button' onClick={onClick}>{isPause ? '开始' : '暂停'}</button>
      </div>
    </div>
  )
}

