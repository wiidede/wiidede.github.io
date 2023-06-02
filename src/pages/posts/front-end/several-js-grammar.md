---
title: 整理一些js写法
date: 2020-10-22 09:57:27
tags:
  - JavaScript
categories:
  - 前端
id: several-js-grammar
sticky: 1
---

# 整理一些js写法

在工作中遇到了许多重复需要的js方法，每次都要查阅之前写的。
为了方便特意写一篇记录这些方法。
并且这也是自己学习js一点点进步的方法。

## 从元素为对象的数组中提取出对象的某属性为x的快速写法，摘自vuex教程

说到底是Array的find()、filter()方法

find返回的是数组里第一个符合条件的选项，

filter返回的是数组里符合条件的选项集合，是一个数组

```javascript
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})

getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}
```

## filter 其他用法

### 去掉数组中值为index的项目

```javascript
this.arr = this.arr.filter((item) => item !== index);
```

### 判断数组中有没有值为index的项目

```javascript
this.arr.filter((item) => item === index).length !== 0
```

## 获取数组中某一属性的值组成数组

```js
const res = this.list.map(item => item.id)
```

## 数组中是否包含某一值

Array.prototype.includes()方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。

```js
const array = [1, 2, 3]
const isinclude = array1.includes(2)
```

## 反转对象的key和value的值

如果直接将对象传进去，将会改变原有对象，建议传{...obj}进去

```javascript
const reverseKV = (obj) => {
 Object.keys(obj).forEach(k => {
  let value = obj[k];
  obj[value] = k;
  delete obj[k];
 });
 return obj;
}
```

## 查找数组中，对象某个属性值为val的索引(index)

优雅一点，可以用lodash的findIndex()

```javascript
const findElem = (arrayToSearch, attr, val) => {
 for (let i = 0; i < arrayToSearch.length; i++) {
  if (arrayToSearch[i][attr] === val) {
   return i;
  }
 }
 return -1;
}
```

## 判断页面上的字符是否溢出

```javascript
const isOverflow = (element) => {
 return element ? element[0].offsetWidth >= element[0].scrollWidth : false;
}
```

集成为一个[vue组件](/vue-auto-show-tooltip/#整理成组件)

## 时间格式化

```javascript
const timeFormat = (value) => {
 return value === 0 ? '-' : moment(value).format('YYYY-MM-DD HH:mm:ss');
}
```

## 复制到剪贴板

```javascript
const copyToClipboard = (content) => {
 let tempEl = document.createElement('input');
 tempEl.setAttribute('value', content);
 document.body.appendChild(tempEl);
 tempEl.select();
 if (document.execCommand('copy')) {
  this.$message.success('复制成功');
 } else {
  this.$message.error('复制失败');
 }
 document.body.removeChild(tempEl);
}
```

[30 seconds of code](https://www.30secondsofcode.org/js/s/copy-to-clipboard)

```js
function copyToClipboard(str) {
  const el = document.createElement('textarea')
  el.value = str
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)
  const selected
    = document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  if (selected) {
    document.getSelection().removeAllRanges()
    document.getSelection().addRange(selected)
  }
}
// 例子
copyToClipboard('Lorem ipsum') // 'Lorem ipsum' copied to clipboard.
```

## 事件中的offsetX，offsetY，只有chrome能算准，火狐firefox会时常为0，这时候就需要换一种算法

```javascript
//firefox event.offsetX 时常为0
// let ox = event.offsetX; //
// let oy = event.offsetY;
let srcObj = event.target || event.srcElement;
let ox = event.offsetX || (event.clientX - srcObj.getBoundingClientRect().left);
let oy = event.offsetY || (event.clientY - srcObj.getBoundingClientRect().top);
```

## div支持拖动并限制四周不超过浏览器页面

需要拖动的元素：`@mousedown.prevent="move"`

元素中拖动无法点击的元素：`@mousedown.stop`

```javascript
const move = (e) => {
    let draggableElement = this.$refs['popper'] || e.target;        //获取目标元素
    // 算出鼠标相对元素的位置
    let disX = e.clientX - draggableElement.offsetLeft;
    let disY = e.clientY - draggableElement.offsetTop;
    document.onmousemove = (e) => {       //鼠标按下并移动的事件
        // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = e.clientX - disX;
        let top = e.clientY - disY;
        let bottom = window.innerHeight - draggableElement.offsetHeight;
        let right = window.innerWidth - draggableElement.offsetWidth;
        // 限制拖出页面
        top <= 0 && (top = 0);
        left <= 0 && (left = 0);
        left >= right && (left = right);
        top >= bottom && (top = bottom);
        // 移动当前元素
        draggableElement.style.left = left + 'px';
        draggableElement.style.top = top + 'px';
        // 这两句如果拖动元素没有设置bottom和right可以去掉
        draggableElement.style.bottom = 'unset';
        draggableElement.style.right = 'unset';
    };
    document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
    };
}
```

## 手动排队等待请求，一次仅允许发送n个请求

如果真的请求特别多，建议去使用更好的（官方一些的）方法

```javascript
const handleRequestQueue = (paramsArr, maxLength, callback, failCallback) => {
    const paramsLength = paramsArr.length;
    const requestsQueue = [];
    const results = [];
    let i = 0;
    const handleRequest = (param) => {
        const req = api.getSomething(param).then(res => {
            const len = results.push(res);
            typeof callback === 'function' && callback(res);
            if (len < paramsLength && i + 1 < paramsLength) {
                requestsQueue.shift();
                handleRequest(paramsArr[++i]);
            }
            // 所有请求发送完毕
        }).catch(e => {
            results.push(e);
            typeof failCallback === 'function' && failCallback(e, data);
        });
        if (requestsQueue.push(req) < maxLength) {
            handleRequest(paramsArr[++i]);
        }
    };
    handleRequest(paramsArr[i]);
}
```

## [30 seconds of code](https://www.30secondsofcode.org/)

### [javascript-switch-object](https://www.30secondsofcode.org/blog/s/javascript-switch-object) 代替switch语法、switch的优雅写法

```javascript
const switchFn = (lookupObject, defaultCase = '_default') =>
  expression => (lookupObject[expression] || lookupObject[defaultCase])();

const knownFruit = () => console.log('Known fruit');
const unknownFruit = () => console.log('Unknown fruit');

const logFruit = {
  'apples': knownFruit,
  'oranges': knownFruit,
  'default': unknownFruit
};

const fruitSwitch = switchFn(logFruit, 'default');

fruitSwitch('apples'); // Logs: 'Known fruit'
fruitSwitch('pineapples'); // Logs: 'Unknown fruit'
```

### [getURLParameters](https://www.30secondsofcode.org/js/s/get-url-parameters) 在Vue中你可以使用 route 来获取参数

#### JavaScript

```js
function getURLParameters(url) {
  return (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => {
      (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1))
      return a
    },
    {}
  )
}
```

#### Examples

```js
getURLParameters('google.com') // {}
getURLParameters('http://url.com/page?name=Adam&surname=Smith')
// {name: 'Adam', surname: 'Smith'}
```

### [createElement](https://www.30secondsofcode.org/js/s/create-element)

#### JavaScript

```js
function createElement(str) {
  const el = document.createElement('div')
  el.innerHTML = str
  return el.firstElementChild
}
```

#### Examples

```js
const el = createElement(
  `<div class="container">
    <p>Hello!</p>
  </div>`
)
console.log(el.className) // 'container'
```

### [deep clone](https://www.30secondsofcode.org/js/s/deep-clone)

```js
function deepClone(obj) {
  if (obj === null)
    return null
  const clone = Object.assign({}, obj)
  Object.keys(clone).forEach(
    key =>
      (clone[key]
        = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
  )
  if (Array.isArray(obj)) {
    clone.length = obj.length
    return Array.from(clone)
  }
  return clone
}
```

## async 中异步调用函数

使用`Promise.all()`

```js
async function f() {
  const f1 = func1('prama')
  const f2 = func2()

  const values = await Promise.all([f1, f2])
}
```

## el-upload 自定义上传文件

之前没有对接过上传接口，这次对接后发现上传接口的数据格式一般来说不是普通的Json，而是FormData，所以我们需要这样上传：

```js
const formData = new FormData()
formData.append('file', file)
formData.append('name', file.name)
formData.append('type', file.type)
const ret = await api.upload(this.action.id, formData)
```

这里也可以参考postman，Post的body不再是上传Raw，而是formData

## 下载文件

```js
// 传入下载的参数
async function getFile(url, method = 'get', params = {}, data = {}, errorFunc) {
  const instance = axios.create({
    headers: {
      'jwt-token': Auth.getJwtToken()
    },
    responseType: 'blob'
  })
  startLoading() // 页面开始加载
  const res = await instance.request({ url, method, params, data }).finally(endLoading) // 不管怎么样结束加载
  const filename = decodeURIComponent(
    res.headers['content-disposition'] && res.headers['content-disposition'].split('filename=')[1]
  ) || '文件'
  const contentType = (res.headers['content-type'] && res.headers['content-type'].split(';')[0]) || ''
  if (res.data instanceof Blob) {
    if (res.data.type === 'application/json') { // 处理后端报错的情况
      const rawText = await res.data.text()
      const raw = JSON.parse(rawText)
      if (raw.code && raw.code !== 0) {
        console.log(raw.message)
        errorFunc && typeof errorFunc === 'function' && errorFunc(raw.message)
      }
    }
    else {
      downloadFile(res.data, filename)
    }
  }
  else {
    const blob = new Blob([res.data], {
      type: contentType
    })
    downloadFile(blob, filename)
  }
}

// 下载blob
function downloadFile(blob, filename) {
  if (window.navigator && window.navigator.msSaveOrOpenBlob) { // for IE
    window.navigator.msSaveOrOpenBlob(blob, filename)
  }
  else {
    const downloadElement = document.createElement('a')
    const href = window.URL.createObjectURL(blob) // 创建下载的链接
    downloadElement.href = href
    downloadElement.download = filename // 下载后文件名
    document.body.appendChild(downloadElement)
    // downloadElement.click(); //点击下载
    // 兼容火狐
    if (document.all) {
      downloadElement.click()
    }
    else {
      const evt = document.createEvent('MouseEvents')
      evt.initEvent('click', true, true)
      downloadElement.dispatchEvent(evt)
    }
    document.body.removeChild(downloadElement) // 下载完成移除元素
    window.URL.revokeObjectURL(href) // 释放掉blob对象
  }
}
```

## 扁平化树状结构数据

```js
const treeList = [{ children: [] }]
function flatChildren(rawList, resList) {
  rawList.forEach((item) => {
    Object.prototype.hasOwnProperty.call(item, 'children') && Array.isArray(item.children) && flatChildren(item.children)
    delete item.children
    resList.push(item)
  })
}
const resList = []
flatChildren(treeList, resList)
```

## iframe通信

```js
// iframe
window.parent.postMessage({ action: 'xxx', message: 'this is a msg' }, '*')

// 外部
window.addEventListener('message', (evt) => {
  if (evt.data && evt.data.action === 'xxx')
    console.log(evt.data.message)

})
```

## 根据时间排序

```js
arr.sort((a, b) => moment(a.time).diff(moment(b.time)))
```

## 生成UUID（lodash）

```js
const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('')
const uuid = _.times(4, () => _.sample(chars)).join('')
```

发现一个不错的方法：

```js
function uuid() {
  const temp_url = URL.createObjectURL(new Blob())
  const uuid = temp_url.toString()
  URL.revokeObjectURL(temp_url)
  return uuid.substring(uuid.lastIndexOf('/') + 1)
}
```

## 字节转为单位

```js
function bytesToSize(bytes) {
  if (bytes === 0)
    return { num: 0, unit: 'B' }

  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return {
    num: (bytes / k ** i).toFixed(2),
    unit: sizes[i]
  }
}
```

## 前端分页(lodash)

```js
_.chunk(arr, size)
```

## 数组转为树

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

## 给树的每个节点添加rootId

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

## 给树的每个节点添加层级

```js
function setLevel(val, level = 1) {
  val.forEach((item) => {
    item.kcTableLevel = level
    if (item.children)
      setLevel(item.children, level + 1)

  })
}
```

## 首字母大写

```js
const firstUpperCase = str => str.replace(/^\S/, l => l.toUpperCase())
```

## 转换对象key/value

```ts
const reverseKeyValue = (obj: Record<string, string>) => Object.fromEntries(Object.entries(obj).map(([key, value]) => [value, key]))
```

## ElementPlus 表格常用格式化

```ts
import dayjs from 'dayjs'
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'

export function tableDecimalFormatter<T>(row: T, column: TableColumnCtx<T>, cellValue: unknown, index: number) {
  const number = Number(cellValue)
  return (Number.isFinite(number) ? Math.round(number * 100) / 100 : cellValue) // Number(number.toFixed(2))
}

export function tableDateFormatter<T>(row: T, column: TableColumnCtx<T>, cellValue: unknown, index: number) {
  const day = dayjs(cellValue as string | number | Date)
  return day.isValid() ? day.format('YYYY-MM-DD HH:mm:ss') : cellValue
}
```

## ElementPlus 常用校验

```ts
export function validateAccount(rule: any, value: string, callback: any) {
  if (!value)
    return callback(new Error('请输入账户名'))
  if (!/^[a-zA-Z0-9_]{1,32}$/.test(value))
    return callback(new Error('账户名只能包含字母、数字、下划线，最长32位'))

  return callback()
}

export function validatePhoneNumber(rule: any, value: string, callback: any) {
  if (value && !/^(?:(?:\+|00)86)?1\d{10}$/.test(value))
    return callback(new Error('手机号格式不正确'))

  return callback()
}

export function validateEmail(rule: any, value: string, callback: any) {
  if (value && !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value))
    return callback(new Error('邮箱格式不正确'))

  return callback()
}

export function useValidateFile(fileList: Ref<UploadUserFile[]>, message = '请上传文件') {
  return (rule: any, value: string, callback: any) => {
    if (!fileList.value.length)
      return callback(new Error(message))

    return callback()
  }
}

// onChange时使用
export function checkFile(uploadFile: UploadFile, uploadFiles: UploadFiles) {
  if (!['jpg', 'mp4', 'png', 'jpeg', 'doc', 'docx', 'xls', 'xlsx', 'pdf', 'txt'].includes(uploadFile.name.split('.').pop()!)) {
    uploadFiles.splice(uploadFiles.indexOf(uploadFile), 1)
    ElMessage.error(`文件格式不正确: ${uploadFile.name}`)
  }
}
```

## timeoutPromise

```ts
const usePromiseTimeout = (ms?: number) => new Promise(resolve => setTimeout(resolve, ms))
```

或者

```ts
import { promiseTimeout } from '@vueuse/core'
```

## 给Promise加上全局loading

```ts
async function withElLoading<T>(fn: Promise<T>,
  options?: Parameters<typeof ElLoading.service>[0]) {
  const loadingInstance = ElLoading.service({
    lock: true,
    fullscreen: true,
    ...options,
  })
  return fn.finally(loadingInstance.close)
}
```

## object to URLSearchParams

```ts
function obj2params(obj: {}) {
  const params = new URLSearchParams()
  Object.entries(obj).forEach(([key, value]) => {
    params.append(key, value as string)
  })
  return params
}
```

## 展示n位小数

```ts
export function displayNumber(number: number, fixed = 1) {
  if (typeof number !== 'number')
    return ''
  const n = 10 ** fixed
  return String(Math.round(number * n) / n)
}
```

## 获取数组重复项

```ts
export function getDuplicates(arr: any[]) {
  const duplicates = arr.filter((item, index) => arr.indexOf(item) !== index)
  return [...new Set(duplicates)]
}
```
