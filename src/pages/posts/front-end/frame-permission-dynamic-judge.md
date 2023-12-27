---
title: 全局动态权限判断（Vue指令）
date: 2022-01-27T15:51:21+08:00
id: frame-permission-dynamic-judge
categories:
  - 前端
tags:
  - Vue
  - 自定义指令
  - 权限判断
  - 框架
---

[[toc]]

# 全局动态权限判断（Vue指令）

## 目标

在Vue组件中，使用`v-has`指令即可控制某一元素的权限。

后端提示权限变化的时候，前端去判断这些元素还是否有权限，并作出相应的操作。

## 实现

创建一个js文件，定义权限判断方法，以及权限判断自定义指令：

```js
/**
 * name: v-has 动态变化
 * desc: 禁止嵌套使用v-has，不然你就自己加一下子节点的判断或者换其他方案吧
 */
import Vue from 'vue'

// 项目检查权限检查的方法，定义在Vue原型链上，方便全局调用
Vue.prototype.$_has = function (id) {
  const permission = JSON.parse(localStorage.getItem('APP_PERMISSION'))
  if (!Array.isArray(permission))
    return false

  return !!permission.filter(per => per.id === id).length
}

// 收集所有需要权限判断的DOM节点
const permissionNodeConf = new Map()

// 自定义Vue指令
Vue.directive('has', {
  bind(el, binding) {
    const permissionKey = binding.value
    const hasPermission = Vue.prototype.$_has(permissionKey)

    // 将Dom节点作为key，value为相应的配置
    // 为每一个Dom节点创建一个对应的注释节点
    permissionNodeConf.set(el, {
      permissionKey,
      hasPermission,
      comment: document.createComment('permission')
    })

    if (!hasPermission) {
      // 这里使用setTimeout是因为第一次绑定的时候还没有parentNode
      // 如果没有权限就将Dom节点换成注释节点
      setTimeout(() => {
        el.parentNode.replaceChild(permissionNodeConf.get(el).comment, el)
      }, 0)
    }
  },
  unbind(el) {
    // unbind 的时候从Map中移除相应的Dom
    permissionNodeConf.delete(el)
  }
})

export {
  permissionNodeConf
}
```

接下来是main.js中引用

```js
import { permissionNodeConf } from './directive/v-has/index'

// new Vue 实例
vm = new Vue({
  el: '#app',
  // router, store, ...
})

// 初始化权限监听
Global.initPermissionWatcher(vm, permissionNodeConf)
```

Global.js：

```js
Global.initPermissionWatcher = function (vm, nodeMap) {
  // 监听Vuex中权限变化
  vm.$watch('$store.state.user.app_permission_change', () => {
    // 遍历收集来的Dom节点，通过对应的配置上的key判断是否有权限
    let visiblePermissionChanged = false
    nodeMap.forEach((conf, el) => {
      const hasPermission = vm.$_has(conf.permissionKey)
      if (hasPermission !== conf.hasPermission) {
        // 权限发生变化
        // keepAlive中的也会触发，也可以使用vNode组件实例的_inactive判断判断是否在当前页面
        visiblePermissionChanged = document.contains(el) || document.contains(conf.comment)
        if (hasPermission) {
          // 有权限，把注释节点替换回来
          conf.comment.parentNode.replaceChild(el, conf.comment)
        }
        else {
          // 无权限，将Dom节点替换成注释节点
          el.parentNode.replaceChild(conf.comment, el)
        }
        conf.hasPermission = hasPermission
      }
    })
    // 如果发现有变化的，提示页面权限变化了
    if (visiblePermissionChanged)
      vm.$message.info('页面权限发生变化！')
  })
}
```

接下来，你只要改变vuex中的`app_permission_change`的值就可以实现页面动态权限控制了。

比如后端通过websocket通知用户权限变化，这时候，重新去请求到用户权限，得到响应后，改变`app_permission_change`的值，即可。

## 总结

一开始我通过判断页面上是否存在Dom去删除数组中的Dom元素，但是后来我想到自定义指令还有unbind回调，就在unbind删除了元素，这样也解决了嵌套的指令使用无法使用的问题（嵌套后的子节点，不论是comment和原来的Dom节点，都不会在document上，所以会被我删除）。

还有一点，Vue页面很多会有keepAlive，这些被缓存的页面当然不会触发unbind，所以，提示用户权限变更的判断逻辑我改成了：只有document中存在的Dom并且这些Dom发生了权限变化，才会提示用户。

后来我想，能不能再binding的时候，获取到组件实例，在组件实例上监听Vuex 状态呢，然后，每个el，都会创建一个watcher？应该也是一种方法吧
