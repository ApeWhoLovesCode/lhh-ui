---
title: floating-ball 悬浮球
nav:
  title: 组件
  path: /components
  order: 2
group:
  title: 一般组件
  order: 1
---

## 组件介绍

可在页面悬浮的一个悬浮球组件

## 演示

### 常规使用

```jsx
import React from "react";
import { FloatingBall } from 'lhh-ui';

export default () => {
  return (
    <FloatingBall
      style={{
        '--initial-position-top': '400px',
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
      >自由</div>
    </FloatingBall>
  );
};
```

### 吸附 X 边

```jsx
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
```

### 仅 Y 轴方向可移动

```jsx
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
```

## API

<API id="FloatingBall"></API>

