---
title: webpack 知识总结
date: 2022-03-04T13:27:19+08:00
id: webpack-knowledge
categories:
  - 前端
tags:
  - webpack
---

[[toc]]

# webpack 知识总结

## 不打包某个文件夹

比如在复制资源文件下的时候，不打包assests中的js目录

```js
// eslint-disable-next-line no-new
new CopyWebpackPlugin([{
  from: path.resolve(__dirname, '../assets'),
  to: 'assets',
  ignore: ['js/**']
}])
```

`*.txt`: 忽略txt后缀

`.*`: 忽略编辑器文件或特殊文件

`js/**`: 忽略js文件夹

`js/*`: 忽略某js文件夹下内容
