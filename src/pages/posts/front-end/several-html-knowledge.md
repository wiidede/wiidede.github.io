---
title: html小知识
date: 2021-07-06T10:12:15+08:00
id: several-html-knowledge
categories:
  - 前端
tags:
  - HTML
---

[[toc]]

# 一些html小知识

## 控制输入整数(Vue)

```html
<label>
  <input v-model.number="age" type="number" oninput="value = value.replace(/[^\-\d]/g, '')" />
</label>
```

如果需要输入小数，直接把`oninput`删除即可
