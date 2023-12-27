---
title: vue的小技巧总结
date: 2021-12-27T15:23:50+08:00
id: several-vue-skills
categories:
  - 前端
tags:
  - Vue
---

[[toc]]

# title: vue的小技巧总结

作者：Web前端技术委员会

## 当用户按下ENTER键时切换下一个表单输入

当我们使用Vue时，如果需要处理一些键盘事件。例如在输入框时，需要按下 Enter 键，切换到下一个输入框，
我们可以通过@keyup.enter快速实现这个功能：

```vue
<input
    type="text"
    @keyup.enter="$event.target.nextElementSibling.focus()"
/>
```

## 动态刷新（重新加载）特定组件

某些情况下，我们需要重新加载组件而不影响它所在页面的其他部分。虽然我们无法主动触发Vue组件渲染，
但是我们可以通过变更组件的Key值来实现组件刷新。

```vue
<script>
export default {
  data() {
    return {
      reloadMe: 0,
    }
  },

  methods: {
    forceRerender() {
      this.reloadMe += 1
    }
  }
}
</script>

<template>
  <component-to-re-render :key="reloadMe" />
</template>
```

当然，如果你想重新加载整个页面的话，可以通过以下代码：

```js
window.location.reload()
this.$router.go(0)
```

## 组件Props传值验证

我们在props传值的时候，除了可以指定某个属性的类型，还支持通过validator自定义校验函数，
将传入的值限制到某些范围，我们可以在检测传入是否存在错误的同时，也更方便其他同事查看我们组件代码时，
了解该属性可以接受哪些值。

```vue
<script>
export default {
  props: {
    type: {
      type: String,
      validator: s => ['submit', 'reset'].includes(s)
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<template>
  <button
    :disabled="disabled"
    :type="type"
  >
    <slot />
  </button>
</template>
```

## 路由更改时进行某些操作

如果我们想要在路由变化时，对某些组件进行操作，我们可以在对应的组件中使用watch来监听路由变化。
例如某个长列表，我们将他滚动到底部切换页面，切换回来后想让他回到顶部，那么我们可以：

```vue
<script>
export default {
  watch: {
    // 为什么不用路由守卫啊，不明白这么写的原因？——搬运者注
    $route() {
      window.scrollTo(0, 0)
    }
  }
}
</script>
```

## 属性事件传递

写过高阶组件的童鞋可能都会碰到过将加工过的属性继续向下传递的情况，如果碰到属性较多时，
需要一个个去传递，非常不友好并且费时，有没有一次性传递的呢？举个例子，
假如有一个基础组件 ChildComponent，只有基础的列表展示功能，现在我们想在这基础上增加排序功能，
这个时候我们就可以创建一个高阶组件 Parent 。
我们只需要将当前组件的$props和$listeners通过v-bind和v-on一起传递下去。

```vue
<!-- Parent.vue -->
<template>
  <ChildComponent v-bind="$props" v-on="$listeners" />
</template>
```

## 长列表性能优化

我们应该都知道 vue 会通过`object.defineProperty`对数据进行劫持，来实现视图响应数据的变化，
然而有些时候我们的组件就是纯粹的数据展示，不会有任何改变，我们就不需要vue来劫持我们的数据，
在大量数据展示的情况下，这能够很明显的减少组件初始化的时间，那如何禁止vue劫持我们的数据呢？
可以通过 `object.freeze` 方法来冻结一个对象，一旦被冻结的对象就再也不能被修改了。

另外需要说明的是，这里只是冻结了user的值，引用不会被冻结，当我们需要reactive数据的时候，
我们可以重新给user赋值。

```vue
<script>
export default {
  data: () => ({
    users: {}
  }),
  async created() {
    const users = await axios.get('/api/users')
    this.users = Object.freeze(users)
  }
}
</script>
```

## 监听组件的生命周期

这里提供一种特别简单的方式，子组件不需要任何处理，只需要在父组件引用的时候通过 @hook 来监听即可，
代码如下:

```vue
<ChildComponent @hook:mounted="doSomething" />
```

当然这里不仅仅是可以监听mounted，其它的生命周期事件，例如created、updated等都可以.
