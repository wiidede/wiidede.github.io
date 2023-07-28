---
title: 毕业设计（水表识别）前端知识整理
date: 2021-06-04 17:52:12
id: graduation-project-front-end-knowledge
categories:
  - 前端
tags:
  - 毕业设计
  - Vue
---

[[toc]]

# 毕业设计（水表识别）前端知识整理

大学毕业设计刚刚做完，做的是水表识别，整个项目源代码放在了[github](https://github.com/wiidede/water-meter-frontend) [gitee](https://gitee.com/wiidede/water-meter-frontend)，前端比较简单，用来上传图片并且展示识别结果。

## 技术点：

- Vue3.0
- Element Plus
- Vue-CLI 4.5

## 部分实现

### App.vue

这里先把整个页面的结构布置完毕，并且我们使用`el-scrollbar`组件来包裹整个页面以现实更好的滚动条。

我也引入自己写好的header和footer组件，使结构更为清楚。

为了每次切换能够让页面移到最上面，我们在setup函数中加入对路由的监听。

具体代码如下：

``` vue
<script>
export default {
  setup() {
    const scrollViewRef = ref(null)
    const router = useRouter()
    router.beforeEach(() => {
      if (scrollViewRef.value)
        scrollViewRef.value.wrap.scrollTop = 0

    })
    return { scrollViewRef }
  }
}
</script>

<template>
  <wm-header />
  <el-scrollbar ref="scrollViewRef">
    <router-view v-slot="{ Component }" class="pb-4 pt-4" style="min-height: calc(100vh - 120px)">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <wm-footer />
  </el-scrollbar>
</template>
```

因为是直接设置容器的scrollTop，所以我们给容器加入平滑滚动的样式：

```scss
.el-scrollbar__wrap {
  scroll-behavior: smooth;
}
```

### header

在header组件，我们把需要放在右上角的tab放入数组headList中，方便维护。

然后我们动态监听当前页面的路由，这里我们直接使用Vue 3的WatchEffect，判断tab数组中的链接是否与当前的路由相等，如果相等的话，即改变这个tab的样式。

wm-header.vue 代码如下：

``` vue
<script>
import { reactive, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'WmHeader',
  setup() {
    const headList = reactive( // tab列表放在这个变量
      [
        { path: '/', label: '主页', active: false },
        { path: '/about', label: '关于', active: false }
      ]
    )
    const router = useRouter() // 使用 vue3 的 useRouter() 来获取当前的路由
    watchEffect(() => { // watchEffect() 会监听代码中有变化的值，来执行函数
      headList.forEach((head) => {
        head.active = router.currentRoute.value.path === head.path
      })
    })
    return { headList }
  }
}
</script>

<template>
  <el-header class="d-flex justify-content-between align-items-center w-100">
    <router-link to="/" class="logo header-title">
      水表识别系统
    </router-link>
    <div class="d-flex align-items-center right-header h-100">
      <router-link
        v-for="(head, index) in headList" :key="`head-${index}`" :to="head.path" :class="{ active: head.active }"
        class="header-item ml-1 mr-1 h-100 pl-3 pr-3"
      >
        <div class="d-flex align-items-center header-item-text h-100">
          {{ head.label }}
        </div>
      </router-link>
    </div>
  </el-header>
</template>
```

### 复制到剪贴板

对于结果页面，我们需要写一个复制到剪贴版的函数，我们把这个函数抽离到utils.js中

我们需要传入需要复制的内容、以及成功、失败分别需要调用的函数。

```js
export function copyToClipboard(content, successFunc, errorFunc) {
  const tempEl = document.createElement('input')
  tempEl.setAttribute('value', content)
  document.body.appendChild(tempEl)
  tempEl.select()
  if (document.execCommand('copy'))
    successFunc && typeof successFunc === 'function' && successFunc()
  else
    errorFunc && typeof errorFunc === 'function' && errorFunc()

  document.body.removeChild(tempEl)
}
```

然后我们就可以在vue组件中使用这个函数：

```js
import { copyToClipboard } from '../../utils'

function copy(content) {
  copyToClipboard(
    content,
    () => ElMessage.success('已复制到剪贴板'),
    () => ElMessage.error('复制失败')
  )
}
```

## 总结

前端的页面比较简单，重点的代码基本就是上面这些。

这次毕设主要是尝试vue 3.0，试着写组合Api。

你可以在[这里](/graduation-project-back-end-knowledge/)查看我的后端项目整理
