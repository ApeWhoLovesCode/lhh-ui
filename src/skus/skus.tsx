import React, { useCallback, useEffect, useRef, useState } from 'react';
import { withNativeProps } from '../utils/native-props';
import useMergeProps from '../hooks/useMergeProps';
import { RenderSkuItem, RenderSkuItemValue, SkusItem, SkusItemParam, SkusProps } from './type'
import { classBem } from '../utils';

type SkuStateItem = {
  value: string;
  /** 与该sku搭配时，该禁用的sku组合 */
  disabledSkus: string[][];
}[];

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
  const getSkuStock = (item: SkusItem) => item[skuItemKey.stock as (keyof SkusItem)] as number
  const getSkuParams = (item: SkusItem) => item[skuItemKey.params as (keyof SkusItem)] as SkusItem['params']
  const getSkuParamName = (item: SkusItemParam) => item[skuItemKey.paramName as (keyof SkusItemParam)] as SkusItemParam['name']
  const getSkuParamValue = (item: SkusItemParam) => item[skuItemKey.paramValue as (keyof SkusItemParam)] as SkusItemParam['value']

  // 转化成遍历判断用的数据类型
  const [skuState, setSkuState] = useState<Record<string, SkuStateItem>>({});
  // 当前选中的sku值
  const [checkSkus, setCheckSkus] = useState<Record<string, string>>({});
  /** 如果 sku 的排列是按顺序的，整齐的，那么当勾选完 sku 时，回调获取到 item 的算法会有很大的优化 */
  const isInOrder = useRef(true)

  useEffect(() => {
    if(!data?.length) return
    const _checkSkus: Record<string, string> = {}
    // 用于判断当前sku到哪个分类下了
    const skuNameIndexArr: number[] = [] 
    const skuNameArr: string[][] = []
    const _skuState = getSkuParams(data[0]).reduce((pre, cur) => {
      pre[getSkuParamName(cur)] = [{value: getSkuParamValue(cur), disabledSkus: []}]
      _checkSkus[getSkuParamName(cur)] = ''
      skuNameIndexArr.push(0)
      skuNameArr.push([cur.value])
      return pre
    }, {} as Record<string, SkuStateItem>)
    setCheckSkus(_checkSkus)

    data.slice(1).forEach(item => {
      const skuParams = getSkuParams(item)
      skuParams.forEach((p, i) => {
        const pName = getSkuParamName(p)
        const pValue = getSkuParamValue(p)
        // 当前 params 不在 _skuState 中
        if(!_skuState[pName]?.find(params => params.value === pValue)) {
          _skuState[pName].push({value: pValue, disabledSkus: []})
        }
        if(isInOrder.current) {
          if(pName !== getSkuParamName(getSkuParams(data[0])[i])) {
            isInOrder.current = false
          } else {
            if(!skuNameArr[i].includes(pValue)) {
              skuNameArr[i].push(pValue)
            }
          }
        }
      })
    })

    data.forEach(sku => {
      const skuParams = getSkuParams(sku)
      // 计算sku是否是按顺序排列的
      if(isInOrder.current) {
        const isSame = skuParams.every((p, i) => (
          skuNameArr[i][skuNameIndexArr[i]] === getSkuParamValue(p)
        ))
        if(isSame) {
          skuNameIndexArr[skuNameIndexArr.length - 1]++;
          for(let j = skuNameIndexArr.length - 1; j >= 0; j--) {
            if(j !== 0 && skuNameIndexArr[j] >= skuNameArr[j].length) {
              skuNameIndexArr[j - 1]++
              skuNameIndexArr[j] = 0
            }
          }
        } else {
          isInOrder.current = false
        }
      }

      // 遍历获取库存需要禁用的sku
      const stock = getSkuStock(sku) 
      if(
        typeof stock === 'number' && 
        isStockGreaterThan ? stock >= stockLimitValue : stock <= stockLimitValue
      ) {
        const curSkuArr = skuParams.map(p => p.value)
        for(const name in _skuState) {
          const curSkuItem = _skuState[name].find(v => curSkuArr.includes(v.value))
          curSkuItem?.disabledSkus?.push(
            skuParams.reduce((pre, p) => {
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
      if(isInOrder.current) {
        let skuI = 0;
        // 由于sku是按顺序排列的，所以索引可以通过计算得出
        Object.keys(_checkSkus).forEach((name, i) => {
          const index = skuState[name].findIndex(v => v.value === _checkSkus[name])
          const othTotal = Object.values(skuState).slice(i + 1).reduce((pre, cur) => (pre *= cur.length), 1)
          skuI += index * othTotal;
        })
        return data?.[skuI]
      }
      // 这样需要遍历太多次
      return data.find(s => (
        getSkuParams(s).every(p => _checkSkus[getSkuParamName(p)] === getSkuParamValue(p))
      ))
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