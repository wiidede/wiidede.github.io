---
title: leetcode-cn-40-组合总和 II 以及回溯
date: 2021-04-06 15:33:52
tags:
  - 回溯
categories:
  - 算法
id: leetcode-cn-40
---

[[toc]]

# [题目](https://leetcode-cn.com/problems/combination-sum-ii/)

给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

candidates 中的每个数字在每个组合中只能使用一次。

## 动态规划

### 解题思路

一般的回溯

```javascript
var template = function(candidates, target) {
  let ret = [] // 结果
  let dfs = (path, pos) => {
    if (/* 该路径不再满足某条件 */) {
      return
    }
    if (/* 该路径满足某条件，将路径放入结果中*/) {
      ret.push([...path])
    }

    // 遍历解决
    for (let i = pos; i < candidates.length; ++i) {
      if (/* 满足某条件，不再判断此分支 */) {
        continue
      }
      // 路径增加正在遍历的节点
      path.push(candidates[i])
      // 递归进去，完成正在遍历节点的路径判断
      dfs(path, i + 1)
      // 路径弹出正在遍历的节点，该节点判断完成，等下次循环推入下一个节点
      path.pop()
    }
  }
  // 执行递归
  dfs([], 0)

  return ret
};
```

这道题因为涉及到组合的综合，也就是当前路径的sum，所以我们把sum也作为一个参数一直传进去，如果sum超过了，分支结束，sum正好等于target（满足条件），存入该路径

如果最后结果允许重复的话，这样就可以了

但是解集不允许重复

所以我们加入如下的两行代码，就可以达到去重的目的

最主要的是如何理解 `i > pos`

在回溯过程中，第二个相同元素引发的分支会和之前重复，所以我们应该去除，当然者必须建立在原数组排序号的基础上

`candidates.sort((a, b) => a - b)`

`if (i > pos && candidates[i] === candidates[i - 1])`

### 代码

```javascript
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
    let ret = []
    candidates.sort((a, b) => a - b)
    let dfs = (path, pos, sum) => {
        if (sum > target) {
            return
        } else if (sum === target) {
            ret.push([...path])
        }

        for (let i = pos; i < candidates.length; ++i) {
            if (i > pos && candidates[i] === candidates[i - 1]) {
                continue
            }
            path.push(candidates[i])
            dfs(path, i + 1, sum + candidates[i])
            path.pop()
        }
    }
    dfs([], 0, 0)

    return ret
};
```
