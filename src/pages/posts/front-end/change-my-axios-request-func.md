---
title: 接口变化后，封装接口函数，改变返回内容
date: 2022-04-22 19:09:17
id: change-my-axios-request-func
categories:
  - 前端
tags:
  - axios
---

# 接口变化后，封装接口函数，改变返回内容

## 背景

我们的项目升级到了一个更高的版本，后端把一些模块废弃后，有些接口需要整体修改，我这次遇到的就是升级获取服务器时间接口

原本返回的数据格式是：

```json
{
  "data": {
    "serverTime": 1650626081000
  }
}
```

这次修改，接口变成这样了：

```js
res = {
  data: {
    isoTimestamp: '2022-04-22T11:17:02.638Z'
  }
}
```

接口的字段变了，而且我看这个接口，本项目的处理方式都是`moment.utc(res.data.isoTimestamp).valueOf();`咱也不知道为啥，就跟着做呗

但是如果要修改每个接口的返回处理函数、引入moment，那么工作量还是挺大的，毕竟这个接口好多地方都用到了，那么有没有什么方法可以直接修改一处就能达成目的呢？

观察原来的请求方法

```js
service.servertime = () => {
  return requestUtil.ajax(`${Global.getBaseUrl()}/project/servertime`, 'post')
}
```

也就是最后返回了一个promise，那么我们封装一下这个promise就可以了：

```js
import moment from 'moment'

service.servertime = () => {
  return new Promise((resolve, reject) => {
    requestUtil.ajax(`${Global.getBaseUrl()}/project/now`, 'get').then((res) => {
      if (res && res.data) {
        // 解析新接口的格式，按照旧接口的格式返回
        res.data.serverTime = moment.utc(res.data.isoTimestamp).valueOf()
      }
      resolve(res) // 返回结果
    }).catch((err) => {
      reject(err) // 有错返回错误
    })
  })
}
```
