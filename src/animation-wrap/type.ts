import { NativeProps } from "lhh-ui";

export type AnimationWrapProps = { 
  /** 
   * 动画的名称 
   * @default curtain
   * */
  name?: AnimationWrapName
  /** 
   * 动画的方向 
   * @default right
   */
  position?: AnimationWrapPosition
  /** 
   * 方向 
   * @default 8000 (单位: ms)
   */
  duration?: number
  /**
   * 文本的背景色
   * @default #ffffff
   */
  background?: string
  /**
   * 初始化时触发动画
   * @default true
   */
  isInitTrigger?: boolean
} & NativeProps

export type AnimationWrapName = 'curtain'
export type AnimationWrapPosition = 'top' | 'right' | 'bottom' | 'left' | 'right-bottom' | 'right-top' | 'left-bottom' | 'left-top'

export type AnimationWrapInstance = {
  run: () => void
}