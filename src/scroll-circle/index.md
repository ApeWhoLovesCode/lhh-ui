---
title: ScrollCircle
nav:
  title: 组件
  path: /components
  order: 2
group:
  title: 非常规组件
  order: 1
---

## 圆形滚动组件

将每一个卡片绕圆形旋转放置，并支持圆形滚动的方式

## 演示

### 组件多层嵌套

<code src="../demo/scroll-circle/demo7.tsx"></code>

<code src="../demo/scroll-circle/demo6.tsx"></code>

### 常规使用

<code src="../demo/scroll-circle/demo1.tsx"></code>

### 分页使用

<code src="../demo/scroll-circle/demo2.tsx"></code>

### 设置卡片间距和不均分排列

<code src="../demo/scroll-circle/demo3.tsx"></code>

### 设置各方向上的圆心 (centerPoint)

<code src="../demo/scroll-circle/demo4.tsx"></code>

### 操作旋转

<code src="../demo/scroll-circle/demo5.tsx"></code>

## API

### ScrollCircle

<API id="ScrollCircle"></API>

### ScrollCircle.Item

<API id="ScrollCircleItem"></API>

### centerPoint <Badge>CenterPointType</Badge>

|  属性名   | 描述  |
|  ----  | ----  |
| auto  | 自动适应，当圆形区域宽度大于高度时，圆心会自动在底部，否则在右边 |
| center  | 让整个圆形在盒子内 |
| left | 让圆心在左边 |
| top | 让圆心在顶部 |
| right | 让圆心在右边 |
| bottom | 让圆心在底部 |
