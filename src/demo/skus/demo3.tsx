import React, { useState } from 'react';
import './index.scss';
import { Skus, SkusItem } from 'lhh-ui';
import { getSkusData } from './utils';

type NewSkusItem = {
  newStock: number
  params: SkusItem['params']
}

export default () => {
  const [skusList] = useState<NewSkusItem[]>(
    getSkusData([5, 4, 3, 2], void 0, true) as unknown as NewSkusItem[]
  );

  return (
    <div className='demo3-skus'>
      <Skus
        data={skusList}
        skuItemKey={{
          stock: 'newStock'
        }}
        onChange={(_, curSku) => {
          console.log('onChange: ', curSku?.dataItem);
        }}
      />
    </div>
  )
}