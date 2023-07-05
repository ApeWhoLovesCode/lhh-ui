---
title: useSearchState
nav:
  title: 钩子
  path: /components
  order: 2
group:
  title: url地址栏
  order: 3
---

## useSearchState

跟 `useState` 用法基本一致，需要传入地址栏的参数的 `key` 值，`state` 的值会与地址栏参数保持一致。

## 演示

注意查看地址栏的改变

### 常规使用

<code src="../../demo/hooks/useSearchState/demo1.tsx"></code>

### 数字，数组，对象等非String类型

- 建议：处理 `Object` 类型时最好用 `useSearchSetState`，这样地址栏会清晰很多。

<code src="../../demo/hooks/useSearchState/demo4.tsx"></code>

## 注意

使用该钩子时，不要在一个函数内 `setParam` 多次，否则会有闭包问题，导致url参数前值被后值覆盖；

如果真的需要这样做，请用 `useSearchParamsFilter` 替代，下面是一个使用例子。

#### 错误用法 <Badge type="error">error</Badge>

<code src="../../demo/hooks/useSearchState/demo2.tsx"></code>

#### 正确用法 <Badge type="success">true</Badge>

<code src="../../demo/hooks/useSearchState/demo3.tsx"></code>
