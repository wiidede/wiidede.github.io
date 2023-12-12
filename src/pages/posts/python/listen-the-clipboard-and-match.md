---
title: 监听剪贴板 在文字中匹配相应的内容 适用于题库
date: 2020-09-16 13:56:27
tags:
  - 正则表达式
  - Python
categories:
  - Python
id: listen-the-clipboard-and-match
---

[[toc]]

# 监听剪贴板 在文字中匹配相应的内容 适用于题库

最近有考试，还有题库，我就把之前写的监听剪贴板来搜索题库的程序拿了出来。虽然可能你更希望直接帮你答好，但有些网站只有一次考试机会，所以监听剪贴板反而更通用，虽然你 `ctrl + c` 可能会按的有点累，但总比一题一题搜（`ctrl + c` `切换到题库` `ctrl + f` `ctrl + v`）快一点

当然如果你有更好的方法也可以留言或者告诉我

注意，如果网页不让你复制，不让你选择文字，请先安装油猴插件，再安装[文字限制解除](https://greasyfork.org/zh-CN/scripts/28497-remove-web-limits-modified)

话不多说，很简单的代码直接上了

````python
import pyperclip
import time
import re

def main():
    lastClipContent = None
    txt = open("xxxxxxxxxxxxx题库.txt", 'r', encoding='UTF-8').read()

    while True:
        time.sleep(0.3)
        clipContent = pyperclip.paste()
        if clipContent != lastClipContent:
            lastClipContent = clipContent
            reg = r'```[^```]+' + clipContent + r'.*?```'
            regPattern = re.compile(reg, re.S | re.M)
            result = regPattern.findall(txt)
            if result:
                print('\n\n------------------------')
                for item in result:
                    print(item.replace('```', ''))
                print('------------------------')

if __name__ == '__main__':
    main()
````

其中关于正则表示的原理可以参考[这里](/reg-about-match-the-forward)
