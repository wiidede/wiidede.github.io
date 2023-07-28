---
title: vue3+ts根据高度改变元素的透明度
date: 2021-08-24 16:14:39
id: vue3-ts-change-element-height
categories:
  - 前端
tags:
  - Vue
  - TypeScript
  - DOM
---

[[toc]]

# vue3+ts根据高度改变元素的透明度

边看代码边解释吧：

```ts
import type { ComponentPublicInstance } from 'vue'
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  setup() {
    // 定义ref，这样可以直接获取页面中的组件
    // 组件类型可以从vue中引入
    // scrollViewRef 的组件是 ElementPlus 定义的，这里type直接偷懒了
    const scrollViewRef = ref<null | { wrap: HTMLElement }>(null)
    const goBackBarRef = ref<null | ComponentPublicInstance<HTMLElement>>(null)
    onMounted(() => {
      if (scrollViewRef.value) {
        // 监听滚动事件
        scrollViewRef.value.wrap.addEventListener('scroll', () => {
          if (goBackBarRef.value) {
            // getBoundingClientRect().top 使用这个函数可以获取页面的高度
            const top = goBackBarRef.value.$el.getBoundingClientRect().top
            // 最后把透明度按照一定的公式改掉就可以了
            goBackBarRef.value.$el.style.opacity = String(top / 32 + 0.5)
          }
        })
      }
    })

    return { scrollViewRef, goBackBarRef }
  },
})
```

## 优化

查看scroll事情 mdn 的时候，发现可以优化一下，大家可以直接参考下面的链接

[Scroll 事件节流](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/scroll_event#scroll_%E4%BA%8B%E4%BB%B6%E8%8A%82%E6%B5%81)

代码：

```js
// 参见: http://www.html5rocks.com/en/tutorials/speed/animations/

let last_known_scroll_position = 0
let ticking = false

function doSomething(scroll_pos) {
  // 根据滚动位置做的事
}

window.addEventListener('scroll', (e) => {
  last_known_scroll_position = window.scrollY

  if (!ticking) {
    window.requestAnimationFrame(() => {
      doSomething(last_known_scroll_position)
      ticking = false
    })

    ticking = true
  }
})
```
