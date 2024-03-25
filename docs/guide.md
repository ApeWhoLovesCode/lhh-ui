---
nav:
  title: 快速上手
  order: 1
---

# 快速上手

## 相关技术

`react` , `hooks` , `ts`

## 安装

```bash
npm i lhh-ui
```


### 项目中使用

```js
import { SliderPuzzle } from 'lhh-ui';
import React from 'react';

// 拼图滑块
export default () => {
  return (
    <SliderPuzzle
      listLength={0}
      style={{ width: '300px', height: '300px' }}
    ></SliderPuzzle>
  );
};
```