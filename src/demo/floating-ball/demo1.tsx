import React from "react";
import { FloatingBall } from 'lhh-ui';
import './index.scss';

export default () => {
  return (
    <FloatingBall
      style={{
        '--initial-position-top': '400px',
        '--initial-position-right': '20px',
        '--z-index': '1000',
      }}
    >
      <div className="ball">自由</div>
    </FloatingBall>
  );
};