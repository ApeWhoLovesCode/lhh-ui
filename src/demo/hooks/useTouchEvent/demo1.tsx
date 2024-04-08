import { useTouchEvent } from "lhh-ui";
import React, { useRef, useState } from "react";
import './index.scss';

export default () => {
  const domInfo = useRef({
    startX: 0,
    startY: 0,
  })
  const [dom, setDom] = useState({
    x: 0,
    y: 0,
  });

  const { info, onTouchFn } = useTouchEvent({
    onTouchStart() {
      domInfo.current.startX = dom.x
      domInfo.current.startY = dom.y
    },
    onTouchMove() {
      setDom({ 
        x: domInfo.current.startX + info.deltaX, 
        y: domInfo.current.startY + info.deltaY 
      });
    },
    onTouchEnd(e) {
      console.log('onTouchEnd: ', e);
    },
  });

  return (
    <div className="demo-useTouchEvent">
      <div
        className="ball"
        style={{
          transform: `translate(${dom.x}px, ${dom.y}px)`,
          // 移动端下，建议添加该属性
          touchAction: 'none'
        }}
        {...onTouchFn}
      >
        移动
      </div>
    </div>
  );
}