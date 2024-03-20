import React from 'react';
import { ScrollCircle, ScrollCircleItem, isMobile } from 'lhh-ui';

const list = Array.from({length: 12}).map((_, i) => ({ id: 'id' + i, title: 'Hello' + i }));
export default () => {

  return (
    <div style={{width: isMobile() ? 300 : 400, height: 200}}>
      <ScrollCircle
        listLength={list.length}
        isPagination={false}
        initCartNum={2}
      >
        {list?.map((item, i) => (
          <ScrollCircleItem
            key={item.id}
            index={i}
            onClick={() => {
              console.log('点击了卡片的回调');
            }}
          >
            <div style={{width: 120, height: 80, border: '2px solid #aaa', userSelect: 'none'}}>
              <h4>{item.title}</h4>
            </div>
          </ScrollCircleItem>
        ))}
      </ScrollCircle>
    </div>
  );
};
