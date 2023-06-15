import { NativeProps } from "../utils/native-props";

export type SliderPuzzleProps = { 
  /** 
   * 遍历item的数组的长度，建议是size * size - 1
   * @default 0
   */
  listLength?: number
  /** 
   * n*n的拼图
   * @default 3
   */
  size?: number
  /** 
   * 拼图块之间的间隙 单位px
   * @default 2
   */
  gap?: number
  /**
   * 背景颜色
   * @default #1f1f1f
   */
  background?: string
  /**
   * 是否开启游戏模式
   * @default false
   */
  isGameMode?: boolean
  /**
   * 数量不够作为补充的卡片的背景颜色
   * @default #3e3e3e
   */
  fillPuzzleItemBackground?: string
  /** 拼图完成了的回调 */
  onComplete?: () => void
  /** 拼图整体大小发生了变化的回调 */
  onResize?: (grid: {w: number, h: number}) => void
} & NativeProps & Omit<SliderPuzzleCanvasProps, 'index'>

export type SliderPuzzleItemProps = { 
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

export type SliderPuzzleCanvasProps = { 
  /** 当前item的索引，不传则代表的是全图 */
  index?: number
  /** 
   * 设置拼图的不透明度 0-1
   * @default 0.5
   */
  globalAlpha?: number
  /**
   * 拼图颜色
   * @default #ddeafb
   */
  puzzleColor?: string
  /**
   * 游戏模式下的背景颜色
   * @default #3e3e3e
   */
  gameModeBackground?: string
  /** 传入拼图的图片 */
  puzzleImg?: string
} & NativeProps

export type SliderPuzzleInstance = {
  reset: () => void
}

export type GridPosition = {row: number, col: number}