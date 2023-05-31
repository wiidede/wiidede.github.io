---
title: ElPagination添加页数总数
date: 2022-09-06 10:40:28
id: el-pagination-page-count
categories:
  - 前端
tags:
  - 前端
  - Vue
  - Vue组件
  - ElementPlus
---

# ElPagination添加页数总数

从Vue的插件中可以看到，ElPagination provide了pageCount，但是layout里面并没有pageCount，但是有slot，反正肯定要用slot，那么插槽的内容作为子组件，就可以inject ElPagination provide的pageCount。elPaginationKey是个symbol，需要我们手动导入一下

## pagination组件

```vue
<script lang="ts" setup>
import PageCount from './pageCount.vue'
</script>

<template>
  <el-pagination
    :page-sizes="[10, 20, 30, 50]"
    layout="sizes, total, jumper, slot, prev, next"
  >
    <PageCount class="sys-pagination-page-count" />
  </el-pagination>
</template>
```

## pageCount组件

```vue
<script setup lang="ts">
import { inject } from 'vue'
import { elPaginationKey } from 'element-plus'

const elPagination = inject(elPaginationKey)!
</script>

<template>
  <span>/ {{ elPagination.pageCount }}</span>
</template>
```
