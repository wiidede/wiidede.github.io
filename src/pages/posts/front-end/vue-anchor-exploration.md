---
title: vue-anchor 探索
date: 2022-01-27 15:51:21
id: vue-anchor-exploration
categories:
  - 前端
tags:
  - Vue
---

[[toc]]

# vue-anchor 探索

## 背景

看到了公司的组件库里有`el-achor`但是又没有源代码，所以去网上学习了一下

## 实现1

直接设置容器的scrollTop

```js
const anchor = this.$el.querySelector(selector)
document.body.scrollTop = anchor.offsetTop
```

这让我想到了可以使用平滑滚动的样式：

```css
.body {
  scroll-behavior: smooth;
}
```

## 实现2

Element.scrollIntoView() [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView)

```js
const anchor = this.$el.querySelector(selector)
anchor.scrollIntoView()
```

有了这个API，就可以直接让元素滚动到父元素的顶部，就是兼容没那么的好
