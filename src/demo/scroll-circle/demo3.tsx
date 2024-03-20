import React from 'react';
import { ScrollCircle, isMobile } from 'lhh-ui';

const list = Array.from({length: 10}, (_, i) => ({ id: 'id' + i, title: 'Hello' + i }))
export default () => {

  return (
    <div style={{width: isMobile() ? 300 : 400, height: 200}}>
      <ScrollCircle
        listLength={list.length}
        isAverage={false}
        isPagination={false}
        cardAddDeg={3}
      >
        {list?.map((item, i) => (
          <ScrollCircle.Item
            key={item.id}
            index={i}
          >
            <div style={{width: 120, height: 80, border: '2px solid #aaa', userSelect: 'none'}}>
              <h4>{item.title}</h4>
            </div>
          </ScrollCircle.Item>
        ))}
      </ScrollCircle>
    </div>
  );
};
