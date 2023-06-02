---
title: 项目数据字典封装
date: 2022-11-08 13:53:31
id: project-data-dict-encapsulate
categories:
  - 前端
tags:
  - 框架
  - pinia
---

# 项目数据字典封装

使用pinia封装：

- 提供获取数据字典接口的结果的封装
- 提供 useDictData 可以直接获取对应的dictKey的map的ref对象，并且一个key只有一个ref供全局使用
- 提供更新方法，用于用户修改数据字典后，可以直接更改ref对象，从而全局响应式变化

使用起来非常简单，只要传入key，就能获取到ref值：`const statusMap = useDictData('normal_status')`

```ts
import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import { IDictData } from '@/typings/DataDictionary'
import { getDictDataApi } from '@/service/DataDictionary'

export const useCommonStore = defineStore('common', () => {
  const getDictData = async (dictKey: string): Promise<Record<string, IDictData>> => {
    const res = await getDictDataApi({ dictKey })
    if (res.code !== 1) {
      ElMessage.error(res.message)
      return {}
    }
    const list: IDictData[] = res.result
    const map: Record<string, IDictData> = {}
    list.forEach((item) => {
      map[item.dictValue] = item
    })
    return map
  }
  type DictDataMapVal = Record<string, IDictData>
  const dictDataMap = new Map<string, Ref<DictDataMapVal>>()
  const useDictData = (dictKey: string) => {
    if (dictDataMap.has(dictKey))
      return dictDataMap.get(dictKey)!

    const map = ref<DictDataMapVal>({})
    dictDataMap.set(dictKey, map)
    updateDictData(dictKey)
    return map
  }
  const updateDictData = async (dictKey: string) => {
    const dictData = dictDataMap.get(dictKey)
    if (dictData) {
      const map = await getDictData(dictKey)
      dictData.value = map
    }
  }

  return {
    getDictData,
    useDictData,
    updateDictData,
  }
})
```

## 使用方法

```vue
<script setup lang="ts">
import { useCommonStore } from '@/store/common'

const commonStore = useCommonStore()
const { useDictData } = commonStore
const statusMap = useDictData('normal_status')
</script>

<template>
  <span :class="statusMap[row.status]?.className">{{ statusMap[row.status]?.dictLabel }}</span>
</template>
```
