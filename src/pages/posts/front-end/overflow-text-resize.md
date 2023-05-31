---
title: 文本数字溢出后，按比例缩小，vue组件封装
date: 2023-01-16 15:22:18
id: overflow-text-resize
categories:
  - 前端
tags:
  - Vue
  - Vue组件
---

# 文本数字溢出后，按比例缩小，vue组件封装

```vue
<script lang="ts" setup>
let destroyFunc: () => void
const containerRef = ref<HTMLElement>()
const contentRef = ref<HTMLElement>()

onMounted(() => {
  if (!containerRef.value || !contentRef.value)
    return

  const resizeObserver = new ResizeObserver((targets) => {
    const containerWidth = containerRef.value?.offsetWidth
    const child = containerRef.value?.firstElementChild as HTMLElement
    const contentWidth = contentRef.value?.scrollWidth
    if (containerWidth && contentWidth && containerWidth < contentWidth) {
      const scale = containerWidth / contentWidth
      child.style.transform = `scale(${scale})`
      child.style.transformOrigin = 'left'
    }
    else {
      child.style.transform = 'none'
    }
  })
  resizeObserver.observe(containerRef.value)
  destroyFunc = () => {
    resizeObserver.disconnect()
  }
})
onBeforeUnmount(() => {
  destroyFunc && destroyFunc()
})
</script>

<template>
  <div ref="containerRef" class="wrapper">
    <div ref="contentRef" class="content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  max-width: 100%;
  overflow: hidden;
}

.content {
  width: auto;
}
</style>
```
