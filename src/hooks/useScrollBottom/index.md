---
title: useScrollBottom
nav:
  title: 钩子
  path: /components
  order: 2
group:
  title: Dom
  order: 3
---

## useScrollBottom

监听滚动到底部触发的钩子，可指定到达底部的距离。

## 演示

### 通过 ref 来监听

<code src="../../demo/hooks/useScrollBottom/demo1.tsx"></code>

### 通过 querySelector 来监听

<code src="../../demo/hooks/useScrollBottom/demo2.tsx"></code>

### 监听浏览器窗口是否到底

不穿 `ref` 和 `querySelector` 默认监听浏览器窗口的滚动

<code src="../../demo/hooks/useScrollBottom/demo3.tsx"></code>

## API

### UseScrollBottomParams

| 属性              | 描述                 | 类型                           | 默认值 |
| ----------------- | -------------------- | ------------------------------ | ------ |
| `ref`             | 绑定的滚动元素       | `React.RefObject<HTMLElement>` | `-`    |
| `querySelector`   | 监听其他元素         | `string`                       | `-`    |
| `bottom`          | 距离底部触发的距离   | `number`                       | `30`   |
| `onScrollToLower` | 滚动到底部触发的事件 | `() => void`                   | `-`    |
