import { ReactNode } from "react";
import { NativeProps } from "../utils/native-props";

export type MobileFolderProps = { 
  /** 需要渲染的列表 */
  list: MobileFolderItem[]
} & NativeProps

export type MobileFolderItem = {
  /** 自定义渲染的内容 */
  children?: ReactNode
  /** 渲染的内容为图片 */
  icon?: string
  /** 标题 */
  title?: string
  /** 点击的回调 */
  onClick?: (item: MobileFolderItem, i: number) => void
}