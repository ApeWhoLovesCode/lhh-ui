import React from 'react';
import { ScrollCircle } from 'lhh-ui';

const list = Array.from({length: 10}, (_, i) => ({ id: 'id' + i, title: i + '' }))
export default () => {

  return (
    <>
      <div style={{width: 400, height: 400}}>
        <ScrollCircle
          listLength={list.length}
          isPagination={false}
          centerPoint='center'
        >
          {list?.map((item, i) => (
            <ScrollCircle.Item
              key={i}
              index={i}
            >
              <div style={{width: 60, height: 60, border: '2px solid #aaa', userSelect: 'none'}}>
                <h4>{item.title}</h4>
              </div>
            </ScrollCircle.Item>
          ))}
        </ScrollCircle>
      </div>
    </>
  );
};
