import React from "react";
import { FloatingBall } from 'lhh-ui';

export default () => {
  return (
    <FloatingBall
      magnetic="x"
      style={{
        '--initial-position-top': '600px',
        '--initial-position-right': '20px',
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
      >吸边x</div>
    </FloatingBall>
  );
};