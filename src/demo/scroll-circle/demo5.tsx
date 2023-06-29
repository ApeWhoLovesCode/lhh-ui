import React, { useState } from 'react';
import { ScrollCircle } from 'lhh-ui';
import './index.less';
import { CenterPointType } from 'lhh-ui/scroll-circle/type';

const arr: CenterPointType[] = ['left','left', 'top','top', 'right','right', 'bottom','bottom']
const arrAuto: CenterPointType[] = ['auto','auto','auto','auto']
export default () => {
  const [list, setList] = useState<any[]>(
    Array.from({length: 16}, (_, i) => ({ _id: 'id' + i, title: i }))
  );

  const item = (v: CenterPointType, i: number) => (
    <div key={i} className='demo-scrollcircle-wrap' style={{width: 200, height: 200}}>
      <ScrollCircle
        list={list}
        isPagination={false}
        initCartNum={0}
        centerPoint={v}
        isClockwise={i % 2 === 1}
      >
        {list?.map((item, i) => (
          <ScrollCircle.Item
            key={item._id}
            index={i}
          >
            <div className='card' style={{width: 30, height: 30}}>
              {item.title}
            </div>
          </ScrollCircle.Item>
        ))}
      </ScrollCircle>
    </div>
  )

  return (
    <>
      <div style={{display: 'flex', flexWrap: 'wrap', width: 410}}>
        {arr.map((v, i) => (
          <div key={i} className='demo-scrollcircle-wrap' style={{width: 200, height: 200}}>
            {item(v, i)}
          </div>
        ))}
      </div>
      <div style={{display: 'flex', flexWrap: 'wrap', width: 810}}>
        {arr.map((v, i) => (
          <div key={i} className='demo-scrollcircle-wrap' style={{width: 200, height: i % 2 === 0 ? 200 : 250}}>
            {item(v, i)}
          </div>
        ))}
      </div>
    </>
  );
};
