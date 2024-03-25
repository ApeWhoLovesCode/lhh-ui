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

export default () => {
  return (
    <SliderPuzzle
      // 数组的长度需要设置
      listLength={0}
      // 宽高必须设置
      style={{ width: '300px', height: '300px' }}
      puzzleImg="http://lhh.codeape.site/img/tom.jpeg"
      onComplete={() => {
        setTimeout(() => {
          alert('恭喜你完成了拼图');
        }, 400);
      }}
    ></SliderPuzzle>
  );
};
```