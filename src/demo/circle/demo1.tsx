import { Circle } from 'lhh-ui';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState(50);
  return (
    <div style={{ width: 150 }}>
      <Circle lineCap="round" value={value} text={value} />
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
