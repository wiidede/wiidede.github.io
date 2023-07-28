---
title: vue隔代组件层层动态插槽并且附带数据
date: 2020-10-14 15:57:28
tags:
  - Vue
categories:
  - 前端
id: vue-slot-with-two-generation
---

[[toc]]

# vue隔代组件层层动态插槽并且附带数据

最近写代码，孙子组件有插槽，想要在爷爷组件里面往孙子组件里面插东西，发现插不进去，于是在父组件也建立了一个插槽。

比较特殊的地方在于这个插槽的名字是动态的，而且可能不止一个（v-for根据数据循环判断有多少插槽）

## 孙子组件

```vue
<div v-for="(item,index) in config" :key=index>
  <span v-if="item.custom">
        <slot :name="item.custom" :value="item.key" :index="index"></slot>
  </span>
</div>
```

可以看到，孙子组件的具名插槽的名字是动态的，其实也就是由爷爷组件提供的

## 子组件

```vue
<template v-for="item in config" v-slot:[item]="value">
  <slot :name="item" :value="value.value" />
</template>
```

父组件是一个桥梁，根据数据得到相应需要有的插槽数来创建模板插入孙子组件，由于孙子组件的插槽名是动态的，所以，这里使用v-slot指令，插槽名为item对应的值，同时附带孙子组件的value值。

而模板里面又是一个插槽供爷爷组件进行插入，名字依旧是动态的item的值，附带从孙子组件得到的value

## 爷爷组件

```vue
<template v-slot:slot-name-one="value">
  <div class="slot-name-one">
    <div class="value">
      {{ value.value }}
    </div>
    <div class="value">
      {{ value.value }}
    </div>
  </div>
</template>

<template v-slot:slot-name-two="value">
    <div class="slot-name-two">
        <div :class="value.value === 'a' ? 'a' : 'other'">{{ value.value }}</div>
    </div>
</template>
```

这样爷爷组件就可以尽情的往孙子组件插入了
