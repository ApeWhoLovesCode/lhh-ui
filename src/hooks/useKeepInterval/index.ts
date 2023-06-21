import { useCallback, useEffect, useRef } from 'react';

interface TimerType {
  // 第一层的setTimeout
  timeout: NodeJS.Timeout | null
  // 第二层的setInterval
  interval: NodeJS.Timeout | null
  // 当前时间
  cur: number
  // 暂停时间
  end: number
  // 传入的执行函数
  fn?: () => void
  // 固定的时间间隔
  intervalTime: number
  // 用于setTimeout的剩余时间间隔
  remainTime: number
}

function useKeepInterval() {
const timerRef = useRef<TimerType>({ 
  timeout: null,
  interval: null,
  cur: 0,
  end: 0,
  fn: undefined,
  intervalTime: 0,
  remainTime: 0
})

  /**
   * 设置/开启计时器
   * @param fn 执行函数
   * @param intervalTime 间隔时间 
   * @param isInit 是否是初始化设置计时器
   */
  const set = (fn?: () => void, intervalTime?: number, isInit = false) => {
    const timeItem = timerRef.current
    if(fn) {
      timeItem.fn = fn
    }
    if(intervalTime) {
      timeItem.intervalTime = intervalTime
      timeItem.remainTime = intervalTime
    }
    if(isInit) return
    stopTime()
    timeItem.remainTime -= timeItem.end - timeItem.cur
    timeItem.cur = Date.now()
    timeItem.end = timeItem.cur
    timeItem.timeout = setTimeout(() => { 
      timeItem.cur = Date.now()
      timeItem.end = timeItem.cur
      timeItem.remainTime = timeItem.intervalTime
      timeItem.interval = setInterval(() => { 
        timeItem.cur = Date.now()
        timeItem.end = timeItem.cur
        timeItem.fn!() 
      }, timeItem.intervalTime)
      timeItem.fn!()
    }, timeItem.remainTime)
  }
  /** 关闭计时器 */
  const pause = () => {
    timerRef.current.end = Date.now()
    stopTime()
    return timerRef.current.end - timerRef.current.cur
  }
  /** 停止定时器 */
  const stopTime = () => {
    clearTimeout(timerRef.current.timeout!)
    clearInterval(timerRef.current.interval!)
    timerRef.current.timeout = null
    timerRef.current.interval = null
  }
  useEffect(() => {
    return () => stopTime()
  },[])
  return {
    setKeepInterval: useCallback(set, []),
    pauseKeepInterval: useCallback(pause, []),
  }
}

export default useKeepInterval
export { useKeepInterval }
