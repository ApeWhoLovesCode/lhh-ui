import React, { useState, useEffect } from 'react';
import { ScrollCircle } from 'lhh-ui';

export default () => {
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    setTimeout(() => {
      const newList = new Array(10).fill('Hello').map((v, i) => ({ _id: 'id' + i, title: v + i }));
      setList(newList);
    }, 50);
  }, []);

  return (
    <div style={{position: 'relative', width: 400, height: 200}}>
      <ScrollCircle
        list={list}
        isAverage={false}
        isPagination={false}
        cardAddDeg={3}
      >
        {list?.map((item, i) => (
          <ScrollCircle.Item
            key={item._id}
            index={i}
            onClick={() => {
              console.log('点击了卡片的回调');
            }}
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
