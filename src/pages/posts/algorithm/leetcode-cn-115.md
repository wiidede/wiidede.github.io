---
title: leetcode-cn-115-不同的子序列
date: 2021-03-18 10:48:30
tags:
  - 动态规划
categories:
  - 算法
id: leetcode-cn-115
---

# [题目](https://leetcode-cn.com/problems/distinct-subsequences/)

给定一个字符串 `s` 和一个字符串 `t` ，计算在 `s` 的子序列中 `t` 出现的个数。

## 递归遍历（超时）

### 解题思路

遍历s，如果首字母相等，去掉s、t的首字母，继续求解

终止条件是t的首字母都被去掉了，也就是匹配成功，count++

应该可以加入记忆优化，但是我有点想不明白了

### 代码

```javascript
var numDistinct = function(s, t) {
    let cnt = 0
    let dfs = (s, t) => {
        if (t.length === 0) {
            cnt ++
            return
        }

        for(let i = 0; i < s.length; ++i) {
            if (s[i] === t[0]) {
                dfs(s.slice(i + 1), t.slice(1))
            }
        }
    }
    dfs(s,t)
    return cnt
};
```

## 动态规划

### 解题思路

首先初始化表格，每一个格子代表的意 `s[i]` 的子序列中 `t[j]` 出现的个数`dp[i][j]`。

（自己填一下就会有感觉了）

| t[j]\s[i] | ''   | b    | a    | b    | g    | b    | a    | g    |
| --------- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| ''        | 1    | 1    | 1    | 1    | 1    | 1    | 1    | 1    |
| b         | 0    |      |      |      |      |      |      |      |
| a         | 0    |      |      |      |      |      |      |      |
| g         | 0    |      |      |      |      |      |      |      |

我们从`i=1` `j=1`开始计算，发现

如果`t[j] == s[i]`则`dp[j][i] = dp[j][i - 1] + dp[j - 1][i - 1]`，也就是说，多出来的这个字母和子串的最后一个字母相同，那我们就用都去掉这个字母的结果加上只去掉这个字母能匹配的数量，就是总的数量了

如果`t[j] != s[i]`则 `dp[j][i] = dp[j][i - 1]`，也就是说s再多一个字符，也应该和没有这个字符所匹配的子串数目是相等的

### 代码

```javascript
var numDistinct = function(s, t) {
    let dp = new Array(t.length + 1).fill(0).map(() => new Array(s.length + 1).fill(0))
    dp[0] = new Array(s.length + 1).fill(1)
    for (let j = 1; j <= t.length; ++j) {
        for (let i = 1; i <= s.length; ++ i) {
            if (t[j - 1] === s[i - 1]) {
                dp[j][i] = dp[j][i - 1] + dp[j - 1][i - 1]
            } else {
                dp[j][i] = dp[j][i - 1]
            }
        }
    }
    return dp[t.length][s.length]
};
```
