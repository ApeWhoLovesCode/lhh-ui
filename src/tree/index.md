---
title: Tree
nav:
  title: 组件
  path: /components
  order: 2
group:
  title: 一般组件
  order: 1
---

## 树形控件

支持多层级的树形结构列表。

## 演示

### 常规使用

<code src="../demo/tree/demo1.tsx"></code>

### 单选节点

<code src="../demo/tree/demo2.tsx"></code>

### 通过 ref 获取节点信息

<code src="../demo/tree/demo3.tsx"></code>

## API

<API id="Tree"></API>

### ref 方法

| 属性名              | 描述           | 类型      |
| -- | -- | -- |
| getCheckTree | 获取当前选中的树形结构 | `() => CheckTree \| undefined` |
| getParentKeys | 根据 key 值获取其父节点，从 key 节点的最亲关系开始排列 | `(key: string) => string[] \| undefined` |
| getSiblingKeys | 根据 key 值获取其兄弟节点，会包括自身节点 | `(key: string) => string[] \| undefined` |
| getChildKeys | 根据 key 值获取其子节点 | `(key: string) => string[] \| undefined` |
| getCheckKeys | 获取当前 check 中的所有 key | `() => string[]` |
| getTreeDataItem | 获取当前 treeData 中的节点数据 | `(key: string) => TreeNode \| undefined` |
