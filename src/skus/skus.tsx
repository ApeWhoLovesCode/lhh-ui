import React, { useCallback, useEffect, useRef, useState } from 'react';
import { withNativeProps } from '../utils/native-props';
import useMergeProps from '../hooks/useMergeProps';
import { RenderSkuItem, RenderSkuItemValue, SkusItem, SkusProps } from './type'
import { classBem } from '../utils';

type SkuStateItem = {
  value: string;
  /** 与该sku搭配时，该禁用的sku组合 */
  disabledSkus: string[][];
}[];;

const classPrefix = `lhhui-skus`;

const defaultProps = {
  stockLimitValue: 0
}
type RequireType = keyof typeof defaultProps

const Skus = (comProps: SkusProps) => {
  const props = useMergeProps<SkusProps, RequireType>(comProps, defaultProps)
  const { data, customRender, onChange, skuItemKey: propsSkuItemKey, stockLimitValue, isStockGreaterThan, ...ret } = props
  const skuItemKey = {
    stock: 'stock',
    params: 'params',
    paramName: 'name',
    paramValue: 'value',
    ...propsSkuItemKey
  }
  // 转化成遍历判断用的数据类型
  const [skuState, setSkuState] = useState<Record<string, SkuStateItem>>({});
  // 当前选中的sku值
  const [checkSkus, setCheckSkus] = useState<Record<string, string>>({});
  /** sku 的排列是按顺序的，整齐的 */
  const isInOrder = useRef(true)

  useEffect(() => {
    if(!data?.length) return
    const _checkSkus: Record<string, string> = {}
    const _skuState = data[0].params.reduce((pre, cur) => {
      pre[cur.name] = [{value: cur.value, disabledSkus: []}]
      _checkSkus[cur.name] = ''
      return pre
    }, {} as Record<string, SkuStateItem>)
    setCheckSkus(_checkSkus)

    let skuNameIndex = 0; // 用于判断当前sku到哪个分类下了
    data.slice(1).forEach(item => {
      item.params.forEach((p, i) => {
        // 当前 params 不在 _skuState 中
        if(!_skuState[p.name]?.find(params => params.value === p.value)) {
          _skuState[p.name].push({value: p.value, disabledSkus: []})
        }
        if(isInOrder.current && p.name !== data[0].params[i].name) {
          isInOrder.current = false
        }
      })
    })

    // 遍历获取库存需要禁用的sku
    data.forEach(sku => {
      const stock = sku[skuItemKey.stock as (keyof SkusItem)] as number
      if(
        typeof stock === 'number' && 
        isStockGreaterThan ? stock >= stockLimitValue : stock <= stockLimitValue
      ) {
        const curSkuArr = sku.params.map(p => p.value)
        for(const name in _skuState) {
          const curSkuItem = _skuState[name].find(v => curSkuArr.includes(v.value))
          curSkuItem?.disabledSkus?.push(
            sku.params.reduce((pre, p) => {
              if(p.name !== name) {
                pre.push(p.value)
              }
              return pre
            }, [] as string[])
          )
        }
      }
    })
    setSkuState(_skuState)
  }, [data])

  const renderSkus = useCallback(() => {
    const isCheckValue = !!Object.keys(checkSkus).length
    
    const isSkuDisable = (skuName: string, sku: SkuStateItem[number]) => {
      if(!sku.disabledSkus.length) return false
      // 当一开始没有选中值时，判断某个sku是否为禁用
      if(!isCheckValue) {
        let checkTotal = 1;
        for(const name in skuState) {
          if(name !== skuName) {
            checkTotal *= skuState[name].length
          }
        }
        return sku.disabledSkus.length === checkTotal
      }

      // 排除当前的传入的 sku 那一行
      const newCheckSkus: Record<string, string> = {...checkSkus}
      delete newCheckSkus[skuName]

      // 当前选中的 sku 一共能有多少种组合
      let total = 1;
      for(const name in newCheckSkus) {
        if(!newCheckSkus[name]) {
          total *= skuState[name].length
        }
      }

      // 选中的 sku 在禁用数组中有多少组
      let num = 0;
      for(const strArr of sku.disabledSkus) {
        if(Object.values(newCheckSkus).every(str => !str ? true : strArr.includes(str))) {
          num++;
        }
      }

      return num === total
    }

    const getCurSkuItem = (_checkSkus: Record<string, string>) => {
      const length = Object.keys(skuState).length
      if(!length || Object.values(_checkSkus).filter(Boolean).length < length) return void 0
      let skuI = 0;
      // 由于sku是按顺序排列的，所以索引可以通过计算得出
      Object.keys(_checkSkus).forEach((name, i) => {
        const index = skuState[name].findIndex(v => v.value === _checkSkus[name])
        const othTotal = Object.values(skuState).slice(i + 1).reduce((pre, cur) => (pre *= cur.length), 1)
        skuI += index * othTotal;
      })
      return data?.[skuI]
      // 这样需要遍历太多次
      // return product?.skus.find(s => (
      //   s.params?.every((p, i) => checkSkus[i] === p.value)
      // ))?.stock
    }

    const selectSkus = (skuName: string, {value, disabled, isChecked}: RenderSkuItemValue) => {
      const _checkSkus = {...checkSkus}
      _checkSkus[skuName] = isChecked ? '' : value;
      const curSkuItem = getCurSkuItem(_checkSkus)
      onChange?.(_checkSkus, {
        skuName,
        value,
        disabled,
        isChecked: disabled ? false : !isChecked,
        dataItem: curSkuItem,
        stock: curSkuItem?.stock
      })
      if(!disabled) {
        setCheckSkus(_checkSkus)
      }
    }

    /** 用于渲染的列表 */
    const list: RenderSkuItem[] = []
    for(const name in skuState) {
      list.push({
        name,
        values: skuState[name].map(sku => {
          const isChecked = sku.value === checkSkus[name]
          const disabled = isChecked ? false : isSkuDisable(name, sku)
          return { value: sku.value, disabled, isChecked }
        })
      })
    }

    if(customRender) {
      return customRender(list, selectSkus)
    }

    return list?.map((p) => (
      <div key={p.name}>
        <div className={`${classPrefix}-params-title`}>{p.name}</div>
        <div className={`${classPrefix}-params-area`}>
          {p.values.map((sku) => (
            <div 
              key={p.name + sku.value} 
              onClick={() => selectSkus(p.name, sku)}
            >
              <span className={classBem(`${classPrefix}-sku`, {active: sku.isChecked, disabled: sku.disabled})}>
                {sku.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    ))
  }, [skuState, checkSkus, setCheckSkus])
  
  return withNativeProps(
    ret,
    <div className={classPrefix}>
      {renderSkus()}
    </div>
  )
}

export default Skus