---
title: useSearchSetState
nav:
  title: 钩子
  path: /components
  order: 2
group:
  title: url地址栏
  order: 3
---

## useSearchSetState

跟 `useState` 中的 `Object` 用法基本一致，需要传入地址栏的参数的 `key` 值，`state` 的值会与地址栏参数保持一致。

- keys: 以 字符串.字符串 的形式代表嵌套对象的key；例: ['name','a.b'] => {name: '', a: {b: ''}}

## 演示

注意查看地址栏的改变

### 常规使用

<code src="../../demo/hooks/useSearchSetState/demo1.tsx"></code>

