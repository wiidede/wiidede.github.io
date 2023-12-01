---
title: ElementPlus Form一些简单的组件整合
date: 2023-01-16 15:24:40
id: some_simple_component_integration_of_element_plus_form
categories:
  - 前端
tags:
  - Vue组件
  - Vue
  - ElementPlus
---

[[toc]]

# ElementPlus Form一些简单的组件整合

## 将datePicker，一个时间点，在年/月/日的开始时间、结束时间，分别绑定在两个属性上

用法：

```vue
<WddDatePickerRange
  v-model:start="searchModel.startTime"
  v-model:end="searchModel.endTime"
  clearable
  value-format="YYYY-MM-DD HH:mm:ss"
/>
```

组件代码：

```vue
<script lang="ts" setup>
import dayjs from 'dayjs'

type DateValue = string | Date | number

const props = defineProps<{
  start?: DateValue
  end?: DateValue
  valueFormat?: string
  type?: 'year' | 'month' | 'date' | 'week'
}>()

const emit = defineEmits<IEmit>()
interface IEmit {
  (event: 'update:start', value: typeof props.start): void
  (event: 'update:end', value: typeof props.end): void
}
const DateModel = computed({
  get: () => props.start,
  set: (value) => {
    if (value ?? dayjs(value).isValid()) {
      const time = dayjs(value)
      const start = time.startOf(props.type || 'date')
      const end = time.endOf(props.type || 'date')
      emit('update:start', props.valueFormat === undefined ? start.toDate() : start.format(props.valueFormat))
      emit('update:end', props.valueFormat === undefined ? end.toDate() : end.format(props.valueFormat))
    }
    else {
      emit('update:start', value)
      emit('update:end', value)
    }
  },
})
</script>

<template>
  <el-date-picker
    v-model="DateModel"
    :value-format="valueFormat"
    :type="type"
  />
</template>

<style lang="scss" scoped>

</style>
```

## 将datePicker（range类型）分别绑定在两个属性上，而不是绑定在一个值（数组）上

用法：

```vue
<WddDateRangePicker
  v-model:start="form.beginDate"
  v-model:end="form.endDate"
  type="daterange"
  size="large"
  value-format="YYYY-MM-DD HH:mm:ss"
  range-separator="~"
  start-placeholder="开始日期"
  end-placeholder="结束日期"
  clearable
/>
```

组件代码：

```vue
<script lang="ts" setup>
type DateValue = string | Date | number

const props = defineProps<{
  start?: DateValue
  end?: DateValue
}>()

const emit = defineEmits<IEmit>()
interface IEmit {
  (event: 'update:start', value: typeof props.start): void
  (event: 'update:end', value: typeof props.end): void
}
const DateModel = computed({
  get: () => [props.start, props.end],
  set: (value) => {
    emit('update:start', value?.[0])
    emit('update:end', value?.[1])
  },
})
</script>

<template>
  <el-date-picker
    v-model="DateModel"
  />
</template>

<style lang="scss" scoped>

</style>
```

## 把 'a,b,c' 这种形式的，绑定到多选组件上

用法：

```vue
<WddSelectMultiString v-if="![null, undefined].includes(row?.zone)" v-model="row.zone" placeholder="请选择" clearable collapse-tags>
  <el-option
    v-for="(value, key) in zoneMap"
    :key="key"
    :label="value"
    :value="value"
  />
</WddSelectMultiString>
```

组件代码：

```vue
<script lang="ts" setup>
const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<IEmit>()
interface IEmit {
  (event: 'update:modelValue', value: typeof props.modelValue): void
}
const model = computed({
  get: () => (props.modelValue === '' ? [] : props.modelValue.split(',')),
  set: (value) => {
    if (Array.isArray(value))
      emit('update:modelValue', value.join(','))
  },
})
</script>

<template>
  <el-select v-model="model" multiple>
    <slot />
  </el-select>
</template>

<style lang="scss" scoped>

</style>
```

## 在view模式下使用el-image来展示图片的上传

用法：

```vue
``

组件代码：

```vue
<script lang="ts" setup>
import type { UploadProps } from 'element-plus/es'

const props = defineProps<{
  fileList?: any
}>()

const emit = defineEmits<IEmit>()
interface IEmit {
  (event: 'update:fileList', value: typeof props.fileList): void
}
const fileListModel = computed({
  get: () => props.fileList,
  set: value => emit('update:fileList', value),
})

const onPreview: UploadProps['onPreview'] = (uploadFile) => {
  if (uploadFile.url)
    download('channeldredging', uploadFile.url, uploadFile.name)
}

const pictureUrls = ref<Record<string, string>>({})

watch(() => props.fileList, (val) => {
  if (!val) {
    fileListModel.value = []
    return
  }

  val.forEach(async (file: any) => {
    pictureUrls.value = {}
    if (!file.url)
      return
    const suffix = file.url?.split('.').pop()
    const isPicture = ['jpg', 'png'].includes(suffix as string)
    if (isPicture)
      pictureUrls.value[file.url] = file.url // 这里本意是想对图片url进行处理的
  })
}, {
  immediate: true,
})
</script>

<template>
  <el-upload
    v-model:file-list="fileListModel" class="dr-upload" multiple drag action="#"
    :auto-upload="false" :limit="10"
    v-bind="$attrs"
  >
    <i class="upload-icon">
      <div class="i-t-file-upload" />
    </i>
    <div class="el-upload__text">
      <span>点击或将文件拖拽到这里上传</span>
      <div class="tip">
        支持扩展名：.jpg, .png
      </div>
    </div>
    <template #tip>
      <div class="dr-upload-file-list">
        <div v-for="(file, index) in fileListModel" :key="index">
          <el-image
            v-if="pictureUrls[file.url]"
            style="height: 100px"
            :src="pictureUrls[file.url]"
            hide-on-click-modal
            :preview-src-list="fileListModel.map((item: any) => pictureUrls[item.url])"
            :initial-index="index"
            fit="cover"
          />
          <el-link v-else w-fit :underline="false" @click="onPreview(file)">
            <el-icon mr1>
              <Link />
            </el-icon>{{ file.name }}
          </el-link>
        </div>
      </div>
    </template>
  </el-upload>
</template>

<style lang="scss" scoped>
.dr-upload-file-list {
  display: none;
}
</style>
```
