import { ReactNode } from "react";
import { NativeProps } from "../utils/native-props";

export type HuarongRoadProps = { 
  /** 
   * 遍历item的数组的长度，建议是 size * size - 1
   * @default children 的长度
   */
  listLength?: number
  /** 
   * 英雄们，不传，则按照index索引（0:boss，1-5:五虎将，6-9:小兵）
   */
  heroes?: Heroes
  /** 
   * 英雄的位置
   * @default [
   *  [21, 1,  1,  22],
   *  [21, 1,  1,  22],
   *  [23, 24, 24, 25],
   *  [23, 31, 32, 25],
   *  [33, 0,  0,  34],
   * ]
   */
  locationArr?: HeroesIndex[][]
  /** 
   * 是否自定义
   * @default false
   */
  isCustom?: boolean
  /** 
   * 拼图块之间的间隙 单位px
   * @default 2
   */
  gap?: number
  /**
   * 宽度，高度等于宽度的1.25倍
   * @default 100%
   */
  width?: string | number
  /**
   * 背景颜色
   * @default #1f1f1f
   */
  background?: string
  /** 数量不够作为补充的卡片的类名*/
  fillItemClassName?: string
  /** 拼图完成了的回调 */
  onComplete?: () => void
  /** 拼图整体大小发生了变化的回调 */
  onResize?: (grid: {w: number, h: number}) => void
} & NativeProps

export type HuarongRoadItemProps = { 
  /** 当前item的索引 */
  index: number
  /** 
   * 触摸时间，触摸时长大于该值就无法触发点击回调
   * @default 150
   */
  touchTime?: number 
  /** 
   * 触摸距离，触摸距离大于该值就无法触发点击回调
   * @default 8
   */
  touchDistance?: number 
  /** 是否需要鼠标hover的样式，想自定义hover，可以直接传入className */
  isHover?: boolean
  /** 点击了卡片(触摸时间小于150ms) */
  onClick?: (i: number) => void;
} & NativeProps

export type HuarongRoadInstance = {
  reset: () => void
}

export type Heroes = {
  /** 站四个位置的boss */
  boss: ReactNode
  /** 五虎将，只会渲染前五个 */
  generals: ReactNode[]
  /** 四个小兵，只会渲染前4个 */
  soldiers: ReactNode[]
}

/** 英雄的索引，1:boss，2?:五虎将(21代表两格是一个英雄)，3?:小兵，0:空格 */
export type HeroesIndex = 1 | 21 | 22 | 23 | 24 | 25 | 31 | 32 | 33 | 34 | 0

export type General = {
  children: ReactNode
  /** 是否是竖着的 */
  isVertical: boolean
}