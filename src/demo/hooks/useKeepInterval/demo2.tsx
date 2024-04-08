import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import './index.scss';
import { useKeepInterval } from 'lhh-ui';

const arr = [{id:1},{id:2},{id:3},{id:4}]
export default function CountDown() {
  const [isPause, setIsPause] = useState<boolean>(true)
  const refMap = useRef<(CountDownItemInstance | null)[]>([])

  const allPause = () => {
    setIsPause(!isPause)
    arr.forEach(item => {
      refMap.current[item.id]?.handlePause(isPause)
    })
  }

  const allDelete = () => {
    setIsPause(false)
    arr.forEach(item => {
      refMap.current[item.id]?.handleDelete()
    })
  }

  return (
    <div className="demoUseKeepInterval">
      <div className="title">倒计时</div>
      <div className="wrap">
        <div className="info-wrap">
          <div className="row">时间</div>
          <div className="row">剩余时间</div>
          <div className="row">操作</div>
        </div>
        {arr.map(item => (
          <CountDownItem ref={f => refMap.current[item.id] = f} id={item.id} key={item.id} />
        ))}
      </div>
      <div className="bottom">
        <div className="text">汇总操作</div>
        <div className="right">
          <button type='button' onClick={allPause} style={{marginRight: 16}}>全部{isPause ? '开始' : '暂停'}</button>
          <button type='button' onClick={allDelete}>全部销毁</button>
        </div>
      </div>
    </div>
  )
}

type CountDownItemInstance = {
  handlePause: (isPause: boolean) => void
  handleDelete: () => void
}
interface CountDownItemProps {
  id: string | number
}
const CountDownItem = forwardRef<CountDownItemInstance, CountDownItemProps>((props, ref) => {
  const [count, setCount] = useState(0)
  const [total, setTotal] = useState(0)
  const [isPause, setIsPause] = useState(true)
  const [remain, setRemain] = useState(0)
  const {setKeepInterval, pauseKeepInterval} = useKeepInterval()
  const interval = 1000
  // 开始/暂停
  const handlePause = (pause: boolean) => {
    setIsPause(!pause)
    if(pause) { // 开始
      setKeepInterval()
    } else { // 暂停
      const _count = pauseKeepInterval()
      setRemain(_count ?? 0)
    }
  }
  // 清除定时器
  const handleDelete = () => {
    pauseKeepInterval()
    setCount(0)
    setTotal(0)
    setRemain(0)
    setIsPause(true)
  }

  useEffect(() => {
    setKeepInterval(() => {
      setCount(c => ++c)
    }, interval, {isInit: true})
  }, [setKeepInterval])

  useEffect(() => {
    if(count === 10) {
      setTotal(t => ++t)
      setCount(0)
    }
  }, [count])
  useImperativeHandle(ref, () => ({
    handlePause,
    handleDelete,
  }))
  return (
    <div className="demoUseKeepIntervalItem">
      <div className="count row">
        {total}<span className="small">{count} s</span>
      </div>
      <div className="remain row">{remain ? remain + 'ms' : ''}</div>
      <div className="row">
        <button type='button' className='btn' onClick={() => {handlePause(isPause)}}>{isPause ? '开始' : '暂停'}</button>
        <button type='button' className='btn' onClick={handleDelete}>销毁</button>
      </div>
    </div>
  )
})

