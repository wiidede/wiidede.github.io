---
title: 掘金上的小题目
date: 2022-01-10T17:13:02+08:00
tags:
  - 树
categories:
  - 算法
id: juejin-serval-question
---

[[toc]]

# 掘金上的小题目

## 扁平数据结构转Tree[题目](https://juejin.cn/post/6983904373508145189)

```js
const arr = [
  { id: 1, name: '部门1', pid: 0 },
  { id: 2, name: '部门2', pid: 1 },
  { id: 3, name: '部门3', pid: 1 },
  { id: 4, name: '部门4', pid: 3 },
  { id: 5, name: '部门5', pid: 4 },
]

function arrayToTree(arr) {
  const map = {} // 使用map快速通过找到id找到某一项
  const arrWithChildren = arr.map((item) => {
    const res = { ...item }
    res.children = []
    map[res.id] = res
    return res
  })

  const tree = []

  arrWithChildren.forEach((item) => {
    const parent = map[item.pid]
    if (!parent) {
      tree.push(item)
      return
    }

    parent.children.push(item)
  })

  return tree
}

arrayToTree(arr)
```

没想到真的在实际开发中用到了，优化一下写法抽出来吧，顺便优化树的结构，添加parent查看parent节点

```js
function arr2tree(arr, idKey = 'id', parentIdKey = 'parentId', childrenKey = 'children') {
  const map = {}
  const tree = []
  arr.map((item) => {
    const res = { ...item, [childrenKey]: [] }
    map[res[idKey]] = res
    return res
  }).forEach((item) => {
    const parent = map[item[parentIdKey]]
    item[parentKey] = parent
    parent ? parent[childrenKey].push(item) : tree.push(item)
  })
  return tree
}
```

为了进一步优化树的结构，给每一个节点遍历加上根节点id

```js
function addRootId(arr, rootIdKey = 'rootId', idKey = 'id', childrenKey = 'children') {
  const traverse = (node, rootId) => {
    node[rootIdKey] = rootId
    node[childrenKey] && node[childrenKey].forEach(child => traverse(child, rootId))
  }
  arr.forEach((root) => {
    traverse(root, root[idKey])
  })
}
```
