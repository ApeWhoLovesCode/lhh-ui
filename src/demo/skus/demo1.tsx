import React, { useEffect, useState } from 'react';
import './index.scss';
import { Skus, SkusItem } from 'lhh-ui';
import { getSkusData, skuNames } from './utils';

export default () => {
  const [checkValArr, setCheckValArr] = useState<number[]>([4, 5, 2, 3, 0, 0]);
  // const [checkValArr, setCheckValArr] = useState<number[]>([6,6,6,6,6,6]);
  const [skusList, setSkusList] = useState<SkusItem[]>([]);
  // 库存为零对应的sku数组
  const [noStockSkus, setNoStockSkus] = useState<string[][]>([])
  const [stock, setStock] = useState<number>();

  useEffect(() => {
    const checkValTrueArr = checkValArr.filter(Boolean)
    const _noStockSkus: string[][] = [[]]
    const list = getSkusData(checkValTrueArr, _noStockSkus)
    setSkusList(list)
    setNoStockSkus([..._noStockSkus])
    setStock(void 0)
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