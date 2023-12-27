---
title: vue-grid-layout-组件配置
date: 2022-09-29T14:33:16+08:00
id: vue-grid-layout-configuration
categories:
  - 前端
tags:
  - Vue
  - Vue组件
---

[[toc]]

# vue-grid-layout 组件配置

可以自定义各组件的布局，可以从外部拖入

```vue
<script setup lang="ts">
import GridItem from '@/components/GridLayout/components/grid-item.vue'
import GridLayout from '@/components/GridLayout/components/grid-layout.vue'

withDefaults(defineProps<{
  edit: boolean
}>(), {
  edit: false,
})

const gridLayoutRef = ref()
const gridItemRefs = ref<any[]>([])

const componentList: ComponentItem[] = [
  { w: 2, h: 4, i: 'xx', l: 'xxx' },
]

const componentMap = {
  xx: defineAsyncComponent(() => import('~/xx')),
  dragging: null,
}
type ComponentKeys = keyof typeof componentMap
interface ComponentItem {
  x?: number
  y?: number
  w?: number
  h?: number
  i: ComponentKeys
  l?: string
}

const colNum = 9
const layout = ref<ComponentItem[]>([])
function setLayout(newLayout: ComponentItem[]) {
  layout.value = newLayout
}

// drag
const currentComponent = ref<ComponentItem>()
const DragPos: Partial<ComponentItem> = {}
const { x, y } = useMouse({ type: 'client' })

function allowDrop(e: DragEvent) {
  e.preventDefault()
}
function deleteLayout(i: ComponentItem['i']) {
  const draggingIndex = layout.value.findIndex(obj => obj.i === i)
  if (draggingIndex !== -1)
    layout.value.splice(draggingIndex, 1)
}
function drag(e: DragEvent, comp: ComponentItem) {
  currentComponent.value = comp
  const parentRect = gridLayoutRef.value!.$el.getBoundingClientRect()
  let mouseInGrid = false
  if (((x.value > parentRect.left) && (x.value < parentRect.right)) && ((y.value > parentRect.top) && (y.value < parentRect.bottom)))
    mouseInGrid = true

  if (mouseInGrid === true && (layout.value.findIndex(item => item.i === 'dragging')) === -1) {
    layout.value.push({
      ...comp,
      i: 'dragging',
      x: (layout.value.length * 2) % (colNum),
      y: layout.value.length + (colNum), // puts it at the bottom
    })
  }
  const index = layout.value.findIndex(item => item.i === 'dragging')
  if (index !== -1) {
    const itemRef = gridItemRefs.value.find(item => item.i === 'dragging')
    if (itemRef) {
      itemRef.dragging = { top: y.value - parentRect.top, left: x.value - parentRect.left }
      const newPos = itemRef.calcXY(y.value - parentRect.top, x.value - parentRect.left)

      if (mouseInGrid === true) {
        gridLayoutRef.value.dragEvent('dragstart', 'dragging', newPos.x, newPos.y, comp.h, comp.w)
        DragPos.x = layout.value[index].x
        DragPos.y = layout.value[index].y
      }
      if (mouseInGrid === false) {
        gridLayoutRef.value.dragEvent('dragend', 'dragging', newPos.x, newPos.y, comp.h, comp.w)
        deleteLayout('dragging')
      }
    }
  }
}
function dragend(e: DragEvent) {
  deleteLayout('dragging')
  const parentRect = gridLayoutRef.value!.$el.getBoundingClientRect()
  let mouseInGrid = false
  if (((x.value > parentRect.left) && (x.value < parentRect.right)) && ((y.value > parentRect.top) && (y.value < parentRect.bottom)))
    mouseInGrid = true

  if (mouseInGrid === true) {
    const final: ComponentItem = {
      ...currentComponent.value!,
      x: DragPos.x,
      y: DragPos.y,
    }
    layout.value.push(final)
    gridLayoutRef.value.dragEvent('dragend', final.i, final.x, final.y, final.h, final.w)
  }
}

defineExpose({
  setLayout,
})
</script>

<template>
  <div
    @dragenter="allowDrop"
    @dragover="allowDrop"
  >
    <GridLayout
      ref="gridLayoutRef"
      v-model:layout="layout"
      flex-1
      :col-num="colNum"
      :row-height="10"
      :is-draggable="edit"
      :is-resizable="false"
      :is-mirrored="false"
      :margin="[25, 25]"
    >
      <GridItem
        v-for="item in layout"
        v-show="item.i !== 'dragging'"
        :key="item.i"
        ref="gridItemRefs"
        class="relative"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
      >
        <component :is="componentMap[item.i]" v-if="componentMap[item.i]" class="grid-item-content" />
        <el-icon v-if="edit" class="absolute right-8px top-8px cursor-pointer" @click="deleteLayout(item.i)">
          <Close />
        </el-icon>
      </GridItem>
    </GridLayout>
  </div>
  <div v-if="edit" class="component-list flex-col-center justify-center">
    <div
      v-for="comp in componentList.filter((comp) => !layout.find((item) => item.i === comp.i))"
      :key="comp.i"
      class="component-item"
      draggable="true"
      unselectable="on"
      @drag="drag($event, comp)"
      @dragend="dragend"
    >
      <div class="i-ic-baseline-grid-view mr4px mt1px" />
      <span>{{ comp.l }}</span>
    </div>
  </div>
</template>
```
