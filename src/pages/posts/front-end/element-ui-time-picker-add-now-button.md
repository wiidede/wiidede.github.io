---
title: ElementUI timePicker 增加此刻按钮 引发的dom操作的学习
date: 2021-04-06 15:12:43
tags:
  - 前端
  - Vue
  - ElementUI
categories:
  - 前端
id: element-ui-time-picker-add-now-button
---

# ElementUI timePicker 增加此刻按钮 引发的dom操作的学习

## 解决方案

获取timePicker弹出框的footer元素

替换原来的取消按钮

\<template\>

```html
<el-time-picker
        @click.native="handleClickTime"
        v-model="value"
        :picker-options="{selectableRange: '18:00:00 - 20:00:00'}"
        placeholder="请选择时间">
</el-time-picker>
```

\<script\>

```javascript
handleClickTime() {
  let footer = document.querySelector('.el-time-panel__footer');
  let element = document.createElement('input');
  element.type = 'button';
  element.value = '此刻';
  element.addEventListener('click', () => {
    console.log('点击此刻按钮');
  });
  footer.appendChild(element);
}
```

## 引发的思考

一开始看到 element UI 不支持 slot ，就开始束手无措，甚至想驳回请求，后来请教了一下组长，直接用 dom 操作加上了 button

所以还是要加强对 JavaScript 的学习
