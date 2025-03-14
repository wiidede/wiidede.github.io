---
title: 简单的curd组件封装
date: 2022-12-31T16:47:50+08:00
id: simple-curd-component-encapsulation
categories:
  - 前端
tags:
  - Vue
  - Vue组件
---

[[toc]]

# 简单的curd组件封装

特性：主要是合并表格、分页，然后其他内容自己通过slot插入，表格column也使用对象的形式定义，支持多级header

首先对table column封装

> TableColumn.vue

```vue
<script lang="ts" setup>
import { CurdColumn } from '@/typings/common'
import { omit } from 'lodash-es'

const props = defineProps<{
  column: CurdColumn
}>()

const columnAttr = computed(() => omit(props.column, ['children']))
</script>

<template>
  <el-table-column
    :class-name="column.className || (column.slot && `${column.slot}-column`)"
    v-bind="columnAttr"
    #="scope"
  >
    <span v-if="column.prop && column.map">{{ column.map.value[scope.row[column.prop]] ?? scope.row[column.prop] }}</span>
    <slot v-if="column.slot" :name="column.slot" :prop="column.prop" v-bind="scope" />
    <template v-if="column.children">
      <TableColumn v-for="child in column.children" :key="child.prop" :column="child">
        <template v-if="child.slot" #[child.slot]="childScope: any">
          <slot :name="child.slot" v-bind="childScope" />
        </template>
      </TableColumn>
    </template>
  </el-table-column>
</template>
```

> Curd.vue

```vue
<script setup lang="ts">
import type { CurdColumn, IPage } from '@/typings/common'
import type { TableInstance } from 'element-plus/es'
import { omit } from 'lodash-es'
import TableColumn from './TableColumn.vue'

const props = defineProps<{
  columns: CurdColumn[]
  tableData: unknown[]
  page?: IPage
}>()

const emit = defineEmits<IEmit>()
interface IEmit {
  (event: 'update:page', value: typeof props.page): void
  (event: 'search'): void
}
const attrs = useAttrs()
const tableAttrs = computed(() => omit(attrs, ['class']))

const tableRef = ref<TableInstance>()

const tableWithGroupHeader = computed(() => props.columns.some(column => column.children))
function getSlots(column: CurdColumn) {
  const slots: string[] = []
  const getSlot = (column: CurdColumn) => {
    if (column.slot)
      slots.push(column.slot)

    if (column.children)
      column.children.forEach(getSlot)
  }
  getSlot(column)
  return slots
}

const pageModel = computed({
  get: () => props.page,
  set: value => emit('update:page', value),
})

function handleSizeChange(val: number) {
  if (!pageModel.value)
    return
  pageModel.value.pageSize = val
  pageModel.value.pageNum = 1
  emit('search')
}
function handleCurrentChange(val: number) {
  if (!pageModel.value)
    return
  pageModel.value.pageNum = val
  emit('search')
}

defineExpose({
  tableRef,
})
</script>

<template>
  <div class="curd-container box-border h-full flex flex-col">
    <div class="header-line">
      <slot name="header" />
    </div>
    <div class="table-container box-border min-h0 w-full flex flex-auto flex-col">
      <el-table
        ref="tableRef"
        :data="tableData"
        stripe
        border
        v-bind="tableAttrs"
        class="curd-table min-h0 flex-auto"
        :class="{ 'group-header': tableWithGroupHeader }"
      >
        <template
          v-for="(column, index) in columns"
          :key="column.prop || index"
        >
          <TableColumn :column="column">
            <template v-for="slot in getSlots(column)" :key="slot" #[slot]="scope">
              <slot :name="slot" v-bind="scope" />
            </template>
          </TableColumn>
        </template>
      </el-table>
      <el-pagination
        v-if="pageModel"
        v-model:page-size="pageModel.pageSize"
        v-model:current-page="pageModel.pageNum"
        :total="pageModel.total"
        :page-sizes="[15, 30, 50]"
        background
        layout="->, total, sizes, prev, pager, next, jumper"
        class="h-80px flex-[0_0_auto]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
```

```ts
export interface IPage extends IPagination {
  total: number
}

export type CurdColumn = ElTableColumnProps & {
  slot?: string
  map?: Ref<Record<string, string>>
  children?: CurdColumn[]
}
```

## utils

如果想指定props，我也写了一个工具类

```ts
export type DefineKeys<O, Key extends string, Keys> = O & {
  [k in Key]?: Keys
}
```

用法：

```ts
const columns: DefineKeys<CurdColumn, 'prop', keyof IData>[] = []
```

## 基于这个想法，我觉得el-form可以同样的封装，但是为了灵活，我把el-form-item做了一个组件

但这个组件用到现在我感觉设计上还是有点问题，
如果能使用type，props的方式可能会更好，这样类型就定义起来比较麻烦，
不同的type，对应element-plus不同组件的props，
这样整个el-form的自定义程度会更高，但是一开始写的时候没有考虑到这些，
现在重构也不太好了。。。

```vue
<script setup lang="ts">
import type { CurdFormItems } from '@/typings/common'
import { unref } from 'vue'
import WddUpload from './WddUpload.vue'

const props = defineProps<{
  formItems: CurdFormItems[]
  form: Record<string, unknown>
  inputSize?: string
}>()

const emit = defineEmits<IEmit>()
interface IEmit {
  (event: 'update:form', value: typeof props.form): void
  (event: 'change'): void
}
const formModel = computed({
  get: () => props.form,
  set: value => emit('update:form', value),
})
</script>

<template>
  <template
    v-for="item in formItems"
    :key="item.prop"
  >
    <el-form-item v-bind="item">
      <!-- 这里可以是一些通用的固定组件，不然就直接放到slot里面就行 -->
      <el-date-picker
        v-if="item.date && ['datetime', 'date', 'week', 'month', 'year'].includes(item.date)"
        v-model="formModel[item.prop]"
        :size="inputSize"
        :type="item.date"
        value-format="YYYY-MM-DD HH:mm:ss"
        clearable
        @change="emit('change')"
      />
      <WddUpload v-else-if="item.upload" v-model:file-list="(formModel[item.prop])" />
      <!-- 基础的一些表单 -->
      <el-select
        v-else-if="item.map" v-model="formModel[item.prop]" :size="inputSize" placeholder="请选择" clearable
        filterable @change="emit('change')"
      >
        <el-option
          v-for="(value, key) in unref(item.map)"
          :key="key"
          :label="value"
          :value="key"
        />
      </el-select>
      <slot v-else-if="item.slot" :name="item.slot" />
      <div v-else-if="item.multi" class="w-full flex gap4">
        <div v-for="subItem in item.multi" :key="subItem.prop" class="min-w-0 flex flex-1 items-center">
          <span mr1>{{ subItem.label }}</span>
          <el-input v-if="subItem.number" v-model.number="formModel[subItem.prop]" type="number" :size="inputSize" v-bind="subItem.inputProps">
            <template v-if="subItem.unit" #suffix>
              {{ subItem.unit }}
            </template>
          </el-input>
          <el-input v-else v-model="formModel[subItem.prop]" :size="inputSize" v-bind="subItem.inputProps">
            <template v-if="subItem.unit" #suffix>
              {{ subItem.unit }}
            </template>
          </el-input>
        </div>
      </div>
      <el-input v-else-if="item.textarea" v-model="formModel[item.prop]" type="textarea" :rows="item.textarea" v-bind="item.inputProps" />
      <el-input
        v-else-if="item.number" v-model.number="formModel[item.prop]" type="number" :size="inputSize" v-bind="item.inputProps"
        @keyup.enter="emit('change')"
      >
        <template v-if="item.unit" #suffix>
          {{ item.unit }}
        </template>
      </el-input>
      <el-input
        v-else v-model="formModel[item.prop]" :size="inputSize" v-bind="item.inputProps"
        @keyup.enter="emit('change')"
      >
        <template v-if="item.unit" #suffix>
          {{ item.unit }}
        </template>
      </el-input>
    </el-form-item>
  </template>
</template>

<style lang="scss" scoped>
</style>
```

类型：

```ts
type ElFormItemProps = InstanceType<typeof ElFormItem>['$props']
type ElInputProps = InstanceType<typeof ElInput>['$props']
type ElUploadProps = InstanceType<typeof ElUpload>['$props']
export type CurdFormItems = ElFormItemProps & {
  prop: string
  slot?: string
  map?: Ref<Record<string, string>>
  number?: boolean
  unit?: string
  inputProps?: ElInputProps
  multi?: CurdFormItems[]
  date?: 'datetime' | 'date' | 'week' | 'month' | 'year'
  upload?: boolean
  textarea?: number
}
```
