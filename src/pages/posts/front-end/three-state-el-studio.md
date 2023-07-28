---
title: 可以不选择的el-radio单选框
date: 2021-12-27 14:45:53
id: three-state-el-studio
categories:
  - 前端
tags:
  - ElementUI
  - 前端
  - Vue
  - Vue组件
---

[[toc]]

# 可以不选择的el-radio单选框

这个组件比较宽泛，主要是异常和正常两个选项，所以写成了这样

写的不是很好，可以借鉴

有待优化

```vue
<script>
export default {
  name: 'ContentRadioGroup',
  props: {
    state: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      flag: false,
      isNormal: false,
      isAbnormal: false
    }
  },
  watch: {
    state: {
      handler(val) {
        if (val === -1) {
          this.isNormal = false
          this.isAbnormal = false
        }
        else if (val === 0) {
          this.isNormal = true
          this.isAbnormal = false
        }
        else if (val === 1) {
          this.isNormal = false
          this.isAbnormal = true
        }
      },
      immediate: true
    }
  },
  methods: {
    changed() {
      let state
      if (!this.isNormal && !this.isAbnormal)
        state = -1
      else if (this.isNormal && !this.isAbnormal)
        state = 0
      else if (!this.isNormal && this.isAbnormal)
        state = 1

      this.$emit('update:state', state)
      this.$emit('change', state)
    },
    toggleNormal() {
      this.isNormal = !this.isNormal
      if (this.isNormal && this.isAbnormal)
        this.isAbnormal = false

      this.changed()
    },
    toggleAbnormal() {
      this.isAbnormal = !this.isAbnormal
      if (this.isAbnormal && this.isNormal)
        this.isNormal = false

      this.changed()
    }
  }
}
</script>

<template>
  <span>
    <el-radio
      v-model="isNormal" :label="true" class="is-focus"
      @click.prevent="toggleNormal"
    >正常</el-radio>
    <el-radio
      v-model="isAbnormal" :label="true" class="is-focus"
      @click.prevent="toggleAbnormal"
    >异常</el-radio>
  </span>
</template>

<style scoped>

</style>
```
