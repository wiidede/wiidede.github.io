---
title: axios请求api然后下载文件
date: 2021-08-12T16:24:34+08:00
id: axios-api-download
categories:
  - 前端
tags:
  - axios
---

[[toc]]

# axios请求api然后下载文件

首先我们需要把axios实例建立好，在这一步，你可以把接口需要的token等内容加入进去

```js
const instance = axios.create({
  headers: {
    'jwt-token': Auth.getJwtToken()
  },
  responseType: 'blob'
})
```

然后我们发起请求，这时候我们可以让页面进入加载状态，然后不管怎么样，我们需要结束加载

```js
startLoading()
const res = await instance.request({ url, method, params, data }).finally(endLoading)
```

然后开始处理接口返回的内容

如果后端报错，这里会返回JSON格式的文件，需要我们自己取处理

这里的errorFunc是调用者传进来的，这样方便调用者更好的显示错误

最后我们只需要把取到的Blob下载下来，我们可以随便搜到一个downloadBlob函数

```js
if (!filename) {
  const contentDisposition = res.headers['content-disposition']
  filename = contentDisposition ? decodeURIComponent(contentDisposition.split('filename=')[1]) : '文件'
}
const contentType = (res.headers['content-type'] && res.headers['content-type'].split(';')[0])
  || 'application/octet-stream'
if (res.data instanceof Blob) {
  if (res.data.type === 'application/json') { // 处理后端报错的情况
    const rawText = await res.data.text()
    const raw = JSON.parse(rawText)
    if (raw.code && raw.code !== 0) {
      console.warn(raw.message)
      errorFunc && typeof errorFunc === 'function' && errorFunc(raw.message)
    }
  }
  else {
    downloadBlob(res.data, filename)
  }
}
else {
  const blob = new Blob([res.data], {
    type: contentType
  })
  downloadBlob(blob, filename)
}
```

接下来是完整的代码

```js
async function getFile({ url, method = 'get', params = {}, data = {}, errorFunc, filename }) {
  const instance = axios.create({
    headers: {
      'jwt-token': Auth.getJwtToken()
    },
    responseType: 'blob'
  })
  startLoading()
  const res = await instance.request({ url, method, params, data }).finally(endLoading)
  if (!filename) {
    const contentDisposition = res.headers['content-disposition']
    filename = contentDisposition ? decodeURIComponent(contentDisposition.split('filename=')[1]) : '文件'
  }
  const contentType = (res.headers['content-type'] && res.headers['content-type'].split(';')[0])
    || 'application/octet-stream'
  if (res.data instanceof Blob) {
    if (res.data.type === 'application/json') { // 处理后端报错的情况
      const rawText = await res.data.text()
      const raw = JSON.parse(rawText)
      if (raw.code && raw.code !== 0) {
        console.warn(raw.message)
        errorFunc && typeof errorFunc === 'function' && errorFunc(raw.message)
      }
    }
    else {
      downloadBlob(res.data, filename)
    }
  }
  else {
    const blob = new Blob([res.data], {
      type: contentType
    })
    downloadBlob(blob, filename)
  }
}

function downloadBlob(blob, filename) {
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
  // IE doesn't allow using a blob object directly as link href.
  // Workaround for "HTML7007: One or more blob URLs were
  // revoked by closing the blob for which they were created.
  // These URLs will no longer resolve as the data backing
  // the URL has been freed."
    window.navigator.msSaveBlob(blob, filename)
    return
  }
  // Other browsers
  // Create a link pointing to the ObjectURL containing the blob
  const blobURL = window.URL.createObjectURL(blob)
  const tempLink = document.createElement('a')
  tempLink.style.display = 'none'
  tempLink.href = blobURL
  tempLink.setAttribute('download', filename)
  // Safari thinks _blank anchor are pop ups. We only want to set _blank
  // target if the browser does not support the HTML5 download attribute.
  // This allows you to download files in desktop safari if pop up blocking
  // is enabled.
  if (typeof tempLink.download === 'undefined')
    tempLink.setAttribute('target', '_blank')

  document.body.appendChild(tempLink)
  tempLink.click()
  document.body.removeChild(tempLink)
  setTimeout(() => {
  // For Firefox it is necessary to delay revoking the ObjectURL
    window.URL.revokeObjectURL(blobURL)
  }, 100)
}
```
