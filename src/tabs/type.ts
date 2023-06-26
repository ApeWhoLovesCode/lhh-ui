import { ReactNode } from 'react';
import { NativeProps } from '../utils/native-props';

export type TabProps = {
  /** 标题 */
  title?: ReactNode;
  /** key值 */
  key: string;
} & NativeProps;

export type TabsProps = {
  /** 当前激活 tab 的索引 默认为: 0 */
  activeIndex?: number;
  /** 传入数组，主要用于获取宽度等信息 */
  list?: any[];
  /** 激活的文字类名 */
  activeTextClass?: string;
  /** 激活的文字下划线，默认为一个图标 */
  activeLine?: ReactNode;
  /** 是否有默认动画 默认为true */
  isAnimate?: boolean;
  /** 激活的tab是否是基于屏幕居中 默认为false(基于tabs盒子居中) */
  isMiddleScreen?: boolean;
  /** 每个tab的类名，主要用于设置padding */
  tabClassName?: string;
  /** 左右预占位的盒子的类名，主要用于设置宽度 */
  placeholderBoxClass?: string;
  /** 当tab发生改变触发 */
  onChange?: (i: number) => void;
} & NativeProps;

export type TabsInstance = {
  /** 滚动到指定的位置 默认为 9999 滚动到最右边 */
  scrollTo: (v?: number) => void;
};
