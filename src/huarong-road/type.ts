import { NativeProps } from "../utils/native-props";

export type HuarongRoadProps = { 
  /**
   * 整体的宽度（高度等于宽度的1.25倍）
   * @default 100%
   */
  width?: string | number
  /** 
   * 英雄的位置
   * @default 
   * [
   *  [21, 1,  1,  22],
   *  [21, 1,  1,  22],
   *  [23, 24, 24, 25],
   *  [23, 31, 32, 25],
   *  [33, 0,  0,  34],
   * ]
   */
  locationArr?: HeroesIndex[][]
  /** 
   * 遍历item的数组的长度 (当children的长度和item不一致时请传入该值)
   * @default children 的长度
   */
  listLength?: number
  /** 
   * 滑块之间的间隙 单位px
   * @default 2
   */
  gap?: number
  /** 数量不够作为补充的卡片的类名*/
  fillItemClassName?: string
  /** 拼图完成了的回调 */
  onComplete?: () => void
  /** 拼图整体大小发生了变化的回调 */
  onResize?: (gridSize: number) => void
} & NativeProps

export type HuarongRoadItemProps = { 
  /** 当前item的索引（0:曹操，1-5:五虎将，6-9:卒） */
  index: number
  /** 
   * 触摸时间，触摸时长大于该值就无法触发 onClick
   * @default 150
   */
  touchTime?: number 
  /** 
   * 触摸距离，触摸距离大于该值就无法触发 onClick
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

/** 英雄的索引，1:boss，2?:五虎将(21代表两格是一个英雄)，3?:卒，0:空格 */
export type HeroesIndex = 1 | 21 | 22 | 23 | 24 | 25 | 31 | 32 | 33 | 34 | 0
