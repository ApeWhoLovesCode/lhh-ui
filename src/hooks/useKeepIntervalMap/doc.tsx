import React from 'react';
import { KeepIntervalMap, KeepIntervalSetOthParams } from '.';

/** 各函数类型 */
export const KeepIntervalMapMd: React.FC<KeepIntervalMap> = () => {
  return <></>
}

type KeepIntervalSetFun = {
  /** 计时器的id索引 */
  key: string,
  /** 执行函数 */
  fn?: () => void, 
  /** 间隔时间 */
  intervalTime?: number, 
  /** 其他参数 */
  othParams?: KeepIntervalSetOthParams
}

/** set 函数的参数 md 文档 */
export const KeepIntervalMapSetFunMd: React.FC<KeepIntervalSetFun> = () => {
  return <></>
}

/** othParams 其他参数 md 文档 */
export const KeepIntervalMapSetOthParamsMd: React.FC<KeepIntervalSetOthParams> = () => {
  return <></>
}
