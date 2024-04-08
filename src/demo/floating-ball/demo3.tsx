import React from "react";
import { FloatingBall } from 'lhh-ui';
import './index.scss';

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
      <div className="ball">仅y动</div>
    </FloatingBall>
  );
};