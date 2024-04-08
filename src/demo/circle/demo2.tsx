import { Circle, classBem, isMobile } from 'lhh-ui';
import React, { useState } from 'react';
import './index.scss';

export default () => {
  const [value, setValue] = useState(50);
  return (
    <div>
      <div className={classBem('demo-circle-wrap', { mobile: isMobile() })}>
        <Circle value={value} strokeWidth={10} text="加粗" />
        <Circle
          value={value}
          layerColor="#cccccc"
          color="#D3F850"
          text="修改颜色"
        />
        <Circle value={value} size={120} text="修改大小" />
        <Circle value={value} clockwise={false} text="逆时针" />
      </div>
      <div style={{ marginTop: 10 }}>
        <button
          type="button"
          onClick={() => {
            setValue((v) => v + 20);
          }}
        >
          加20
        </button>
        <button
          type="button"
          onClick={() => {
            setValue((v) => v - 20);
          }}
        >
          减20
        </button>
      </div>
    </div>
  );
};
