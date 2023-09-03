---
title: HuarongRoad
nav:
  title: 组件
  path: /components
  order: 2
group:
  title: 非常规组件
  order: 1
---

## 华容道组件

由曹操，五虎将和4个小卒组成的华容道小游戏。

整体是 4 * 5 的格子，曹操占4格，五虎将横或竖向占2格，卒占1格，还有两个空格，当曹操移动到最底下时，游戏获胜。

## 演示

### 常规使用

<code src="../demo/huarong-road/demo1.tsx"></code>

### 自定义曹操，五虎将和小兵的位置

<code src="../demo/huarong-road/demo2.tsx"></code>

### 调整滑块间的间隙

<code src="../demo/huarong-road/demo3.tsx"></code>

### 随机色块华容道

<code src="../demo/huarong-road/demo4.tsx"></code>

## API

### HuarongRoad

<API id="HuarongRoad"></API>

### HuarongRoad.Item

<API id="HuarongRoadItem"></API>

### HeroesIndex

|  值    | 描述         | 占位         |
|  ----  | ----        | ----        |
|   1    | 曹操（boss） | 占4格        |
| 21 - 25 | 五虎将      | 横或竖向占2格 |
| 31 - 34 | 卒         | 占1格        |