import { ReactNode } from 'react';
import { NativeProps } from '../utils/native-props';

export type CirclePropsType = {
  /** 其中的文本信息 */
  text?: ReactNode;
  /** 线条的端点样式 */
  lineCap?: CanvasLineCap;
  /**
   * @description 进度值 最小为0 最大为100
   * @default 0
   */
  value?: number;
  /**
   * 速度
   * @default 100
   */
  speed?: number;
  /**
   * 大小
   * @default 60
   */
  size?: number;
  /** 为圆环中填充颜色 */
  fill?: string;
  /** 进度条的底色 */
  layerColor?: string;
  /** 颜色 */
  color?: string | Record<string, string>;
  /**
   * 线的宽度
   * @default 6
   */
  strokeWidth?: number;
  /**
   * 是否是顺时针方向的
   * @default true
   */
  clockwise?: boolean;
  children?: ReactNode;
} & NativeProps<'--text-color' | '--text-font-size'>;
