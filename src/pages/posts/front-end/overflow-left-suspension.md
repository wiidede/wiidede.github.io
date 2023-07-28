---
title: div内容溢出后，内容向左悬浮，vue组件封装
date: 2023-01-16 15:13:49
id: overflow-left-suspension
categories:
  - 前端
tags:
  - Vue
  - Vue组件
---

[[toc]]

# div内容溢出后，内容向左悬浮，vue组件封装

```vue
<script setup lang="ts">
const containerRef = ref<HTMLDivElement>()
const contentRef = ref<HTMLDivElement>()
let destroyFunction: () => void

function processOverflow() {
  const containerEl = containerRef.value!
  const contentEl = contentRef.value!
  const isOverflow = contentEl.offsetWidth > containerEl.offsetWidth
  if (isOverflow)
    contentEl.classList.add('is-overflow')
  else
    contentEl.classList.remove('is-overflow')

}

onMounted(() => {
  const el = contentRef.value!
  const observer = new ResizeObserver(() => {
    processOverflow()
  })
  observer.observe(el)
  destroyFunction = () => {
    observer.disconnect()
  }
})

onUnmounted(() => {
  if (destroyFunction)
    destroyFunction()

})
</script>

<template>
  <div ref="containerRef" class="overflow-left-container">
    <div ref="contentRef" class="overflow-left-content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.overflow-left-container {
  position: relative;
  width: 100%;
  height: 100%;

  .overflow-left-content {
    width: fit-content;
    height: 100%;
    white-space: nowrap;

    &.is-overflow {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
    }
  }
}
</style>
```
