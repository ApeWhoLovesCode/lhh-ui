import React, { useState } from 'react';
import { ScrollCircle } from 'lhh-ui';
import './index.less';

export default () => {
  const [list, setList] = useState<any[]>(
    Array.from({length: 12}, (_, i) => ({ _id: 'id' + i, title: 'Hello' + i }))
  );

  return (
    <div className='demo-scrollcircle-wrap' style={{width: 400, height: 400}}>
      <ScrollCircle
        list={list}
        isPagination={false}
        initCartNum={2}
        centerPoint='center'
        circleSize='inside'
      >
        {list?.map((item, i) => (
          <ScrollCircle.Item
            key={item._id}
            index={i}
          >
            <div className='card' style={{width: 50, height: 50}}>
              {item.title}
            </div>
          </ScrollCircle.Item>
        ))}
      </ScrollCircle>
    </div>
  );
};
