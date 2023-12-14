import React, { useEffect, useState } from 'react';
import './index.less';
import { Skus, SkusItem } from 'lhh-ui';
import { skuData, skuNames } from './utils';

export default () => {
  const [checkValArr, setCheckValArr] = useState<number[]>([4, 5, 2, 3, 0, 0]);
  const [skusList, setSkusList] = useState<SkusItem[]>([]);
  // 库存为零对应的sku数组
  const [noStockSkus, setNoStockSkus] = useState<string[][]>([])
  const [stock, setStock] = useState<number>();

  const getSkus = () => {
    const checkValTrueArr = checkValArr.filter(Boolean)
    const skus: SkusItem[] = []
    const _noStockSkus: string[][] = [[]]
    // 对应 skuState 中各 sku ，主要用于下面遍历时，对 product 中 skus 的索引操作
    const indexArr = Array.from({length: checkValTrueArr.length}, () => 0);
    // 需要遍历的总次数
    const total = checkValTrueArr.reduce((pre, cur) => pre * (cur || 1), 1)
    for(let i = 1; i <= total; i++) {
      const sku: SkusItem = {
        // 库存：60%的几率为0-50，40%几率为0
        stock: Math.floor(Math.random() * 10) >= 4 ? Math.floor(Math.random() * 50) : 0,
        params: [],
      }
      // 生成每个 sku 对应的 params 
      let skuI = 0;
      skuNames.forEach((name, j) => {
        if(checkValArr[j]) {
          const value = skuData[name][indexArr[skuI]]
          sku.params.push({
            name,
            value,
          })
          skuI++;
        }
      })
      skus.push(sku)

      indexArr[indexArr.length - 1]++;
      for(let j = indexArr.length - 1; j >= 0; j--) {
        if(indexArr[j] >= checkValTrueArr[j] && j !== 0) {
          indexArr[j - 1]++
          indexArr[j] = 0
        }
      }

      if(!sku.stock) {
        _noStockSkus.at(-1)?.push(sku.params.map(p => p.value).join(' / '))
      }
      if(indexArr[0] === _noStockSkus.length && _noStockSkus.length < checkValTrueArr[0]) {
        _noStockSkus.push([])
      }
    }
    setSkusList(skus)
    console.log('skus: ', skus);
    setNoStockSkus([..._noStockSkus])
  }
  
  useEffect(() => {
    getSkus()
  }, [checkValArr])

  const onChangeRadio = (i: number, value: number) => {
    setCheckValArr(arr => {
      arr[i] = value
      return [...arr]
    })
  }

  return (
    <div className='demo-skus'>
      <div className="skus-info">
        {checkValArr.map((checkVal, i) => (
          <div className='radio-wrap' key={i}>
            <span>{skuNames[i]}:</span>
            {[0,1,2,3,4,5,6].map((value) => (
              <span 
                key={`${i}-${value}`} 
                className={`radio ${checkVal === value ? 'radio-active' : ''}`} 
                onClick={() => onChangeRadio(i, value)}
              >{value}</span>
            ))}
          </div>
        ))}
      </div>
      <Skus 
        data={skusList} 
        onChange={(checkSkus, curSku) => {
          console.log('onChange: ', checkSkus, curSku);
          setStock(curSku?.stock)
        }} 
      />
      <h5>还剩库存：{stock ?? '-'}</h5>
      <h5> ------------- 库存为零的sku: ------------- </h5>
      <div className="bottom">
        {noStockSkus.map((skus, i) => (
          <div key={i} className="list">
            {skus.map(sku => (
              <div key={sku} className="item">{sku}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}