import React from 'react';
import { KeepIntervalSetOthParams } from '../useKeepIntervalMap';
import { KeepInterval } from '.';

/** 函数类型 */
export const KeepIntervalMd: React.FC<KeepInterval> = () => {
  return <></>
}

type KeepIntervalSetFun = {
  /** 执行函数 */
  fn?: () => void, 
  /** 间隔时间 */
  intervalTime?: number, 
  /** 其他参数 */
  othParams?: KeepIntervalSetOthParams
}

/** set 函数的参数 md 文档 */
export const KeepIntervalSetFunMd: React.FC<KeepIntervalSetFun> = () => {
  return <></>
}

/** othParams 其他参数 md 文档 */
export const KeepIntervalSetOthParamsMd: React.FC<KeepIntervalSetOthParams> = () => {
  return <></>
}
