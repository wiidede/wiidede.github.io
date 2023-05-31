---
title: 整理一些css样式
date: 2020-09-10 16:54:31
tags:
  - 前端
  - CSS
categories:
  - 前端
id: several-css-style
---

# 整理一些css样式

## 渐变文字

```css
span {
    background: linear-gradient(360deg, #97E9FF 0%, #FFFFFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
```

## 文字阴影

```css
p {
    text-shadow: 0 0 12px rgba(24, 230, 255, 0.63);
}
```

## 适应多种情况的自动换行

```css
p {
    word-break: keep-all;
    word-wrap: break-word;
    white-space: pre-wrap;
}
```

## 单行超出内容省略

```css
p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
```

## 小天才的margin呢

```css
.iconfont + .iconfont {
    margin-left: 10px;
}
/* 任意两个连续的 `iconfont` 类中后面一个添加 `margin-left` 属性 */
```

## 平滑滚动 （直接修改offsetTop都能平滑滚动）

``` css
.container {
    scroll-behavior:smooth;
}
```

## fit-content

firefox 的 width `fit-content` 目前还需要加前缀

```css
div {
    width: fit-content;
    width: -moz-fit-content;
}
```

**问题来源：** 在居中 el-form的时候，可以使用这个，加上`margin: 0 auto`就可以实现居中

## 居中

```css
div {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
}
```
