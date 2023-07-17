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
   * 动画时间
   * @default 4000 (单位: ms)
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
  /** 
   * 初始化时开始动画的延迟时间
   * @default 100 (单位: ms)
   */
  delayTime?: number
} & NativeProps

export type AnimationWrapName = 'curtain'
export type AnimationWrapPosition = 'top' | 'right' | 'bottom' | 'left' | 'right-bottom' | 'right-top' | 'left-bottom' | 'left-top'

export type AnimationWrapInstance = {
  run: () => void
}