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
   * @default false
   */
  multiple?: boolean
  /** 
   * 是否只能单选一个节点
   * @default false
   */
  singleSelected?: boolean
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
  treeData?: TreeNode[]
  /** 点击复选框触发 */
  onCheck?: (checkedKeys: string[], params?: OnCheckParams) => void
  /** 点击树节点触发 */
  onSelect?: (selectKeys: string[], params: OnSelectParams) => void
  /** 点击右键触发 */
  onRightClick?: (params: onRightClickParams) => void
} & NativeProps

export type TreeNode = {
  /** 
   * 当树为 checkable 时，设置独立节点是否展示 Checkbox
   * @default true
   */
  checkable?: boolean
  /** 标题 */
  title: ReactNode
  /** 整个树型结构中 key 值请保持唯一 */
  key: string
  /** 禁掉 checkbox */
  disableCheckbox?: boolean
  /** 禁用该节点的点击和选择，不包括子节点 */
  disabled?: boolean
  /** 内容 */
  children?: TreeNode[]
}

export type TreeInstance = {
  /** 获取当前选中的树形结构 */
  getCheckTree: () => CheckTree | undefined
  /** 根据 key 值获取其父节点，从 key 节点的最亲关系开始排列 */
  getParentKeys: (key: string) => string[] | undefined
  /** 根据 key 值获取其兄弟节点，会包括自身节点 */
  getSiblingKeys: (key: string) => string[] | undefined
  /** 根据 key 值获取其子节点 */
  getChildKeys: (key: string) => string[] | undefined
  /** 获取当前 check 中的所有 key */
  getCheckKeys: () => string[]
  /** 获取当前 treeData 中的节点数据 */
  getTreeDataItem: (key: string) => TreeNode | undefined
}

export type CheckTreeItem = {
  /** 父节点的 key 值 */
  parentKey?: string
  /** 子节点的 key 数组 */
  childKeys?: string[]
  /** 是否展开 */
  show: boolean
  /** 是否选中 */
  checked: boolean
  checkable?: boolean
  disableCheckbox?: boolean
  disabled?: boolean
}

export type CheckTree = Record<string, CheckTreeItem>

export type OnCheckParams = {
  /** 当前的状态 */
  checked: boolean
} & OnCheckCommonParams

export type OnSelectParams = {
  /** 当前的状态 */
  selected: boolean
} & OnCheckCommonParams

export type onRightClickParams = {
  event: React.MouseEvent<HTMLDivElement, MouseEvent>
} & OnCheckCommonParams

export type OnCheckCommonParams = {
  /** 当前点击的 key */
  key: string
  /** 父节点的key数组，从子节点的最亲关系开始排列 */
  parentKeys?: string[]
  /** treeData 中对应该节点的数据 */
  treeDataItem?: TreeNode
}
