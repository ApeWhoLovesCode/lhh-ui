import { ReactNode } from 'react';
import { NativeProps } from '../utils/native-props';

export type TreeProps = {
  /** 
   * 是否有选择框
   * @default false
   */
  checkable?: boolean
  /** 树形结构的数据 */
  treeData?: TreeDataItem[]
  /** 
   * 默认展开所有树节点
   * @default false
   */
  defaultExpandAll?: boolean
  /** 点击复选框触发 */
  onCheck?: (checkedKeys: string[], params: OnCheckParams) => void
  /** 点击右键触发 */
  onRightClick?: (e: Event) => void
} & NativeProps

export type TreeDataItem = {
  title: ReactNode
  /** 整个树型结构中 key 值请保持唯一 */
  key: string
  disabled?: boolean
  children?: TreeDataItem[]
}

export type OnCheckParams = {
  checked: boolean
  node: ReactNode
}