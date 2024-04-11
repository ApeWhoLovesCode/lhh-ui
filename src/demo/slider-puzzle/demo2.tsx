import { SliderPuzzle, isMobile } from 'lhh-ui';
import React from 'react';

const list = Array.from({ length: 15 }, (_, i) => ({ id: `${i}` }));
export default () => {
  return (
    <SliderPuzzle
      // 数组的长度需要设置
      listLength={list.length}
      // 宽高必须设置
      style={{ width: '300px', height: '300px' }}
      size={4}
      gap={10}
      puzzleColor="#1677ff"
      onComplete={() => {
        setTimeout(() => {
          alert('恭喜你完成了拼图');
        }, 400);
      }}
    >
      {list.map((item, index) => (
        <SliderPuzzle.Item
          key={item.id}
          index={index}
          style={{ background: '#eee' }}
        >
          <h6>{item.id}</h6>
          <SliderPuzzle.Canvas index={index} />
        </SliderPuzzle.Item>
      ))}
      {/* 这里是完整的拼图 */}
      <SliderPuzzle.Canvas
        style={{
          position: 'absolute',
          top: isMobile() ? -80 : 0,
          left: isMobile() ? 0 : 320,
        }}
      />
    </SliderPuzzle>
  );
};
