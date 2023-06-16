import React from "react";
import { FloatingBall } from 'lhh-ui';

export default () => {
  return (
    <FloatingBall
      axis="y"
      style={{
        '--initial-position-bottom': '100px',
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
      >仅y动</div>
    </FloatingBall>
  );
};