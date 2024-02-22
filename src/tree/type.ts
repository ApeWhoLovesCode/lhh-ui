import { ReactNode } from 'react';
import { NativeProps } from '../utils/native-props';

export type TreeProps = {
  /** 
   * 是否有选择框
   * @default false
   */
  checkable?: boolean
  /** 
   * （受控）选中复选框的树节点的key，当不在数组中的父节点需要被选中时，对应节点也将选中，触发 onCheck 回调，使该值保持正确
   * @default undefined
   */
  checkedKeys?: string[]
  /** 
   * 默认展开所有树节点
   * @default false
   */
  defaultExpandAll?: boolean
  /** 
   * 支持点选多个节点（节点本身）
   * @default true
   */
  multiple?: boolean
  /** 
   * 是否可选中
   * @default true
   */
  selectable?: boolean
  /** 
   * （受控）设置选中的树节点，多选需设置 multiple 为 true
   * @default -
   */
  selectedKeys?: string[]
  /** 树形结构的数据 */
  treeData?: TreeDataItem[]
  /** 点击复选框触发 */
  onCheck?: (checkedKeys: string[], params: OnCheckParams) => void
  /** 点击树节点触发 */
  onSelect?: (selectKeys: string[], params: OnSelectParams) => void
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
  key: string
}

export type OnSelectParams = {
  select: boolean
  key: string
}