---
title: 全局进度条
date: 2022-07-06 17:22:37
id: global-progress
categories:
  - 前端
tags:
  - 框架
---

[[toc]]

# 全局进度条

```js
const LoadingTip = Vue.extend({
  data() {
    return {
      // loadingNum: store.state.iomsFrontendStore.loadingJson.loadingNum
    }
  },
  computed: {
    loadingTitle() {
      return store.state.loadingJson.loadingTitle
    },
    loadingNum() {
      return store.state.loadingJson.loadingNum
    }
  },
  template: `
    <div id="vue-loading" class="loading__wrapper">
    <div class="loading_contend">
      <title class="loading_title">{{loadingTitle}}</title>
      <el-progress :percentage="loadingNum"></el-progress>
    </div>
    </div>`
})
// 2、创建实例，挂载到文档以后的地方
const tpl = new LoadingTip().$mount().$el

export function startLoading() {
  // 3、把创建的实例添加到body中
  document.body.appendChild(tpl)
  // 阻止遮罩滑动
  document.querySelector('#vue-loading').addEventListener('touchmove', (e) => {
    e.stopPropagation()
    e.preventDefault()
  })
}

export function endLoading() {
  if (document.querySelector('#vue-loading')) {
    const tpl = document.querySelector('#vue-loading')
    document.body.removeChild(tpl)
  }
}
```
