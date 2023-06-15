import React from "react";
import { FloatingBall } from 'lhh-ui';

export default () => {
  return (
    <div className="demo-floating-ball">
      <FloatingBall
        style={{
          '--initial-position-bottom': '100px',
          '--initial-position-left': '0',
          '--z-index': '1000',
        }}
      >
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 50,
            height: 50,
            background: '#4285fb',
            userSelect: 'none',
          }}
        >自由</div>
      </FloatingBall>
    </div>
  );
};