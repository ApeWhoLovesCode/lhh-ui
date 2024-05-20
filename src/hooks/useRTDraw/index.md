---
title: useRTDraw
nav:
  title: 钩子
  path: /components
  order: 2
group:
  title: Dom
  order: 3
---

## useRTDraw

一个用于 `Canvas` 实时绘画的钩子。

主要采用 `requestAnimationFrame` 来进行实时绘画，并对高刷屏和高分辨率屏做了一定兼容。

## 演示

### 常规使用

<code src="../../demo/hooks/useRTDraw/demo.tsx"></code>

## 返回参数

| 属性名              | 描述           | 类型      |
| -- | -- | -- |
| drawState | 用于绘画的 state 包含 上下文，设备像素比和是否为高刷屏的判断 | {ctx: CanvasRenderingContext2D \| null; ratio: number; isHighRefreshScreen: boolean | undefined;} |
| canvasRef | 用于和 canvas 的 ref 相绑定 | HTMLCanvasElement |
| startAnimation | 开启动画的回调 | () => void |
| cancelAnimation | 结束动画的回调 | () => void |
 