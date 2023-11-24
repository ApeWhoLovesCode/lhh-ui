---
title: MobileFolder
nav:
  title: 组件
  path: /components
  order: 2
group:
  title: 非常规组件
  order: 1
---

## 手机文件夹组件

将一个列表类似手机文件夹那样包裹起来

## 演示

### 常规使用

<code src="../demo/mobile-folder/demo1.tsx"></code>

### 自定义 children

<code src="../demo/mobile-folder/demo2.tsx"></code>

## API

### MobileFolderProps

<API id="MobileFolder"></API>

### MobileFolderItem

|  属性名    | 描述            | 类型         | 默认值 |
|  ----     | ----           | ----         | ---- |
|   icon    | 渲染的内容为图片  | `string`       | `--` |
| title     | 标题            | `string`       | `--` |
| children  | 自定义渲染的内容  | `ReactNode`    | `--` |
| onClick   | 点击的回调       | `(item: MobileFolderItem, i: number) => void` | `--` |
