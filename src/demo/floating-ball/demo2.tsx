import React from "react";
import { FloatingBall } from 'lhh-ui';
import './index.scss';

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
      <div className="ball">吸边x</div>
    </FloatingBall>
  );
};