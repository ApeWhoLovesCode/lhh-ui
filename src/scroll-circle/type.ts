import { ReactNode } from 'react';
import { NativeProps } from '../utils/native-props';

export type ScrollCircleProps = {
  /** 传入卡片的数组 */
  list: any[];
  /**
   * 滚动列表的宽度
   * @default 100%
   */
  width?: string;
  /**
   * 滚动列表的高度
   * @default 100%
   */
  height?: string;
  /**
   * 卡片间增加的角度
   * @default 1
   */
  cardAddDeg?: number;
  /**
   * 索引为多少的卡片位于中间区域 从0开始算
   * @default 0
   */
  initCartNum?: number;
  /**
   * 卡片是否平均分配圆形轨迹
   * @default true
   */
  isAverage?: boolean;
  /**
   * 是否是顺时针 (注意：垂直方向时，顺逆是相反的)
   * @default true
   */
  isClockwise?: boolean;
  /**
   * 是否分页
   * @default true
   */
  isPagination?: boolean
  /** 左边分页箭头的内容区域 */
  leftArrow?: ReactNode;
  /** 右边分页箭头的内容区域 */
  rightArrow?: ReactNode;
  /** 发生触摸的回调 */
  onTouchStart?: () => void;
  /** 发生滚动的回调 */
  onTouchMove?: () => void;
  /** 触摸结束的回调 */
  onTouchEnd?: () => void;
  /** 分页触发回调改变页码 */
  onPageChange?: (page: { pageNum: number; pageSize: number }) => void;
} & NativeProps

export type ScrollCircleItemType = {
  /** 当前item的索引 */
  index: number;
  /** 点击了卡片(触摸时间小于150ms) */
  onClick?: (i: number) => void;
} & NativeProps

export type CircleInfoType = {
  /** 滚动盒子的宽/高 */
  circleWrapWH: number;
  /** 卡片宽/高 */
  cardWH: number;
  /** 圆的半径 */
  circleR: number;
  /** 可滚动区域高度对应的圆的角度 */
  scrollViewDeg: number;
};

export type CircleTouchType = {
  /** 记录滚动触摸的旋转度数 */
  startDeg: number;
  /** 当前是否是点击 */
  isClick: boolean;
};
