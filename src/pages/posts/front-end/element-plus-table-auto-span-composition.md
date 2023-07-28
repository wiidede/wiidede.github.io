---
title: ElementPlus表格table列自动合并composition
date: 2022-12-31 16:37:14
id: element-plus-table-auto-span-composition
categories:
  - 前端
tags:
  - ElementPlus
  - Composition
  - Vue
---

[[toc]]

# ElementPlus表格table列自动合并composition

特性：

1. 提供表格数据，需要合并的列的props，返回element plus table用的合并方法
2. 数据更改后，合并应该也会随之自动更新

```ts
export function useColumnSpan<Data>(tableData: Data[], keys: (keyof Data)[]) {
  const getSpanNumber = (data: Data[], prop: keyof Data) => {
    const arrNumber = data.reduce(
      (prev, next) => {
        if (prev.currIndex > 0) {
          if (prev.name && prev.name === next[prop]) {
            prev.number[prev.nameIndex] += 1
            prev.number[prev.currIndex] = 0
          }
          else {
            prev.name = next[prop]
            prev.nameIndex = prev.currIndex
            prev.number[prev.currIndex] = 1
          }
        }
        prev.currIndex += 1
        return prev
      },
      {
        currIndex: 0,
        number: [1],
        nameIndex: 0,
        name: data[0][prop],
      },
    )
    return arrNumber.number
  }

  const spanNumber = computed(() => {
    const map = new Map<keyof Data, number[]>()
    keys.forEach((key) => {
      map.set(key, getSpanNumber(tableData, key))
    })
    return map
  })

  const spanMethod = ({ row, column, rowIndex, columnIndex }: SpanMethodProps<Data>) => {
    const prop = column.property as keyof Data
    if (keys.includes(prop)) {
      const span = spanNumber.value.get(prop)
      return [span?.[rowIndex] ?? 1, 1]
    }
    return [1, 1]
  }

  return {
    spanNumber,
    spanMethod,
  }
}
```

## 扩展

有些时候，需要根据一个主键去合并表格上的几列，就可以再套一层composition api了

```ts
export function useColumnSpanMapping<Data>(tableData: Ref<Data[]> | Data[], key: keyof Data, mapping: (keyof Data)[]) {
  const { spanNumber, spanMethod } = useColumnSpan(tableData, [key])
  const columnSpan = ({ row, column, rowIndex, columnIndex }: SpanMethodProps<Data>) => {
    const prop = column.property as keyof Data
    if (mapping.includes(prop)) {
      const span = spanNumber.value.get(key)
      return [span?.[rowIndex] ?? 1, 1]
    }
    return spanMethod({ row, column, rowIndex, columnIndex })
  }
  return columnSpan
}
```
