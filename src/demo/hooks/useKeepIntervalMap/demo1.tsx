import React, { forwardRef, useId, useImperativeHandle, useRef, useState } from 'react';
import { useKeepIntervalMap, classBem, isMobile, KeepIntervalMap } from 'lhh-ui';
import './index.scss';

const arr = [1,2,3,4]
export default function CountDown() {
  const [isPause, setIsPause] = useState<boolean>(true)
  const keepInterval = useKeepIntervalMap()
  const refMap = useRef<(ItemInstance | null)[]>([])

  const allPause = () => {
    setIsPause(v => !v)
    arr.forEach(item => {
      if(isPause) {
        refMap.current[item]?.set()
      } else {
        refMap.current[item]?.pause()
      }
    })
  }

  return (
    <div className='demoUseKeepIntervalMap'>
      <div className={classBem('content', { mobile: isMobile() })}>
        {arr.map((item, index) => (
          <div className="item" key={item}>
            <Item ref={f => refMap.current[item] = f} keepInterval={keepInterval} interval={index + 1} />
          </div>
        ))}
      </div>
      <div className="bottom">
        <div className="right">
          <button type='button' onClick={allPause} style={{marginRight: 16}}>全部{isPause ? '开始' : '暂停'}</button>
        </div>
      </div>
    </div>
  )
}

type ItemInstance = {
  set: () => void
  pause: () => void
}
const Item = forwardRef<
  ItemInstance, {keepInterval: KeepIntervalMap, interval: number}
>(({keepInterval, interval}, ref) => {
  const id = useId()
  const [num, setNum] = useState(0)
  const [remain, setRemain] = useState(0)
  const [isPause, setIsPause] = useState(true)

  const set = () => {
    setIsPause(false)
    keepInterval.set(id, () => {
      setNum(v => ++v)
    }, interval * 1000)
  }

  const pause = () => {
    setIsPause(true)
    const v = keepInterval.pause(id)
    setRemain(v ?? 0)
  }

  useImperativeHandle(ref, () => ({
    set,
    pause,
  }))

  return (
    <h4>
      每{interval}s加一
      <div>总数：{num}</div>
      <div style={{color: '#3d74ff'}}>剩余：{remain}ms</div>
      <button 
        type='button' 
        onClick={() => {
          if(isPause) set();
          else pause();
        }}
      >{isPause ? '开始' : '暂停'}</button>
    </h4>
  )
})

