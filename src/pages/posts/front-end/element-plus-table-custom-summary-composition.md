---
title: ElementPlus表格自定义合计列composition
date: 2023-01-16 15:03:29
id: element-plus-table-custom-summary-composition
categories:
  - 前端
tags:
  - Element Plus
  - Composition
  - Vue
---

# ElementPlus表格自定义合计列composition

这个composition api的主要目的就是只要提供列名，就让这一列合计

```ts
export function useGetSummaries(props: string[]) {
  return <Data extends Record<string, unknown>>(param: SummaryMethodProps<Data>) => {
    const { columns, data } = param
    const sums: string[] = []
    if (!data)
      return sums

    columns.forEach((column, index) => {
      if (index === 0) {
        sums[index] = '合计'
        return
      }
      if (!props.includes(column.property))
        return

      const values = data.map(item => Number(item[column.property]))
      if (!values.every(value => Number.isNaN(value))) {
        sums[index] = `${values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!Number.isNaN(value))
          return prev + curr

        return prev
      }, 0)}`
      }
      else {
        sums[index] = 'N/A'
      }
    })

    return sums
  }
}
```
