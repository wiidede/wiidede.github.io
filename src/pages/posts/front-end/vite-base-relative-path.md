---
title: Vite base使用相对路径踩坑，获取public绝对路径
date: 2023-10-17 16:59:36
id: vite-base-relative-path
categories:
  - 前端
tags:
  - Vite
---

[[toc]]

# Vite base使用相对路径踩坑，获取public绝对路径

为了更方便地部署到不同的现场，有时候我们会使用 Vite base 的相对路径。首先，将 Vite 配置中的 base 改为 `'./'`。

```ts
defineConfig({
  base: './',
})
```

## 问题重现

Vite 的教程到这里就结束了，但是在实际项目中我遇到了一些问题，发现自己**找不到 public 文件夹在哪里**。

根据 Vite 对 public 路径的注意事项：

> 请注意：
>
> - 引入 public 中的资源永远应该使用根绝对路径 —— 举个例子，public/icon.png 应该在源码中被引用为 /icon.png。
> - public 中的资源不应该被 JavaScript 文件引用。

比如，如果在 JavaScript 文件中尝试使用 `import '/xxx.json'` 就会被拒绝，但是如果一定要获取该文件，可以使用 `fetch('/xxx.json')`。

如果我们的项目使用固定路径，这种方法是没有问题的。但是一旦使用了相对路径，我们就找不到 public 路径在哪里了。

我们来观察一下 Vite 是如何请求静态资源的（假设项目部署在 /dist 路径下）。

![vite-request](https://wiidede.github.io/img-store-one/images/clipbord_1688624551580.png)

这就好像 Vite 知道相对路径具体在哪里，但是我们并不知道。

## 定位public路径

于是我开始翻阅 Vite 的文档，虽然没有找到如何获取路径的绝对值，但我发现了 `import.meta.url`，这个应该是当前文件的位置。

我决定尝试一下 `new URL(import.meta.url)`：

- 在开发环境中，它的 `pathname` 是 `/src/xxxx.ts`。
- 经过 Vite 打包后，在生产环境中，它的 `pathname` 应该是这样的：`/public/index-xxxxxxxx.js`。
- 如果部署在某个目录下面，那么它的 `pathname` 则会是：`/one/second/public/index-xxxxxxxx.js`。

这样我们就可以匹配到生产环境域名后面的路径。

```js
function getPath() {
  let path = ''
  if (import.meta.env.MODE !== 'development') {
    const metaUrl = new URL(import.meta.url) // 获取当前模块的 URL
    const metaUrlMatch = metaUrl.pathname.match(/^(.*?)\/public\//) // 匹配public前面的路径
    if (metaUrlMatch && metaUrlMatch[1])
      path = metaUrlMatch[1]
  }
  return path
}

export const publicPath = getPath()
```

在生产环境中，即使 base 的值是相对路径，`publicPath` 的值将会是 `/one/second/`，这样我们就可以使用这个值来拼接得到 public 的路径，然后就：

```js
fetch(`${publicPath}/xxxx.json`)
```

js在相对路径的情况下获取public资源，拿下！
