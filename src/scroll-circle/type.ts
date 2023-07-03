import { ReactNode } from 'react';
import { NativeProps } from '../utils/native-props';

export type ScrollCircleProps = {
  /** 传入卡片的数组长度 */
  listLength: number;
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
   * 圆心的位置
   * @default auto (宽度大于高度时在底部，否则在右侧)
   */
  centerPoint?: CenterPointType;
  /**
   * 圆的大小
   * @default outside (圆溢出包裹它的盒子)
   */
  circleSize?: 'outside' | 'inside'  
  /**
   * 当 circleSize = 'inside' 时，设置圆形的内边距
   * @default 5
   */
  circlePadding?: number
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
   * 是否将当前方向翻转
   */
  isFlipDirection?: boolean;
  /**
   * 是否分页
   * @default true
   */
  isPagination?: boolean
  /** 左边分页箭头的内容区域 */
  leftArrow?: ReactNode;
  /** 右边分页箭头的内容区域 */
  rightArrow?: ReactNode;
  /** 禁止触摸滚动 */
  disableTouch?: boolean
  /** 发生触摸的回调 */
  onTouchStart?: () => void;
  /** 发生滚动的回调 */
  onTouchMove?: () => void;
  /** 触摸结束的回调 */
  onTouchEnd?: () => void;
  /** 
   * 触摸结束的回调
   * @curIndex 当前处于正中的索引
   * @deg 当前旋转的角度
   */
  onScrollEnd?: (curIndex: number, deg: number) => void
  /** 分页触发回调改变页码 */
  onPageChange?: (page: { pageNum: number; pageSize: number }) => void;
} & NativeProps

export type ScrollCircleItemType = {
  /** 当前item的索引 */
  index: number;
  /** 点击了卡片(触摸时间小于150ms) */
  onClick?: (i: number) => void;
} & NativeProps

export type ScrollCircleInstance = {
  /** 旋转到指定角度或者指定索引 */
  scrollTo: (e: {deg?: number, index?: number, duration?: number}) => void
}

export type CenterPointType = 'auto' | 'center' | 'left' | 'top' | 'right' | 'bottom'

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
