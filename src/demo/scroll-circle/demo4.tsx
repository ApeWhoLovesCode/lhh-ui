import React, { useState, useEffect } from 'react';
import { ScrollCircle } from 'lhh-ui';

export default () => {
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    setTimeout(() => {
      const newList = new Array(12).fill('Hello').map((v, i) => ({ _id: 'id' + i, title: v + i }));
      setList(newList);
    }, 50);
  }, []);

  return (
    <div style={{position: 'relative', width: 200, height: 400}}>
      <ScrollCircle
        list={list}
        isPagination={false}
        initCartNum={2}
      >
        {list?.map((item, i) => (
          <ScrollCircle.Item
            key={item._id}
            index={i}
            onClick={() => {
              console.log('点击了卡片的回调');
            }}
          >
            <div style={{width: 100, height: 130, border: '2px solid #aaa', userSelect: 'none'}}>
              <h4>{item.title}</h4>
            </div>
          </ScrollCircle.Item>
        ))}
      </ScrollCircle>
    </div>
  );
};
