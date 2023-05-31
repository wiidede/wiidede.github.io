---
title: Moment的一些使用方法
date: 2021-09-30 09:50:19
id: moment-usage-example
categories:
  - 前端
tags:
  - Moment
---

# Moment的一些使用方法

## 禁止选中当前月及之后月

```js
disabledDate = (time) => {
  return moment(time).isSameOrAfter(moment().startOf('month'))
}
```

## 默认取最近的三个月(不含当前月)

```js
const timeRange = [
  moment().subtract(3, 'months').startOf('month').valueOf(),
  moment().subtract(1, 'months').endOf('month').valueOf()
]
```

## 选中时间最近一年

```js
const timeRange = [
  moment(time.minDate).add(1, 'months').subtract(1, 'years').valueOf(),
  moment(time.minDate).add(1, 'years').valueOf()
]
```
