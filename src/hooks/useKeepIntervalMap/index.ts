import { useCallback, useEffect, useRef } from 'react';

/**
 * 可（暂停 / 继续）并保留剩余时间的计时器集合
 */
function useKeepIntervalMap() {
  const timerMap = useRef<Map<string, UseKeepIntervalItem>>(new Map())

  /**
   * 设置/开启计时器
   * @param key 计时器的索引
   * @param fn 执行函数
   * @param intervalTime 间隔时间 
   * @param p KeepIntervalSetParams
   */
  const set = useCallback((
    key: string,
    fn?: () => void, 
    intervalTime = 1000, 
    {isTimeOut = false, isCover, isInit}: KeepIntervalSetParams = {}
  ) => {
    stopTime(key)
    if((!timerMap.current.has(key) || isCover) && fn) {
      timerMap.current.set(key, {
        timeout: null,
        interval: null,
        cur: 0,
        end: 0,
        fn,
        intervalTime,
        remainTime: intervalTime,
        isTimeOut,
      })
    }
    if(isInit) return
    const timeItem = timerMap.current.get(key)
    if(!timeItem) return
    // if(intervalTime && timeItem.intervalTime !== intervalTime) {
    //   timeItem.intervalTime = intervalTime
    //   timeItem.remainTime = intervalTime
    // }
    timeItem.remainTime -= timeItem.end - timeItem.cur
    timeItem.cur = Date.now()
    timeItem.end = timeItem.cur
    timeItem.timeout = setTimeout(() => { 
      timeItem.cur = Date.now()
      timeItem.end = timeItem.cur
      timeItem.remainTime = timeItem.intervalTime
      if(!timeItem.isTimeOut) {
        timeItem.interval = setInterval(() => { 
          timeItem.cur = Date.now()
          timeItem.end = timeItem.cur
          timeItem.fn() 
        }, timeItem.intervalTime)
      }
      timeItem.fn()
      if(timeItem.isTimeOut) {
        deleteFn(key)
      }
    }, timeItem.remainTime)
  }, [])
  /** 暂停计时器 */
  const pause = useCallback((key: string) => {
    const timeItem = timerMap.current.get(key)
    if(timeItem) {
      timeItem.end = Date.now()
      stopTime(key)
      return timeItem.end - timeItem.cur
    }
  }, [])
  /** 全部暂停或开始 */
  const allPause = useCallback((isPause = true) => {
    timerMap.current.forEach((_, key) => {
      isPause ? pause(key) : set(key)
    })
  }, [])
  /** 删除其中一个 */
  const deleteFn = useCallback((key: string) => {
    stopTime(key)
    if(timerMap.current.has(key)) {
      timerMap.current.delete(key)
    }
  }, [])
  /** 清空数据 */
  const clear = useCallback(() => {
    if(timerMap) {
      timerMap.current.forEach((val, key) => {
        stopTime(key)
      })
      timerMap.current.clear()
    }
  }, [])
  /** 停止定时器 */
  const stopTime = useCallback((key: string) => {
    const timeItem = timerMap.current.get(key)
    if(timeItem?.timeout) {
      clearTimeout(timeItem.timeout)
      timeItem.timeout = null
    }
    if(timeItem?.interval) {
      clearInterval(timeItem.interval)
      timeItem.interval = null
    }
  }, [])

  useEffect(() => {
    return () => clear()
  },[])

  return {
    set,
    pause,
    allPause,
    delete: deleteFn,
    clear,
    stopTime,
  }
}

export type KeepIntervalSetParams = {
  /** 是否仅仅是倒计时 */
  isTimeOut?: boolean
  /** 是否覆盖之前的内容 */
  isCover?: boolean
  /** 是否只是初始化 */
  isInit?: boolean
}

export type UseKeepIntervalItem = {
  // 第一层的setTimeout
  timeout: NodeJS.Timeout | null
  // 第二层的setInterval
  interval: NodeJS.Timeout | null
  // 当前时间
  cur: number
  // 暂停时间
  end: number
  // 传入的执行函数
  fn: () => void
  // 固定的时间间隔
  intervalTime: number
  // 用于setTimeout的剩余时间间隔
  remainTime: number
  /** 是否只是倒计时 */
  isTimeOut: boolean
}

export default useKeepIntervalMap
export { useKeepIntervalMap }
