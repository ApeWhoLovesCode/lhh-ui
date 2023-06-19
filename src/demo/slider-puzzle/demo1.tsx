import { isMobile, SliderPuzzle, SliderPuzzleInstance } from 'lhh-ui';
import React, { useRef, useState } from 'react';

export default () => {
  const puzzleRef = useRef<SliderPuzzleInstance>(null);
  const [isGameMode, setIsGameMode] = useState(false);
  const arr = Array.from({ length: 8 }, (_, i) => ({ id: `id-${i}` }));
  return (
    <div>
      <SliderPuzzle
        ref={puzzleRef}
        // 数组的长度需要设置
        listLength={arr.length}
        // 宽高必须设置
        style={{ width: '300px', height: '300px' }}
        isGameMode={isGameMode}
        onComplete={() => {
          alert('恭喜你完成了拼图');
        }}
      >
        {arr.map((item, index) => (
          <SliderPuzzle.Item key={item.id} index={index}>
            <h4 style={{ color: '#fff' }}>{item.id}</h4>
            <SliderPuzzle.Canvas index={index} />
          </SliderPuzzle.Item>
        ))}
        {/* 这里是完整的拼图 */}
        {isGameMode ? (
          <SliderPuzzle.Canvas
            style={{
              position: 'absolute',
              top: isMobile ? -100 : 0,
              left: isMobile ? 0 : 320,
              background: '#666',
            }}
          />
        ) : null}
      </SliderPuzzle>
      <div style={{ marginTop: 10 }}>
        <button
          type="button"
          onClick={() => {
            setIsGameMode((v) => !v);
          }}
        >
          {isGameMode ? '关闭' : '开启'}游戏模式
        </button>
        <button
          type="button"
          onClick={() => {
            puzzleRef.current?.reset();
          }}
        >
          重新开始
        </button>
      </div>
    </div>
  );
};
