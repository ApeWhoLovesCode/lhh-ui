import React, { useRef } from 'react';
import { ScrollCircle, ScrollCircleInstance } from 'lhh-ui';

const list = Array.from({length: 16}, (_, i) => ({ _id: 'id' + i, title: i }))
export default () => {
  const scrollCircleRef = useRef<ScrollCircleInstance>(null)

  return (
    <>
      <div style={{width: 400, height: 200}}>
        <ScrollCircle
          ref={scrollCircleRef}
          listLength={list.length}
          isPagination={false}
          initCartNum={2}
          onScrollEnd={(index, deg) => {
            console.log(index, deg);
          }}
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
      <button onClick={() => {scrollCircleRef.current?.scrollTo({index: 9})}}>旋转到索引为9的卡片</button>
      <button onClick={() => {scrollCircleRef.current?.scrollTo({deg: 120})}}>旋转到120度</button>
    </>
  );
};
