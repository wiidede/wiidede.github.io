---
title: 一些处理表格数据composition api
date: 2023-01-16 15:06:08
id: some-table-composition
categories:
  - 前端
tags:
  - Composition
  - Vue
---

[[toc]]

# 一些处理表格数据composition api

## 检查表格某列是否重复，并返回重复的值

```ts
export function useTableColDuplicate<Data>(tableData?: Data[] | Ref<Data[]>, key?: keyof Data) {
  const valueTemp = ref(new Set<Data[keyof Data]>())
  const duplicateValues = computed(() => Array.from(valueTemp.value))
  const isDuplicate = computed(() => !!duplicateValues.value.length)
  watch(() => tableData, (val) => {
    if (!val || !key)
      return

    valueTemp.value.clear()
    const data = isRef(val) ? val.value : val
    const values = data.map(i => i[key])
    values.forEach((value) => {
      if (values.lastIndexOf(value) !== values.indexOf(value))
        valueTemp.value.add(value)

    })
  }, {
    deep: true,
  })

  return {
    isDuplicate,
    duplicateValues,
  }
}
```

## 将层级为2的树展开成表格

```ts
const shallowTreeTableMap = new WeakMap()
export function useShallowTreeTable<Data extends Record<string, unknown>, ChildKey extends keyof Data>(tree: Data[], childKey: ChildKey) {
  type Child = (Data[ChildKey] & any[])[number]
  type TreeChildKey = Extract<keyof Child, string>
  type TableChildKey = `childTable_${TreeChildKey}`
  type TableRow = Record<TreeChildKey | TableChildKey | 'isMain', unknown>
  const table = ref<TableRow[]>([]) as Ref<TableRow[]>
  if (!tree || !childKey)
    return table

  if (shallowTreeTableMap.has(tree))
    return shallowTreeTableMap.get(tree) as typeof table

  shallowTreeTableMap.set(tree, table)
  let tableEdit = false
  let treeEdit = false
  watch(() => tree, (value) => {
    if (treeEdit) {
      treeEdit = false
      return
    }
    const list: TableRow[] = []
    if (!value || !childKey)
      return

    value?.forEach((parent) => {
      const children = parent[childKey]
      if (!Array.isArray(children))
        return
      children?.forEach((child, index) => {
        list.push({
          ...parent,
          isMain: index === 0,
          ...Object.fromEntries(Object.entries(child).map(([key, value]) => [`childTable_${key}`, value])),
        })
      })
    })
    tableEdit = true
    table.value = list
  }, {
    immediate: true,
    deep: true,
  })
  watch(table, (value) => {
    if (tableEdit) {
      tableEdit = false
      return
    }
    const list: Data[] = []
    if (!value || !childKey)
      return
    let current: (typeof list)[number]
    value.forEach((rowDetail) => {
      const { isMain, ...row } = rowDetail
      const subList = Object.fromEntries(Object.entries(row).filter(
        ([key]) => key.startsWith('childTable_'),
      ).map(
        ([key, value]) => ([key.replace('childTable_', ''), value]),
      )) as Record<TreeChildKey, unknown>
      const raw = Object.fromEntries(Object.entries(row).filter(([key]) => !key.startsWith('childTable_'))) as Data
      if (isMain) {
        current = raw
        raw[childKey] = [subList] as Data[ChildKey]
        list.push(raw)
      }
      else {
        (current?.[childKey] as (typeof subList)[])?.push(subList)
      }
    })
    treeEdit = true
    tree.splice(0, tree.length, ...list)
  }, {
    deep: true,
  })
  return table
}
```
