---
nav:
  title: 快速上手
  order: 1
---

# 介绍

个人开发的 react 组件库，主要用于存放一些有意思的组件。

涉及技术：`react` , `hooks` , `ts`

## 快速上手

### 安装

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