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

一个用于 `Canvas` 实时绘画的钩子，大概为每秒 60 次的刷新。

主要采用 `requestAnimationFrame` 来进行实时绘画，并对高刷屏和高分辨率屏做了一定兼容。

对于不支持 `requestAnimationFrame` 的采用 `setInterval` 替代。

## 演示

### 常规使用

<code src="../../demo/hooks/useRTDraw/demo.tsx"></code>

## 返回参数

| 属性名              | 描述           | 类型      |
| -- | -- | -- |
| canvasRef | 用于和 canvas 的 ref 相绑定 | HTMLCanvasElement |
| drawState | 用于绘画的 state 包含 上下文，设备像素比和是否为高刷屏的判断 | {ctx: CanvasRenderingContext2D \| null; ratio: number; isHighRefreshScreen: boolean | undefined;} |
| canvasInfo | 用于设置 canvas 的宽高 | {w: number, h: number} |
| setCanvasInfo | 设置 canvas 的宽高信息 | (p: {w: number, h: number}) => void |
| getCtx | 用于获取 canvas 的上下文 | () => void |
| startAnimation | 开启动画的回调 | () => void |
| cancelAnimation | 结束动画的回调 | () => void |
 