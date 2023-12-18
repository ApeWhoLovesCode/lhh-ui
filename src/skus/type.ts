import { ReactNode } from "react";
import { NativeProps } from "../utils/native-props";

export type SkusProps = { 
  /** 传入的skus数据列表 */
  data: SkusItem[]
  /** 
   * 用于替换 data 中 item 的 key 值 
   * （即 SkusItem 类型中对应的 key ） 
   */
  skuItemKey?: SkuItemKey
  /**
   * sku 库存的限制值，当小于等于该值时会禁用该sku的选择
   * @default 0
   */
  stockLimitValue?: number 
  /** 
   * stockLimitValue 的限制值是否是大于等于
   * @default false (小于等于)
   */
  isStockGreaterThan?: boolean
  /** 点击sku的改变回调 */
  onChange?: (checkSkus: Record<string, string>, cur?: SkusChangeParams) => void
  /** 自定义渲染的sku */
  customRender?: (
    /** 用于渲染的列表 */
    list: RenderSkuItem[], 
    /** 点击选中sku */
    selectSkus: (skuName: string, sku: RenderSkuItemValue) => void
  ) => ReactNode
} & NativeProps

export type SkusItem = {
  /** 库存 */
  stock?: number;
  /** sku参数 */
  params: SkusItemParam[];
  // ... 其他省略
};

export type SkusItemParam = {
  name: string;
  value: string;
}

export type RenderSkuItem = {
  name: string;
  values: RenderSkuItemValue[];
}

export type RenderSkuItemValue = {
  /** sku的值 */
  value: string;
  /** 选中状态 */
  isChecked: boolean
  /** 禁用状态 */
  disabled: boolean;
}

export type SkuItemKey = {
  stock?: string
  params?: string
  paramName?: string
  paramValue?: string
}

export type SkusChangeParams = {
  /** 当前点击的sku分类名称 */
  skuName: string
  /** 当前点击的 sku */
  value: string
  /** 点击后是否是选中的 */
  isChecked: boolean
  /** 是否是禁用的 */
  disabled: boolean
  /** 当前选中sku在data中对应的item */
  dataItem?: any
  /** 当前选中的库存 */
  stock?: number
}