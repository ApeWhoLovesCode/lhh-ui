import React, { useEffect, useState } from 'react';
import './index.less';
import { Skus, SkusItem } from 'lhh-ui';

const skuData: Record<string, string[]> = {
  '颜色': ['红','绿','蓝','黑','白','黄'],
  '大小': ['S','M','L','XL','XXL','MAX'],
  '款式': ['圆领','V领','条纹','渐变','轻薄','休闲'],
  '面料': ['纯棉','涤纶','丝绸','蚕丝','麻','鹅绒'],
  '群体': ['男','女','中性','童装','老年','青少年'],
  '价位': ['<30','<50','<100','<300','<800','<1500'],
}
const skuNames = Object.keys(skuData)

const radioArr = [0,1,2,3,4,5,6]

export default () => {
  const [checkValArr, setCheckValArr] = useState<number[]>([3, 3, 0, 3, 2, 0]);
  const [skusList, setSkusList] = useState<SkusItem[]>([]);
  // 库存为零对应的sku数组
  const [noStockSkus, setNoStockSkus] = useState<string[][]>([])

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
            {radioArr.map((value) => (
              <span 
                key={`${i}-${value}`} 
                className={`radio ${checkVal === value ? 'radio-active' : ''}`} 
                onClick={() => onChangeRadio(i, value)}
              >{value}</span>
            ))}
          </div>
        ))}
      </div>
      <Skus data={skusList} />
      <h5>还剩库存：{'-'}</h5>
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