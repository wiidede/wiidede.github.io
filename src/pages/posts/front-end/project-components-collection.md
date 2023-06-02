---
title: 项目组件整理
date: 2022-05-29 15:21:03
id: project-components-collection
categories:
  - 前端
tags:
  - Vue
  - Vue组件
---

# 项目组件整理

最近看了一个新的项目，分析一下里面的基础组件

## iconfont Icon 基础组件

1. 只需要type就可以用iconfont
2. 支持chrome小于12px
3. 不足：jsx里面用了class，这里没必要用render，直接用template就行了吧
4. 不足：点击事件这样写不如把所有事件、属性都弄过来：`v-on="$listeners"` `v-bind="$attrs"`

```vue
<script>
export default {
  name: 'Icon',
  props: {
    size: {
      type: [Number, String],
      default: 16
    },
    type: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'primary'
    },
    hoverColor: {
      type: String,
      default: ''
    }
  },
  methods: {
    getIconCls() {
      // let cls = `iconfont el-icon-${this.type} icon-${this.type}`;
      let cls = `iconfont icon-${this.type}`
      if (this.color)
        cls += ` icon-color-${this.color}`

      if (this.hoverColor)
        cls += ` icon-hover-color-${this.hoverColor}`

      return cls
    },
    onClick(e) {
      this.$emit('click', e)
    },
    getIconStyle() {
      const chromeMinSize = 12
      // 支持小于12px
      const retStyle = { fontSize: `${this.size}px`, width: `${this.size}px`, height: `${this.size}px` }
      if (this.size < chromeMinSize) {
        const ratio = this.size / chromeMinSize
        retStyle.transform = `scale(${ratio})`
      }
      return retStyle
    }
  },
  render() {
    return (
   <i
    onClick={this.onClick}
    class={`iconfont icon-component ${this.getIconCls()}`}
    style={this.getIconStyle()}
   />
    )
  }
}
</script>
```

## 带上分页

1. 可以不用在外面写分页，并且需要提供查询的api，让分页自动查询
2. 不足：只要参数变化就会查询，这是否合理？（如果搜索参数绑定了输入框，是不是只能通过change事件，也就是说搜索参数最好不要绑定到参数上）是否应该是只有分页变化的时候才会触发查询，其他的提供一个函数，让开发者自己去控制？

```vue
<script>
export default {
  props: {
    pagaPosition: {
      type: String,
      default: 'end'
    },
    getData: {
      type: Function,
      required: false
    },
    limit: {
      type: Number,
      default: 10
    },
    getDataParams: {
      type: Object,
      default: () => ({})
    },
    total: {
      type: Number,
      default: 0
    },
    pageSizes: {
      type: Array,
      default: () => [5, 10, 15, 25]
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    loading: {
      type: Boolean,
      default: false
    },
    immediate: {
      type: Boolean,
      default: true
    },
    pageIndex: { // 针对前端分页
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10
    }
  },
  watch: {
    getDataParams: {
      deep: true,
      handler(nVal) {
        if (!nVal.currentPage)
          this.currentPage = 1

        this.onPageChange()
      }
    },
    pageIndex(val) {
      this.currentPage = val
    }
  },
  created() {
    this.immediate && this.getData && this.onPageChange()
    this.pageSize = this.limit
  },
  methods: {
    async onPageChange() {
      this.$emit('update:loading', true)
      const params = { ...this.getDataParams }
      delete params.currentPage
      for (const i in params) {
        if (params[i] === '' || params[i] === undefined || params[i] === null)
          delete params[i]

      }
      try {
        const result = await this.getData({
          pageSize: this.pageSize,
          pageIndex: this.currentPage,
          ...params
        }).finally(() => {
          this.$emit('update:loading', false)
        })
        this.$emit('getDataSuccess', result)
      }
      catch (error) {
        this.$emit('getDataError', error)
      }
    }
  }
}
</script>

<template>
  <div class="k-frame-pagination-wrap">
    <slot name="toolbar" />
    <slot />
    <div class="pagination mt10 px5 py10" :class="[`jc-${pagaPosition}`]">
      <el-pagination
        v-model:page-size="pageSize"
        v-bind="$attrs"
        v-model:current-page="currentPage"
        class="k-frame-pagination"
        :total="total"
        :page-sizes="pageSizes"
        :layout="layout"
        v-on="$listeners"
        @current-change="onPageChange"
        @size-change="onPageChange"
      />
    </div>
  </div>
</template>
```

## 简单的展开组件

这个组件是我加上去的，利用elementUI的展开动画

```vue
<script>
export default {
  name: 'SimpleCollapse',
  props: {
    title: {
      type: String,
      default: ''
    },
    defaultCollapse: {
      type: Boolean,
      default: true
    },
    titleClass: {
      type: String,
      default: ''
    },
    panelClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isCollapse: true
    }
  },
  created() {
    this.isCollapse = this.defaultCollapse
  },
  methods: {
    changeCollapse() {
      this.isCollapse = !this.isCollapse
      this.$emit('change', this.isCollapse)
    }
  }
}
</script>

<template>
  <div>
    <div class="collapse-title" :class="titleClass">
      <div class="title" @click="changeCollapse">
        <span>{{ title }}</span>
        <i class="el-icon-arrow-down" :class="{ 'is-unfold': !isCollapse }" />
      </div>
      <div v-show="!isCollapse">
        <slot name="title-right" />
      </div>
    </div>
    <el-collapse-transition>
      <div v-show="!isCollapse" :class="panelClass">
        <slot />
      </div>
    </el-collapse-transition>
  </div>
</template>

<style lang="scss" scoped>
.collapse-title {
  height: 30px;
  display: flex;
  align-items: center;
}

.title {
  cursor: pointer;
  display: flex;
  align-items: center;

  i {
    margin-left: 6px;
    transition: .3s;

    &.is-unfold {
      transform: rotateZ(180deg);
    }
  }
}
</style>
```

### img-icon

有点疑惑这个组件存在意义在哪

```vue
<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    },
    size: {
      type: [String, Number],
      default: 16
    }
  },
  computed: {
    imgStyle() {
      const styles = {
        width: `${this.size}px`,
        height: `${this.size}px`,
        display: 'inline-block',
        cursor: 'pointer',
        verticalAlign: 'middle'
      }
      return styles
    }
  }
}
</script>

<template>
  <div class="icon-img">
    <img :style="imgStyle" style="width:100%;height:100%;" :src="url" alt="">
  </div>
</template>

<style lang="scss" scoped>
.icon-img {
 border-radius: 50%;
 height: 100%;
 display: inline-block;
 vertical-align: middle;
}

/* .icon-img:hover{
   background-color: #1890FF;
 }*/
</style>
```

directive - click outside

```js
import Vue from 'vue'

const isServer = Vue.prototype.$isServer

/* istanbul ignore next */
export const on = (function () {
  if (!isServer && document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler)
        element.addEventListener(event, handler, false)

    }
  }
  else {
    return function (element, event, handler) {
      if (element && event && handler)
        element.attachEvent(`on${event}`, handler)

    }
  }
})()

const nodeList = []
const ctx = '@@clickoutsideContext'

let startClick
let seed = 0

!Vue.prototype.$isServer && on(document, 'mousedown', e => (startClick = e))

!Vue.prototype.$isServer && on(document, 'mouseup', (e) => {
  nodeList.forEach(node => node[ctx].documentHandler(e, startClick))
})

function createDocumentHandler(el, binding, vnode) {
  return function (mouseup = {}, mousedown = {}) {
    if (!vnode
   || !vnode.context
   || !mouseup.target
   || !mousedown.target
   || el.contains(mouseup.target)
   || el.contains(mousedown.target)
   || el === mouseup.target
   || (vnode.context.popperElm
    && (vnode.context.popperElm.contains(mouseup.target)
     || vnode.context.popperElm.contains(mousedown.target))))
      return

    if (binding.expression
   && el[ctx].methodName
   && vnode.context[el[ctx].methodName])
      vnode.context[el[ctx].methodName]()

    else
      el[ctx].bindingFn && el[ctx].bindingFn()

  }
}

/**
 * v-clickoutside
 * @desc 点击元素外面才会触发的事件
 * @example
 * ```vue
 * <div v-element-clickoutside="handleClose"></div>
 * ```
 */
export default {
  bind(el, binding, vnode) {
    nodeList.push(el)
    const id = seed++
    el[ctx] = {
      id,
      documentHandler: createDocumentHandler(el, binding, vnode),
      methodName: binding.expression,
      bindingFn: binding.value
    }
  },

  update(el, binding, vnode) {
    el[ctx].documentHandler = createDocumentHandler(el, binding, vnode)
    el[ctx].methodName = binding.expression
    el[ctx].bindingFn = binding.value
  },

  unbind(el) {
    const len = nodeList.length

    for (let i = 0; i < len; i++) {
      if (nodeList[i][ctx].id === el[ctx].id) {
        nodeList.splice(i, 1)
        break
      }
    }
    delete el[ctx]
  }
}
```

## common-h1

项目里有好几个类似的组件，都是通用的一些样式，还挺方便的吧

```vue
<script>
export default {
  props: {
    title: {},
    subtitle: {},
    hasSlot: {
      type: Boolean,
      default: false
    },
    outerSlot: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<template>
  <div class="common-h1" :class="{ 'outer-slot': outerSlot }">
    <div>
      <h1 class="common-h1-title">
        {{ title }}
      </h1>
      <div class="common-h1-subtitle">
        {{ subtitle }}
        <div v-if="hasSlot" class="tool-slot k-frame-tool-bar">
          <slot />
        </div>
      </div>
    </div>
    <div v-if="outerSlot" class="outer-slot">
      <slot name="outer" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.common-h1 {
 font-size: 0;
 background-color: #fafafa;
 padding-left: 8px;
 overflow: hidden;
 margin-bottom: 8px;

  &.outer-slot {
    display: flex;
    padding-right: 8px;
    align-items: center;
    justify-content: space-between;
  }

 .common-h1-title {
  color: #000;
  font-size: 20px;
  line-height: 48px;
 }
 .common-h1-subtitle {
  font-size: 12px;
  color: #333;
  line-height: 1;
  margin-top: 6px;
  margin-bottom: 9px;
  display: flex;
  justify-content: space-between;
  .tool-slot {
   transform: translateY(-50%);
  }
 }

  .outer-slot {
    float: right;
  }
}
</style>
```
