---
title: vue3 + ElementPlus 换肤方案（Css变量）
date: 2021-08-25 17:00:36
id: vue3-element-plus-change-theme-solution
categories:
  - 前端
tags:
  - Vue
  - ElementPlus
  - CSS
---

[[toc]]

# vue3 + ElementPlus 换肤方案（Css变量）

## 前言

> 你可以在这里直接看到效果 [设置主题色 + 换肤](https://wiidede.space/little-page/#/settings)

有了css变量，可以方便的在样式中使用统一的颜色，然后通过js修改，就能很快地改变整个界面的样式

定义css变量：（你也可以具体定义在某一选择器上）

```css
:root {
  --color: #808080;
}
```

使用css变量：

```css
div {
  color: var(--color);
}

.someClass:hover {
  background: var(--color);
}
```

## 改变主题色

注意到 Element Plus 的scss变量都编译成了css变量，最新的ElementUI推荐全局引入，那我们覆盖它的样式，
也就是自己的样式写在ElementPlus样式的后面

```ts
import 'element-plus/dist/index.css'
import './style/index.scss'
```

比如本项目的主题色使用css变量：

`--main`

然后把Element UI的变量的值设为这个变量

`--el-color-primary: var(--main)`

这样只需要修改主题色，整个UI的颜色都可以改变

在js中可以这样修改css变量：

```ts
document.documentElement.style.setProperty('--main', '#808080')
```

## 换肤

本项目还准备了换肤功能，主要是准备两套皮肤方案

`:root`下面的是默认的皮肤

`[data-theme="dark"]`下面是dark的皮肤

```css
:root {
  --background: white;
  --font-color: #303133;
}

[data-theme='dark'] {
  --background: #383838;
  --font-color: #eeeeee;
}
```

在js中这样修改主题方案：

```ts
document.documentElement.setAttribute('data-theme', 'dark')
```

这样，html标签上会多一个`data-theme="dark"`的属性，样式也会变成`[data-theme="dark"]`下的样式
