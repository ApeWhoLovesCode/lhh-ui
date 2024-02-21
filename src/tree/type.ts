import { ReactNode } from 'react';
import { NativeProps } from '../utils/native-props';

export type TreeProps = {
  /** 
   * 是否有选择框
   * @default false
   */
  checkable?: boolean
} & NativeProps

export type TreeDataItem = {
  title: ReactNode
  key: string
  disabled: boolean
  children: TreeDataItem[]
}