import React, { useEffect, useState } from 'react';
import { useKeepIntervalMap } from 'lhh-ui';

const interval = 5000
const id = 'lhh'
export default function CountDown() {
  const [num, setNum] = useState(0)
  const [remain, setRemain] = useState(0)
  const [isPause, setIsPause] = useState<boolean>(true)
  const keepInterval = useKeepIntervalMap()

  const onClick = () => {
    setIsPause(v => !v)
    if(isPause) {
      keepInterval.set(id)
    } else {
      const v = keepInterval.pause(id)
      console.log('v: ', v);
      setRemain(interval - (v ?? 0))
    }
  }

  useEffect(() => {
    keepInterval.set(id, () => {
      setNum(n => ++n)
    }, interval, {isInit: true, isTimeOut: true})
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

