import { useCallback, useEffect, useRef } from 'react';
import { KeepIntervalSetOthParams, UseKeepIntervalItem } from '../useKeepIntervalMap';
import { KeepIntervalMd, KeepIntervalSetFunMd, KeepIntervalSetOthParamsMd } from './doc';

function useKeepInterval() {
  const timerRef = useRef<UseKeepIntervalItem>({ 
    timeout: null,
    interval: null,
    cur: 0,
    end: 0,
    fn: () => {},
    intervalTime: 0,
    remainTime: 0,
    isTimeOut: false,
  })

  /**
   * 设置/开启计时器
   * @param fn 执行函数
   * @param intervalTime 间隔时间 
   * @param isInit 是否是初始化设置计时器
   * @param p 
   */
  const set = (
    fn?: () => void, 
    intervalTime?: number, 
    {isInit, isTimeOut = false, isCover} : KeepIntervalSetOthParams = {}
  ) => {
    const timeItem = timerRef.current
    if(isTimeOut !== timeItem.isTimeOut) {
      timeItem.isTimeOut = isTimeOut
    }
    if(((!timeItem.interval && !timeItem.timeout) || isCover) && fn) {
      timeItem.fn = fn
    }
    // 覆盖倒计时的持续时间
    if(intervalTime && timeItem.intervalTime !== intervalTime) {
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
      if(!timeItem.isTimeOut) {
        timeItem.interval = setInterval(() => { 
          timeItem.cur = Date.now()
          timeItem.end = timeItem.cur
          timeItem.fn() 
        }, timeItem.intervalTime)
      }
      timeItem.fn()
      if(timeItem.isTimeOut) {
        stopTime()
      }
    }, timeItem.remainTime)
  }
  /** 关闭计时器 */
  const pause = () => {
    timerRef.current.end = Date.now()
    stopTime()
    return timerRef.current.remainTime - (timerRef.current.end - timerRef.current.cur)
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

export type KeepInterval = {
  /** 设置/开启计时器，othParams 参数请看下面的介绍 */
  setKeepInterval: (fn?: () => void, intervalTime?: number, othParams?: any) => void;
  /** 暂停某一个计时器 */
  pauseKeepInterval: (key: string) => number;
}

export default useKeepInterval
export { useKeepInterval, KeepIntervalMd, KeepIntervalSetFunMd, KeepIntervalSetOthParamsMd }
