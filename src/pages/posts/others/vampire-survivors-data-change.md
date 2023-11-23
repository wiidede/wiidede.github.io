---
title: vampire survivors 数据更改
date: 2023-11-23 21:05:02
tags:
  - 游戏
categories:
  - 其他
id: vampire-survivors-data-change
---

# vampire survivors 数据更改

## coins

查看localStorage，发现有`CapacitorStorage.Coins`字段，直接更改就行

## CapacitorStorage.UnlockedCharacters

查看localStorage，发现有`CapacitorStorage.UnlockedCharacters`字段，但是是一个数组，我们需要找到人物名都是什么，然后开始debug

主要游戏代码都是在`https://html-classic.itch.zone/html/5185382/main.364c22b224c8899d4d20.bundle.js`

可以看到167行（格式化后的）_0x4774f8这个对象应该存储了所有角色，我们使用Object.keys便利这个对象，得到`'ANTONIO', 'IMELDA', 'PASQUALINA', 'GENNARO',
'CIRO', 'PORTA', 'CAMILLO', 'DOMMARIO', 'GRAZIELLA', 'VERANDA', 'TATANKA', 'MORTACCIO', 'EXDASH', 'undefined', 'LATOEVEST', 'LATODILATO'`

所以最后的值就是

```txt
["CIRO","PORTA","CAMILLO","DOMMARIO","GRAZIELLA","VERANDA","TATANKA","MORTACCIO","EXDASH","undefined","LATOEVEST","LATODILATO"]
```

## 角色数值

既然都看到_0x4774f8这个对象了，那么里面的数值也就可以随意修改了（使用chrome devtools takeover 功能），无脑通关不是梦
