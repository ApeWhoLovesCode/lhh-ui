---
title: slider-puzzle 滑块拼图
nav:
  title: 组件
  path: /components
  order: 2
group:
  title: 非常规组件
  order: 1
---

## 组件介绍

一种拼图滑块，类似华容道那样。

## 演示

### 常规使用

```jsx
import React, { useState } from "react";
import { SliderPuzzle, isMobile } from 'lhh-ui';

export default () => {
  const [isGameMode, setIsGameMode] = useState(false);
  const arr = Array.from({length: 8}, (_, i) => ({id: `id-${i}`}))
  return (
    <div>
      <SliderPuzzle 
        // 数组的长度需要设置
        listLength={arr.length} 
        // 宽高必须设置
        style={{width: '300px', height: '300px'}}
        isGameMode={isGameMode}
        onComplete={() => {
          alert('恭喜你完成了拼图')
        }}
      >
        {arr.map((item, index) => (
          <SliderPuzzle.Item key={item.id} index={index}>
            <h4 style={{color: '#fff'}}>{item.id}</h4>
            <SliderPuzzle.Canvas index={index} />
          </SliderPuzzle.Item>
        ))}
        {/* 这里是完整的拼图 */}
        {isGameMode ? (
          <SliderPuzzle.Canvas 
            style={{
              position: 'absolute',
              top: isMobile ? -100 : 0,
              left: isMobile ? 0 : 320, 
              background: '#666'
            }} 
          />
        ) : null}
      </SliderPuzzle>
      <button onClick={() => {setIsGameMode(v => !v)}} style={{marginTop: 10}}>
        {isGameMode ? '关闭' : '开启'}游戏模式
      </button>
    </div>
  )
}
```
<!-- <code src="./demo/demo1.tsx"></code> -->

### 4*4拼图块 以及间距等调整

```jsx
import React from "react"
import { SliderPuzzle } from 'lhh-ui';

export default () => {
  const arr = Array.from({length: 15}, (_, i) => ({id: `id-${i}`}))
  return (
    <SliderPuzzle 
      // 数组的长度需要设置
      listLength={arr.length} 
      // 宽高必须设置
      style={{width: '300px', height: '300px'}}
      size={4}
      gap={10}
      puzzleColor='#1677ff'
      onComplete={() => {
        alert('恭喜你完成了拼图')
      }}
    >
      {arr.map((item, index) => (
        <SliderPuzzle.Item key={item.id} index={index} style={{background: '#fff'}}>
          <h4>{item.id}</h4>
          <SliderPuzzle.Canvas index={index} />
        </SliderPuzzle.Item>
      ))}
    </SliderPuzzle>
  )
}
```
<!-- <code src="./demo/demo2.tsx"></code> -->

### 自定义拼图图片

```jsx
import React from "react"
import { SliderPuzzle, isMobile } from 'lhh-ui';

export default () => {
  return (
    <SliderPuzzle 
      // 数组的长度需要设置
      listLength={0} 
      // 宽高必须设置
      style={{width: '300px', height: '300px'}}
      size={5}
      gap={0}
      globalAlpha={1}
      puzzleImg='http://lhh.codeape.site/img/tom.jpeg'
      onComplete={() => {
        alert('恭喜你完成了拼图')
      }}
    >
      {/* 这里是完整的拼图 */}
      <SliderPuzzle.Canvas 
        style={{
          position: 'absolute',
          top: isMobile ? -100 : 0,
          left: isMobile ? 0 : 320, 
        }} 
      />
    </SliderPuzzle>
  )
}
```
<!-- <code src="./demo/demo3.tsx"></code> -->

## API

<API id="SliderPuzzle"></API>

