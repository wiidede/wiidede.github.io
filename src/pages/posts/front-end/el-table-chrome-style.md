---
title: el-tab做成chrome类似的tab样式
date: 2022-09-06T10:57:17+08:00
id: el-table-chrome-style
categories:
  - 前端
tags:
  - CSS
  - ElementPlus
---

[[toc]]

# el-tab做成chrome类似的tab样式

```scss
.el-tabs__item {
  &.is-active {
    color: #18254e;
    background: #daebfd;
    border-radius: 6px 6px 0px 0px;
    margin: 6px 6px 0 6px;

    &::before,
    &::after {
      position: absolute;
      bottom: 0;
      content: '';
      width: 12px;
      height: 12px;
      border-radius: 100%;
      box-shadow: 0 0 0 24px #daebfd;
      transition: 0.2s;
    }

    &::before {
      left: -12px;
      clip-path: inset(50% -6px 0 50%);
    }

    &::after {
      right: -12px;
      clip-path: inset(50% 50% 0 -6px);
    }
  }

  &:not(.is-active) + .el-tabs__item:not(.is-active) {
    box-shadow:
      #5b73e6 -6px 0px 0px -5px,
      #2f4894 -7px 0px 0px -5px;
  }
}
```
