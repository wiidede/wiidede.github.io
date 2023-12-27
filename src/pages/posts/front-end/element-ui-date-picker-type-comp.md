---
title: element UI el-date-picker 年月日切换组件
date: 2021-12-27T10:15:45+08:00
id: element-ui-date-picker-type-comp
categories:
  - 前端
tags:
  - ElementUI
  - Vue
  - Vue组件
  - 前端
---

[[toc]]

# Element UI el-date-picker 年月日切换组件

组件特点：

1. 切换elementUI el-date-picker 的类型的按钮，并且页面显示不出问题
2. 有change事件抛出 有 类型变量.sync

```vue
<script>
export default {
  name: 'DaySelector',
  props: {
    time: {
      type: Date,
      default: () => new Date()
    }
  },
  data() {
    return {
      timeType: 'date',
      timeTypeList: [
        { label: '日', value: 'date' },
        { label: '月', value: 'month' },
        { label: '年', value: 'year' }
      ]
    }
  },
  computed: {
    timeModel: {
      get() {
        return this.time
      },
      set(val) {
        this.$emit('update:time', val)
        this.$emit('changed', val)
      }
    }
  },
  methods: {
    handleTimeTypeChanged(val) {
      this.timeType = val
      this.$emit('typeChanged', val)
    }
  }
}
</script>

<template>
  <div class="day-selector-comp">
    <div class="select-button-list">
      <div
        v-for="type in timeTypeList"
        :key="type.value"
        class="select-button"
        :class="{ active: timeType === type.value }"
        @click="handleTimeTypeChanged(type.value)"
      >
        {{ type.label }}
      </div>
    </div>
    <div class="selectPicker">
      <div v-for="type in timeTypeList" :key="type.value">
        <el-date-picker
          v-if="timeType === type.value"
          v-model="timeModel"
          clearable
          :type="type.value"
          v-on="$listeners"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.day-selector-comp {
  display: inline-flex;
  gap: 16px;
}

.select-button-list {
  display: flex;

  .select-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 30px;
    border: 1px solid #dcdfe6;
    border-right: 0;
    background: #ffffff;
    cursor: pointer;

    &:first-child {
      border-radius: 4px 0 0 4px;
    }

    &:last-child {
      border-radius: 0 4px 4px 0;
      border-right: 1px solid #dcdfe6;
    }

    &.active {
      border: 1px solid #457ae6;
      background: #457ae6;
      color: #ffffff;
    }
  }
}
</style>
```

当然，有了这个组件之后，我们可以通过 moment 做一些快捷优雅的操作

比如，写请求参数的时候，我们获取到当前的时间，和选中的类型就可以快速得到目前选中的开始时间和结束时间

```js
const params = {
  start_time: moment(this.dateValue).startOf(this.paramDateType).unix(),
  end_time: moment(this.dateValue).endOf(this.paramDateType).unix()
}
```

或者按照给出的配置 生成 disabledDate 配置

```js
import moment from 'moment'

const timeTypes = [
  { key: 'date', actionKey: 'day', elType: 'date', label: '日', range: 365 },
  { key: 'week', actionKey: 'week', elType: 'week', label: '周', range: 52 },
  { key: 'month', actionKey: 'month', elType: 'month', label: '月', range: 12 },
  { key: 'quarter', actionKey: 'quarter', elType: 'month', label: '季度', range: 4 },
  { key: 'year', actionKey: 'year', elType: 'year', label: '年', range: 1 }
]

const timeMap = timeTypes.reduce((map, item) => {
  map[item.key] = item
  return map
}, {})

function getPickerOptions(currentTime, type) {
  const beforeTime = moment(currentTime).subtract(timeMap[type].range, timeMap[type].actionKey)
  const afterTimer = moment(currentTime)
  return {
    // type,
    // beforeTime,
    // afterTimer,
    disabledDate: (time) => {
      return moment(time).isBefore(beforeTime)
        || moment(time).isAfter(afterTimer)
    }
  }
}

// 没啥意义的测试
function output(content) {
  const el = document.createElement('div')
  el.innerHTML = `<pre>${JSON.stringify(content, null, 2)}</pre>`
  document.getElementById('app').appendChild(el)
}
const currentTime = new Date().valueOf()
Object.keys(timeMap).forEach((key) => {
  const option = getPickerOptions(currentTime, key)
  console.log(option)
  output(option)
})

// vue 中可能的用法（未测试）
export default {
  watch: {
    paramDateType: {
      handler(val) {
        const beforeTime = moment(this.currentTime).subtract(timeMap[val].range, `${timeMap[val].key}s`)
        this.pickerOption = {
          disabledDate: (time) => {
            return moment(time).isBefore(beforeTime)
              || moment(time).isAfter(moment(this.currentTime))
          }
        }
      },
      immediate: true
    }
  }
}
```
