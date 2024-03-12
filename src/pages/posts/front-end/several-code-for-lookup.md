---
title: 我写的一些可以日后参考的代码
date: 2022-04-15T15:18:37+08:00
id: several-code-for-lookup
categories:
  - 前端
tags:
  - JavaScript
---

[[toc]]

# 我写的一些可以日后参考的代码

## 保存页面变动，批量接口请求

```js
// 这里有两层 key
// 子组件传来的 key、value
// 更新 updateConfigs 来保存所有的变动信息
function handleUpdateConf({ catalogKey, bizId, section, keyName, strValue, oldStrValue, form }) {
  const updated = strValue !== oldStrValue
  if (!this.updateConfigs[bizId]) {
    this.$set(this.updateConfigs, bizId, {
      catalogKey,
      form,
      updateCount: 0,
      sections: {}
    })
  }
  const bizConf = this.updateConfigs[bizId]
  if (!bizConf.sections[section]) {
    this.$set(bizConf.sections, section, {
      configs: {}
    })
  }
  const sectionConf = bizConf.sections[section]
  const noUpdateCount = sectionConf.configs[keyName] && sectionConf.configs[keyName].updated === updated
  if (!noUpdateCount) {
    if (updated) {
      this.updateCount++
      this.catalogUpdateCount[this.catalogKey]++
      bizConf.updateCount++
    }
    else {
      this.updateCount--
      this.catalogUpdateCount[this.catalogKey]--
      bizConf.updateCount--
    }
  }
  this.$set(sectionConf.configs, keyName, {
    updated,
    strValue,
    oldStrValue
  })
}

// 保存接口，便利所有的 key
async function saveAllConfigs() {
  if (this.updateCount === 0) {
    this.$message.warning('未修改任何数据！')
    return
  }
  this.saveLoading = true
  const validations = []
  // 第一层 key 下面有 el-form 遍历所有表单进行验证
  Object.entries(this.updateConfigs).forEach((bizEntry) => {
    const [bizKey, bizValue] = bizEntry
    if (!bizValue.updateCount)
      return
    validations.push({
      bizKey,
      catalogKey: bizValue.catalogKey,
      validatePromise: bizValue.form.validate()
    })
  })
  let errorForm
  // 为每个 validate promise 添加 catch 方法
  const validationPromises = validations.map((validation) => {
    return validation.validatePromise.catch(() => {
      !errorForm && (errorForm = validation)
    })
  })
  await Promise.all(validationPromises).catch(() => {
    console.error('表单验证错误!')
  }).finally(() => {
    this.saveLoading = false
  })
  if (errorForm) {
    this.catalogKey = errorForm.catalogKey
    const first = this.$refs[errorForm.catalogKey] && this.$refs[errorForm.catalogKey][0]
    first && first.toBiz(errorForm.bizKey)
    this.$message.warning('请根据表单提示填写信息！')
    return
  }

  this.$confirm('修改配置可能导致系统重启，请确认是否修改！', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    this.saveLoading = true
    const paramsList = []
    // 便利两层 key 生成最后的参数列表
    Object.entries(this.updateConfigs).forEach((bizEntry) => {
      const [bizId, bizValue] = bizEntry
      if (!bizValue.updateCount)
        return
      Object.entries(bizValue.sections).forEach((sectionEntry) => {
        const [section, sectionValue] = sectionEntry
        Object.entries(sectionValue.configs).forEach((confEntry) => {
          const [keyName, conf] = confEntry
          const { updated, strValue } = conf
          if (!updated)
            return
          paramsList.push({ bizId, section, keyName, strValue })
        })
      })
    })
    let length = paramsList.length
    let success = true
    // 这里接口只能保存一个 key value 所以批量调用
    paramsList.forEach(async (params) => {
      const res = await api.rewriteValue(params).finally(() => {
        // 最后结束的时候，看，是不是所有的接口都返回正确了，如果是则成功，不然的话就是失败
        if (--length === 0) {
          this.saveLoading = false
          if (success) {
            const first = this.$refs[this.catalogKey] && this.$refs[this.catalogKey][0]
            const lastBizKey = first && first.getBizKey()
            lastBizKey && (this.lastSelectPane = [this.catalogKey, lastBizKey])
            this.tabList = []
            this.updateConfigs = {}
            this.catalogUpdateCount = {}
            this.updateCount = 0
            this.getTable()
            this.$message.success('保存配置成功！')
          }
          else {
            this.$message.error('保存配置失败！')
          }
        }
      }).catch((e) => {
        console.error(e)
        success = false
      })
      if (res.code !== 0) {
        success = false
        res.message && this.$message.error(res.message)
      }
    })
  })
}
```

el-from 使用后端接口校验

```js
function validateByApi(url, tip) {
  return (_, value, callback) => {
    if (value !== '') {
      api.validateCron(url, value).then((res) => {
        res.code === 0 ? callback() : callback(new Error(tip))
      }).catch((_) => {
        callback(new Error('校验接口请求失败'))
      })
    }
    else {
      callback()
    }
  }
}
```

## 带有列表的表单的校验

比如有一个表单，是船舶合集，数据结构就像

```ts
const form = {
  collectionName: '',
  shipList: [
    { shipId: '', shipName: '' },
    { shipId: '', shipName: '' },
  ]
}
```

```vue
<script>
const shipFormItems: CurdFormItems = [
  { label: '船舶名称', prop: 'shipId', map: enteredShipMap },
  { label: '船舶名称', prop: 'shipName', slot: 'shipName' },
]
function getFormItemsShip(index: number): CurdFormItems[] {
  const prefix = `shipList.${index}.`
  return shipFormItems.map(item => ({ ...item, itemProp: prefix + item.prop }))
}

const shipRules: FormRules = {
  shipId: [{ required: true, message: '请选择船舶名称' }],
  shipName: [{ required: true, message: '请选择船舶名称' }],
}

const rules = computed<FormRules>(() => ({
  collectionName: [{ required: true, message: '请输入船舶合集名称' }],
  ...form.value?.shipList?.reduce((acc: FormRules, cur, index) => {
    const prefix = `shipList.${index}.`
    return {
      ...acc,
      [`${prefix}shipId`]: shipRules.shipId,
      [`${prefix}shipName`]: shipRules.shipName,
    }
  }, {}),
}))
</script>
```

## 缓存promise结果，并且配置在3小时内有效

```ts
export function useAsyncMemoizeStorage<Result extends Promise<unknown>, Args extends unknown[]>(resolver: (...args: Args) => Result, key: string, storage: Storage = localStorage) {
  const cache = ref(new Map<string, any>())
  const cacheStorage = useStorage(key, cache, storage)

  return async (...args: Args) => {
    const argKey = JSON.stringify(args)
    const lastModified = cacheStorage.value.get('last-modified') as number || 0
    if (cacheStorage.value.has(argKey) && Date.now() - lastModified < 3 * 60 * 60 * 1000)
      return cacheStorage.value.get(argKey) as Awaited<Result>
    const result = await resolver(...args)
    cacheStorage.value.set(argKey, result)
    cacheStorage.value.set('last-modified', Date.now())
    return result
  }
}
```

test

```ts
function getDataAsync<T>(data: T, timeout: number): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, timeout)
  })
}

describe('useAsyncMemoizeStorage', () => {
  const getData = async <T>(data: T) => await getDataAsync(data, 100)
  const get = useAsyncMemoizeStorage(getData, 'test_useAsyncMemoizeStorage')
  it('should works', async () => {
    const time1 = Date.now()
    expect(await get(123)).toEqual(123)
    const time2 = Date.now()
    expect(time2 - time1 > 100).toBe(true)
    expect(await get(123)).toEqual(123)
    const time3 = Date.now()
    expect(time3 - time2 < 100).toBe(true)
  })
})
```
