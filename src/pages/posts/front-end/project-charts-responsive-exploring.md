---
title: 图表组件响应式探索
date: 2022-11-11 14:07:42
id: project-charts-responsive-exploring
categories:
  - 前端
tags:
  - 框架
  - ECharts
  - VueGridLayout
---

[[toc]]

# POM BI 项目图表组件响应式探索（VueGridLayout、Echarts）

## 响应式布局常规解决方案

### px2rem px2vw

对于响应式布局，最容易联想到的就是用postcss等工具把css中的px转换rem或者vw，然后根据浏览器视窗的大小，字体大小也会响应式变化。（使用rem时需要根据窗口大小变化不断调整根节点的`font-size`）

但是这两种方案有个缺点，就是它只能针对生成的css样式去改变css的值，对于一些引入进来的组件生成的行内样式，是无法生效的。就比如`element-plus`，很多组件的width属性，如果你直接传数字的话，它会直接转成px放到生成组件的行内样式上，它无法被插件转换单位。

> el-avatar的size，想要自定义大小，只能传number，number又被转成px：

![image-20221114103731583](https://wiidede.github.io/img-store-one/images/image-20221114103731583.png)

同样的 BI 项目还用到 `vue-grid-layout`和`echarts` 这两个组件，默认单位其实都是px，无法更改。

> vue-grid-layout

![image-20221114104009574](https://wiidede.github.io/img-store-one/images/image-20221114104009574.png)

> echarts

![image-20221114103838134](https://wiidede.github.io/img-store-one/images/image-20221114103838134.png)

## VueGridLayout 响应式组件封装

这个组件的解决方案其实很简单：它的大小是由这几个属性决定的：

1. 宽度是完全由容器的宽度决定，只需要用css修改宽度即可
2. 高度由rowHeight和margin两个值，加上组件layout共同决定

这个组件会根据rowHeight和margin的值变化，自动调整页面元素的高度。所以只要在浏览器窗口大小变化的时候，重新计算这两个值就行。

这里可以使用`vueuse`库中的useWindowSize，快速拿到浏览器窗口大小。

用vue的计算属性，根据窗口大小计算rowHeight和margin，然后组件接收到的值就会更新：

> 响应式组件中计算出的值：

![image-20221114105731381](https://wiidede.github.io/img-store-one/images/image-20221114105731381.png)

> GridLayoutDynamic.vue

```vue
<script setup>
import { computed } from 'vue'
import { useWindowSize } from '@vueuse/core'

const props = defineProps({
  rowHeight: {
    type: Number,
    default: 150,
  },
  margin: {
    type: Array,
    default: () => [10, 10],
  },
  viewPortWidth: {
    type: Number,
    default: 1920, // 0 关闭自适应
  },
  viewPortHeight: {
    type: Number,
    default: rawProps => (rawProps.viewPortWidth === undefined ? 1080 : (rawProps.viewPortWidth / 16) * 9), // 0 关闭自适应，画面默认比例 16 / 9
  },
})

const { width, height } = useWindowSize()
const usingDynamic = props.viewPortHeight !== 0 && props.viewPortWidth !== 0
const rowHeightDynamic = computed(() => (usingDynamic
  ? height.value * (props.rowHeight / props.viewPortHeight)
  : props.rowHeight
))
const marginDynamic = computed(() => (usingDynamic
  ? [width.value * (props.margin[0] / props.viewPortWidth), height.value * (props.margin[1] / props.viewPortHeight)]
  : props.margin
))
</script>

<template>
  <grid-layout :row-height="rowHeightDynamic" :margin="marginDynamic">
    <slot />
  </grid-layout>
</template>
```

## ECharts 响应式组件封装

在echarts官网，关于响应式的应该就这两点

1. [响应容器大小的变化](https://echarts.apache.org/handbook/zh/concepts/chart-size#%E5%93%8D%E5%BA%94%E5%AE%B9%E5%99%A8%E5%A4%A7%E5%B0%8F%E7%9A%84%E5%8F%98%E5%8C%96)（echartsInstance.resize）
2. [移动端自适应](https://echarts.apache.org/zh/tutorial.html#%E7%A7%BB%E5%8A%A8%E7%AB%AF%E8%87%AA%E9%80%82%E5%BA%94)（Media Query）

### 响应容器大小的变化

对于官网的`响应容器大小的变化`，官网采用监听window resize事件，其实是有几个缺点的：

- 如果窗口大小没有变化，但是页面中容器大小变了，echarts并不会resize。比如收起侧边栏，echarts容器变宽
- 如果echarts所在的dom上级被隐藏起来（display: none），这时候去缩放窗口（echarts实例的resize被调用），然后再让回到echarts显示的状态，你会发现echarts的大小已经变成`10px \* 10px`（或者其他奇怪的大小）了，因为resize事件触发的时候，echarts并没有在页面中显示，这时候获取不到dom元素的宽高，然后就resize成默认的`10px \* 10px`（或者其他奇怪的大小）了。比如`element-plus`中的el-tabs，不是当前页面的echarts就不会显示

> el-tab 未激活的页面：

![image-20221114102619482](https://wiidede.github.io/img-store-one/images/image-20221114102619482.png)

比如在官网实例中，你给iframe里面的body加上display: none之后，缩放窗口，然后再把display: none取消掉，你就会发现echarts没了：
![image-20221114115313886](https://wiidede.github.io/img-store-one/images/image-20221114115313886.png)

为了解决以上两点，你可能会在页面上多写一些东西，在相应的时刻调用resize。

所以有没有一种方法可以统一的解决上面的两个问题呢？

答案就是echarts外部容器加上容器大小的监听（而不是windows的resize），这样就不会出现上述两种问题。加上容器大小的监听有两种方法：[`ResizeObserver`](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver)、[`element-resize-detector`](https://github.com/wnr/element-resize-detector)，使用方法，可以看看我的这篇[博客](https://wiidede.github.io/echarts-base-vue-comp)。

### 移动端自适应

对于官网的`移动端自适应`，也就是媒体查询，需要给出在不同分辨率下的option（/样式），这种方法写起来可能比较繁琐，也不能很好的和px2vw这种插件配合。

### 解决方法

所以，可以不可以让echarts也能有px2vw这种类似的效果呢？

比如想让echarts的fontSize动态响应，那么就应该拿到option中所有的fontSize，然后再窗口大小变化的时候，重新给收集到的这些fontSize赋值。

有了这个思路，配合上上面提到给容器加上大小变化监听，就可以抽出一个echarts的通用组件。

fontSize自适应效果：

![image-20221114105418438](https://wiidede.github.io/img-store-one/images/image-20221114105418438.png)

![image-20221114104942806](https://wiidede.github.io/img-store-one/images/image-20221114104942806.png)

### Echarts组件封装

这个组件有几个特点：

1. 使用echarts时，只需要传入option，就会自动更新option，无需自己选择dom元素、调用init
2. echarts的点击事件会转成vue组件的事件
3. 监听容器大小并且resize，使用时不在需要关心什么时候需要resize
4. 传入屏幕宽度，所有fontSize就会自动根据屏幕宽度响应式改变大小
5. 你甚至可以传入虚假的viewPortWidth让图表整体字体大小改变

提示：

- 这个组件setOption采用不合并的模式，需要全量传入option
- 对于echarts普通合并模式，有些数据项需要给到name、id，不然走的是增量更新，无法重设字体大小，参考[`echartsInstance.setOption`](https://echarts.apache.org/zh/api.html#echartsInstance.setOption)

可以改造扩展的地方：

1. 现在只是针对fontSize做响应式，后续可以加上其他的，比如margin，padding，itemWidth等等
2. 现在是根据屏幕宽度响应式，如果想根据容器宽度响应式也是可以的

> ECharts.vue

```vue
<script setup>
import { cloneDeep, debounce, get, set } from 'lodash'
import * as echarts from 'echarts'
import {
  onMounted, onUnmounted, ref, watch,
} from 'vue'
import { getObjectPaths } from '@/utils/utils'

const props = defineProps({
  option: {
    type: Object,
    required: true,
  },
  viewPortWidth: {
    type: Number,
    default: 1920, // 0 关闭自适应
  },
})

const emit = defineEmits(['resize', 'mouseover', 'mouseout', 'click', 'legendselectchanged'])

let chart
const echartsRef = ref()
let destroyFunc

const defaultResizingOption = {} // 自适应配置（echarts 普通合并模式，需要用到name、id）
const fontSizePaths = new Set() // fontSize 需要的 key

const getEchartsInstance = () => chart
function setOption(option) {
  option && chart.setOption({ ...option }, true)
  // 这里没有走echarts合并模式，所以就不传参数，直接拿到echarts实例的option。
  // 如果是echarts合并模式，需要传入option，并且要想办法拿到echarts默认的option。
  collectFontSizePath()
}

// 注册echarts事件到Vue组件
function initChartEvent() {
  const emitEvents = ['mouseover', 'mouseout', 'click', 'legendselectchanged']
  emitEvents.forEach((eventName) => {
    chart.on(eventName, (params) => {
      emit(eventName, params, chart)
    })
  })
}

// echarts 容器大小自适应
function makeChartsResponsive() {
  const targetNode = echartsRef.value
  const resizeDebounced = debounce(() => {
    chart.resize()
    setFontSize() // resize的时候也要重新设置字体大小
  }, 50)
  const resizeObserver = new ResizeObserver((targets) => {
    resizeDebounced()
    const [target] = targets
    const { width, height } = target.contentRect
    emit('resize', { width, height }, chart)
  })
  resizeObserver.observe(targetNode)
  destroyFunc = () => {
    resizeObserver.disconnect()
  }
}

// 拿到option中所有的fontSize（包括基础的id、name）
function collectFontSizePath(option) {
  option === undefined && (option = chart.getOption())
  const pathList = getObjectPaths(option)
  const optionPathList = pathList.filter(path => !path.includes('data'))
  const basePathList = optionPathList.filter(path => path.endsWith('.name') || path.endsWith('id'))
  const fontSizePathList = optionPathList.filter(path => path.endsWith('.fontSize'))
  basePathList.forEach(path => set(defaultResizingOption, path, get(option, path)))
  fontSizePathList.forEach((path) => {
    let fontSize = get(option, path)
    if (typeof fontSize === 'string' && fontSize.endsWith('px'))
      fontSize = Number(fontSize.replace('px', '')) || 12

    set(defaultResizingOption, path, fontSize)
    fontSizePaths.add(path)
  })
  setFontSize()
}

// 遍历收集到的fontSize，根据页面宽度重新设置字体大小
function setFontSize() {
  if (!props.viewPortWidth)
    return
  const width = document.body.clientWidth
  const ratio = width / props.viewPortWidth
  const fontSizeOption = cloneDeep(defaultResizingOption)
  fontSizePaths.forEach((path) => {
    const fontSize = get(defaultResizingOption, path)
    const newFontSize = Number((ratio * fontSize).toFixed(5)) // 精度
    set(fontSizeOption, path, newFontSize)
  })
  chart.setOption(fontSizeOption)
}

onMounted(() => {
  chart = echarts.init(echartsRef.value)
  setOption(props.option)
  initChartEvent()
  makeChartsResponsive()
})

onUnmounted(() => {
  chart && chart.dispose()
  destroyFunc && destroyFunc()
})

watch(
  () => props.option,
  (option) => {
    setOption(option)
  },
  // { deep: true }, // 如果默认不走echarts合并模式，就不需要deep了
)

defineExpose({
  getEchartsInstance,
})
</script>

<template>
  <div ref="echartsRef" class="echarts" />
</template>

<style scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
```

取到对象所有的path

```js
function getObjectPaths(object) {
  const paths = []
  const getPaths = (obj, path) => {
    if (obj && typeof obj === 'object') {
      Object.keys(obj).forEach((key) => {
        getPaths(obj[key], path ? `${path}.${key}` : key)
      })
    }
    else {
      paths.push(path)
    }
  }
  getPaths(object, '')
  return paths
}
```

至此，两个组件的响应式就已经弄好了
