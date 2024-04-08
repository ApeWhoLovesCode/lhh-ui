import React, { useState } from 'react';
import './index.scss';
import { Skus, SkusItem } from 'lhh-ui';
import { getSkusData } from './utils';

export default () => {
  const [skusList] = useState<SkusItem[]>(getSkusData([5, 4, 3, 2]));

  return (
    <div className='demo2-skus'>
      <Skus 
        data={skusList} 
        onChange={(checkSkus, curSku) => {
          console.log('onChange: ', checkSkus, curSku);
        }} 
        customRender={(list, selectSkus) => list.map(p => (
          <div key={p.name}>
            <h5>{p.name}</h5>
            <div className='sku-wrap'>
              {p.values.map((sku) => (
                <div 
                  key={p.name + sku.value} 
                  onClick={() => selectSkus(p.name, sku)}
                >
                  <span className={`sku ${sku.isChecked ? 'sku-active' : ''} ${sku.disabled ? 'sku-disabled' : ''}`}>
                    {sku.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))} 
      />
    </div>
  )
}