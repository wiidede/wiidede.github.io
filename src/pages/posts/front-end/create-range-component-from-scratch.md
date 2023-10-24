---
title: 从零开始打造一个支持多个滑块的组件
date: 2023-10-24 10:22:24
id: create-range-component-from-scratch
categories:
  - 前端
tags:
  - 组件
---

# 从零开始打造一个支持多个滑块的组件

## 背景

\<input>有type=range，许多组件库也有slider，并且可以支持范围选择。但是很少有支持多个滑块的滑动条。所以我决定从零开始新建一个（Vue）。

## 滑动组件核心

当鼠标按下的时候，开始监听鼠标move，同时同步更改滑块位置

```vue
<script lang="ts" setup>
function onPointerMove(e: PointerEvent) {
  // change position
}

function onPointerUp(e: PointerEvent) {
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
  // move done
}

async function onPointerDown(e: PointerEvent) {
  e.preventDefault()
  e.stopPropagation()
  window.addEventListener('pointermove', onPointerMove, { passive: false })
  window.addEventListener('pointerup', onPointerUp)
}
</script>

<template>
  <div @pointerdown="onPointerDown" />
</template>
```

只要知道鼠标和滑动轨道的位置就能获得现在的所在的比例

```ts
const trackRect = trackRef.value.getBoundingClientRect()
const offset = props.vertical ? e.clientY - trackRect.top : e.clientX - trackRect.left
const percent = offset / (props.vertical ? trackRect.height : trackRect.width) * 100
```

我认为多个滑块比较困难的地方其实也是很多范围选择器比较关键的地方，就是你要保证modelValue中的数组的值是递增的，但是值对应的dom元素最好不是一直随着modelValue排序而变化的。理想的状态就是保证modelValue有序，但是dom不排序，不改变除了位置的样式之外的任何东西。

当然也有一些组件库的实现方式是。当你拖动左边的滑块到右边滑块的更右边的时候，你其实已经在拖动更右边的滑块了，左边的滑块到了原来右边滑块的位置。这种方法其实有点投机取巧，尤其是当需要给用户自定滑块渲染内容的时候，就会出不少问题。

所以我的一个想法就是建立一个map，对应modelValue中数值和dom。这样我们就知道一个modelValue的值是现在哪个dom。

> I think I should write more test. And abstract the main logic of the index map
