---
title: 封装contextmenu + floating-ui
date: 2023-10-10 15:54:34
id: contextmenu-floating-ui
categories:
  - 前端
tags:
  - floating-ui
  - 组件
---

[[toc]]

# 封装contextmenu + floating-ui

## 先看效果

![002](https://wiidede.space/img-store-one/images/002.gif)

## 组件特点

- 传入contextmenu的event，自动找到需要出现的位置，弹框会根据点击的元素滚动
- 传入list配置contextmenu内容
- 传入boundary配置contextmenu的可视区域，元素滚动超出后，隐藏contextmenu

这里结合floating-ui来实现contextmenu跟随元素滚动的效果

## 组件代码

```vue
<script lang="ts" setup>
import { autoUpdate, computePosition, flip, hide, offset, shift } from '@floating-ui/vue'
import { CSSProperties } from 'vue'

const props = defineProps<{
  modelValue?: false | MouseEvent
  list: any[]
  boundary?: HTMLElement
}>()

const emit = defineEmits<{
  'update:modelValue': [value: typeof props.modelValue]
}>()

const model = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})

const contextMenuRef = ref<HTMLDivElement>()

const style = reactive<CSSProperties>({
  left: 0,
  top: 0,
})

let cleanup: undefined | (() => void)
watch(() => props.modelValue, (e) => {
  if (e && contextMenuRef.value) {
    const referenceEl = e.target as HTMLElement
    const floatingEl = contextMenuRef.value
    const offsetX = e.clientX - referenceEl.getBoundingClientRect().left + 10
    cleanup?.()
    cleanup = autoUpdate(
      referenceEl,
      floatingEl,
      () => {
        computePosition(e.target as HTMLElement, floatingEl, {
          placement: 'bottom-start',
          strategy: 'fixed',
          middleware: [
            offset({ mainAxis: 0, crossAxis: offsetX }),
            flip(),
            shift(),
            hide({ boundary: props.boundary || document.documentElement }),
          ],
        }).then(({ x, y, middlewareData }) => {
          const hidden = middlewareData.hide?.referenceHidden
          style.left = `${x}px`
          style.top = `${y}px`
          style.visibility = hidden ? 'hidden' : 'visible'
        })
      },
    )
  }
})

onClickOutside(contextMenuRef, () => {
  model.value = false
  cleanup?.()
  cleanup = undefined
})
</script>

<template>
  <div v-show="model" ref="contextMenuRef" class="wrapper fixed z-9999 w-fit rd-1 bg-white py1" :style="style">
    <div
      v-for="item, idx in list"
      :key="idx"
      class="flex cursor-pointer items-center gap2 px2 py1 text-14px hover:bg-sky-100/50"
      @click="item.handler?.();model = false;"
    >
      <div class="text-1.2em" :class="item.icon" />
      <div>{{ item.label }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  border: 1px solid var(--el-border-color-light, #e4e7ed);
  box-shadow: var(--el-box-shadow-light, 0px 0px 12px rgba(0, 0, 0, 0.12));
}
</style>
```

## 调用示例

```vue
<script lang="ts" setup>
const treeBoundaryRef = ref<HTMLElement>()
const contextMenuEvent = ref<false | MouseEvent>(false)

const contestMenuList = [
  { icon: 'i-ic-baseline-expand', label: '展开', handler: () => {} },
]
</script>

<template>
  <div ref="treeBoundaryRef">
    <div @contextmenu="contextMenuEvent = $event" />
  </div>
  <ContextMenu v-model="contextMenuEvent" :list="contestMenuList" :boundary="treeBoundaryRef" />
</template>
```
