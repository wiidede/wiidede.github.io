---
title: 给ElInputNumber添加prefix
date: 2022-09-06T10:22:53+08:00
id: el-input-number-prefix
categories:
  - 前端
tags:
  - Vue
  - Vue组件
  - ElementPlus
---

[[toc]]

# 给ElInputNumber添加prefix

prefix通过props传递进来，通过teleport将el-input**prefix按照input prefix的方式传给el-input**wrapper下面，我这里prefix采用绝对定位，所以放在最后也没关系，不然的话可能需要dom操作了

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps({
  prefix: {
    type: String,
    default: '',
  },
})

const inputNumberRef = ref()
const inputNumberEl = ref<HTMLElement>()

onMounted(() => {
  const inputNumber = inputNumberRef.value
  const nodes = inputNumber.$refs.input.$el.childNodes as NodeListOf<HTMLElement>
  inputNumberEl.value = Array.from(nodes).find(node => node.className === 'el-input__wrapper')
})
</script>

<template>
  <el-input-number v-bind="$attrs" ref="inputNumberRef" class="sys-input-number" controls-position="right" />
  <Teleport
    :to="inputNumberEl"
    :disabled="!inputNumberEl"
  >
    <div class="el-input__prefix">
      <span class="el-input__prefix-inner">{{ prefix }}</span>
    </div>
  </Teleport>
</template>
```
