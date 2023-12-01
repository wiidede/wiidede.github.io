---
title: vue判断字符串是否溢出来显示弹窗、解决el-table tooltip 内过多导致无法显示，内容闪烁
date: 2020-10-15 16:37:11
tags:
  - Vue
  - ElementUI
  - ElementPlus
  - Vue组件
categories:
  - 前端
id: vue-auto-show-tooltip
---

[[toc]]

# vue判断字符串是否溢出来显示弹窗、解决el-table tooltip 内过多导致无法显示，内容闪烁

总体的思路就是获取dom元素，根据dom元素的 `clientWidth` 与 `scrollWidth` 来判断是否溢出，我这里正好碰到v-for，所以需要动态绑定每一个元素的ref。

## vue判断字符串是否溢出来显示弹窗

```vue
<div v-for="item in items" :key="item.id">
    <el-tooltip
                :disabled="isOverflow($refs[item.id])"
                :content="`${item.content}`"
                effect="dark"
                placement="top">
        <span :ref="item.id">{{ item.content }}</span>
    </el-tooltip>
</div>
```

## 处理函数 isOverflow

```js
function isOverflow(element) {
  return element ? element[0].clientWidth >= element[0].scrollWidth : false
}
```

## 整理成组件（仅判断字符串是否溢出）

```vue
<script>
export default {
  name: 'OverflowTooltip',
  props: {
    className: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    tooltipContent: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      disabled: true
    }
  },
  methods: {
    isOverflow() {
      if (this.$refs.overflowTooltipContent)
        this.disabled = this.$refs.overflowTooltipContent.offsetWidth >= this.$refs.overflowTooltipContent.scrollWidth
    }
  }
}
</script>

<template>
  <el-tooltip
    :disabled="disabled"
    effect="dark"
    :content="tooltipContent || content"
    placement="top"
    :enterable="false"
  >
    <div
      ref="overflowTooltipContent"
      :class="className" class="overflow-content" @mouseover="isOverflow"
    >
      {{ content }}
    </div>
  </el-tooltip>
</template>

<style lang="scss" scoped>
.overflow-content {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
```

## 解决el-table tooltip 内过多导致无法显示，内容闪烁

### 改进：正常显示

后来在el-table遇到了一个问题，就是el-table原本的tooltip，如果内容太多，是显示不下的，而且屏幕会闪烁，盲猜tooltip出现的瞬间鼠标进入了tooltip，表格的tooltip是无法进入，所以马上消失了，然后又显示。

所以我马上用了这个组件，但是加了一些样式，让它溢出的可以滚动。（如果el-table自带的tooltip用这个样式，也可以正常显示，但是鼠标无法进入，所以无法展示所有内容）

不过加了这个样式好像就不能显示arrow了

```css
.popperClass {
  max-width: 50vw;
  max-height: 50vh;
  overflow-y: auto;
}
```

### 改进：自动判断鼠标是否需要移入

鼠标移入后，获取popper节点，判断el-tooltip的内容是否溢出，如果溢出，才允许鼠标进入。

```js
setTimeout(() => {
  const popper = this.$refs.tooltip.$refs.popper
  if (popper)
    this.autoEnter = popper.offsetHeight < popper.scrollHeight
}, 100)
```

### 改进：结构改为div包着span，和原来el-table的样子差不多

这时候需要修改一下原先判断溢出的方法。

```js
const el = this.$refs.overflowTooltipContent
if (el) {
  const parent = el.parentNode
  this.disabled = parent.offsetWidth >= el.offsetWidth
}
```

## 最终的组件

```vue
<script>
export default {
  name: 'OverflowTooltip',
  props: {
    className: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    tooltipContent: {
      type: String,
      default: ''
    },
    enterable: {
      type: Boolean,
      default: false
    },
    autoEnterable: {
      type: Boolean,
      default: false
    },
    popperClass: {
      type: String,
      default: ''
    },
    placement: {
      type: String,
      default: 'top'
    }
  },
  data() {
    return {
      disabled: true,
      autoEnter: null
    }
  },
  methods: {
    isOverflow() {
      const el = this.$refs.overflowTooltipContent
      if (el) {
        const parent = el.parentNode
        this.disabled = parent.offsetWidth >= el.offsetWidth
      }
      if (this.autoEnterable) {
        setTimeout(() => {
          const popper = this.$refs.tooltip.$refs.popper
          if (popper)
            this.autoEnter = popper.offsetHeight < popper.scrollHeight
        }, 100)
      }
    }
  }
}
</script>

<template>
  <el-tooltip
    ref="tooltip"
    :disabled="disabled"
    effect="dark"
    :content="tooltipContent || content"
    :placement="placement"
    :enterable="autoEnter === null ? enterable : autoEnter"
    :popper-class="popperClass"
    :visible-arrow="false"
  >
    <div class="overflow-content-wrapper">
      <span
        ref="overflowTooltipContent"
        class="overflow-content"
        :class="className"
        @mouseover="isOverflow"
      >{{ content }}</span>
    </div>
  </el-tooltip>
</template>

<style scoped>
.overflow-content-wrapper {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.overflow-content {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
```

## Vue3 + TS 组件重新封装，支持多行省略

element-plus好像不会出现超多内容闪烁，el-tooltip会自动撑开整个页面，所以这里只是在第一个组件的基础上增加了传入参数就可以支持多行省略。

```vue
<script setup lang="ts">
import type { ElTooltip } from 'element-plus/es'

const props = defineProps<{
  content: string
  className?: string
  lineClamp?: number
  tooltipContent?: string
}>()

const tooltipRef = ref<InstanceType<typeof ElTooltip>>()
const contentRef = ref<HTMLSpanElement>()

const disabled = ref(true)

function isOverflow() {
  const el = contentRef.value
  if (el) {
    if (props.lineClamp)
      disabled.value = el.offsetHeight >= el.scrollHeight
    else
      disabled.value = el.offsetWidth >= el.scrollWidth
  }
}
</script>

<template>
  <el-tooltip
    ref="tooltipRef"
    effect="dark"
    :disabled="disabled"
    :content="tooltipContent || content"
  >
    <span
      ref="contentRef"
      class="overflow-content"
      :class="[{ 'overflow-line-clamp': lineClamp }, className]"
      :style="{ '--line-clamp': lineClamp }"
      @mouseover="isOverflow"
    >{{ content }}</span>
  </el-tooltip>
</template>

<style lang="scss" scoped>
.overflow-content {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.overflow-line-clamp {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;
  -webkit-line-clamp: var(--line-clamp, 2);
  -webkit-box-orient: vertical;
}
</style>
```
