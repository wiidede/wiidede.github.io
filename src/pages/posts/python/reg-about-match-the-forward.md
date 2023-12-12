---
title: 正则表达式 向前最短匹配
date: 2020-09-16 13:44:16
tags:
  - 正则表达式
  - Python
categories:
  - Python
id: reg-about-match-the-forward
---

[[toc]]

# 正则表达式 向前最短匹配

使用正则表达式  `.*?`  可以向后匹配最短的，那么如何向前匹配最短的呢

向前的不再能使用 `.*?` ，因为它会从第一个字母向后找，直到有匹配的，也就相当于找了一个最长的匹配

所以这时候应该换一种思路

使用 `a[^a]+` 来匹配，也就是说要匹配的字符串前面不能有a，那就是最短的匹配

我们来看一个 Python 写的例子：

```python
reg = r'```[^```]+' + clipContent + r'.*?```'
```

我们要从 `clipContent` 向前找到第一次出现 ```` ` ，所以思路应该是向前找到第一个你所想要的内容

[这里](/listen-the-clipboard-and-match)有一个实际案例
