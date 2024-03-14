---
title: 从零开始打造一个支持多个滑块的组件
date: 2023-10-24T10:22:24+08:00
id: create-range-component-from-scratch
categories:
  - 前端
tags:
  - 组件
---

[[toc]]

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

有了indexMap之后，增删改就不会出现某个数据对应的滑块组件重新渲染了

然后我们在组件滑动之后，如果发生了滑块越过另一个滑块，除了要替换modelValue的值，也要一并替换modelValue的值，那你拖动的永远都是这项数据对应的dom，并且modelValue的顺序永远保持递增

核心update实现:

```ts
const indexMap = ref<Record<number, number>>({})
const indexMapReversed = computed(() => Object.fromEntries(Object.entries(indexMap.value).map(([k, v]) => [v, Number.parseInt(k)])))

function onUpdate(percentage: number) {
  setCurrentPercentage(percentage)
  const value = getValue(percentage)
  const modelValue = model.value
  const values = modelValue.map(i => i.value)
  if (props.deduplicate && values.includes(value))
    return
  let index = indexMap.value[current.value]
  const oldValue = values[index]
  if (oldValue - value > 0 && index > 0) {
    for (let i = index; i > 0; i--) {
      const prev = values[i - 1]
      if (value < prev) {
        swap(modelValue, i, i - 1)
        swap(indexMap.value, indexMapReversed.value[i], indexMapReversed.value[i - 1])
        index -= 1
      }
    }
  }
  if (oldValue - value < 0 && index < modelValue.length - 1) {
    for (let i = index; i < modelValue.length - 1; i++) {
      const next = values[i + 1]
      if (value > next) {
        swap(modelValue, i, i + 1)
        swap(indexMap.value, indexMapReversed.value[i], indexMapReversed.value[i + 1])
        index += 1
      }
    }
  }
  modelValue[index].value = value
  model.value = modelValue
}
```

核心功能完成后，我们只需要实现其他特性即可，目前组件有的特性：

- ✨ 支持一个或多个滑块。
- 🔄 自动检测模型类型并显示相应的滑块。
- 🔀 自动对模型值进行排序，而不是对DOM进行排序。
- ➕ 能够动态地添加或删除滑块。
- 🚫 避免重复的滑块。
- 🍡 平滑移动滑块，或者严格限制在每一个stop。
- 🎨 可定制的样式和主题。
- 🌓 支持黑暗模式。
- 📍 在滑块上方或下方渲染内容(render函数 / 插槽)。
- 🏷 支持在滑轨下方显示标记

## 项目

[Demo](https://range.wiidede.space/)
[github repo](https://github.com/wiidede/vue-range-multi)
[npm](https://www.npmjs.com/package/vue-range-multi)
