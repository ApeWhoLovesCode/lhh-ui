import { NativeProps } from '../utils/native-props';

export type ScrollViewProps = {
  /** 
   * 滚动区域的高度
   * @default 整个页面中可占据的高度
   */
  height?: number | string
  /** 
   * 距离底部多远时触发 onScrollToLower
   * @default 30
   */
  lowerThreshold?: number
  /** 滚动到底部触发的事件 */
  onScrollToLower?: () => void
} & NativeProps;