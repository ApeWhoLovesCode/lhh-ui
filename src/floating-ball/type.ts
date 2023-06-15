import { NativeProps } from '../utils/native-props';

export type FloatingBallProps = {
  /**
   * 可以进行拖动的方向，xy 表示自由移动
   * @default xy
   */
  axis?: 'x' | 'y' | 'xy';
  /** 自动磁吸到边界 */
  magnetic?: 'x' | 'y';
  /** 贴边时触发 isLeft: true 代表是左或上方向上贴边 */
  onMagnetic?: (isLeft: boolean) => void;
  /** 位置偏移时触发 */
  onOffsetChange?: (offset: { x: number; y: number }) => void;
} & NativeProps<
  | '--initial-position-left'
  | '--initial-position-right'
  | '--initial-position-top'
  | '--initial-position-bottom'
  | '--z-index'
>;
