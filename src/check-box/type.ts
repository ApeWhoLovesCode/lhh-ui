import { NativeProps } from '../utils/native-props';

export type CheckBoxProps = {
  /** 
   * 指定当前是否选中
   * @default false
   */
  checked?: boolean
  /** 
   * 初始是否选中
   * @default false
   */
  defaultChecked?: boolean
  /** 
   * 禁用状态
   * @default false
   */
  disabled?: boolean
  /** 
   * 选择的回调
   * @default -
   */
  onChange?: (checked: boolean) => void
} & NativeProps
