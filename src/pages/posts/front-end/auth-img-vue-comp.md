---
title: 带有token的图片vue组件：authImg，使用axios下载图片
date: 2022-07-08 13:52:29
id: auth-img-vue-comp
categories:
  - 前端
tags:
  - Vue
  - Vue组件
  - axios
---

[[toc]]

# 带有token的图片vue组件：authImg，使用axios下载图片

使用axios下载图片

```vue
<script>
import axios from 'axios'
import Auth from 'utils/auth'

export default {
  name: 'AuthImg',
  props: {
    authSrc: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      src: '',
      loading: false,
      imageBlob: null
    }
  },
  watch: {
    authSrc: {
      handler(val) {
        this.revokeUrl()
        this.imageBlob = null
        this.getImg(val)
      },
      immediate: true
    }
  },
  beforeUnmount() {
    this.revokeUrl()
  },
  methods: {
    async getImg(url) {
      if (!url)
        return

      const instance = axios.create({
        headers: {
          'jwt-token': Auth.getJwtToken()
        },
        responseType: 'blob'
      })
      this.loading = true
      const res = await instance.request({
        url,
        method: 'get'
      }).catch((e) => {
        console.error(e)
        this.src = url
        this.imageBlob = null
      }).finally(() => {
        this.loading = false
      })
      const contentType = (res.headers['content-type'] && res.headers['content-type'].split(';')[0])
        || 'application/octet-stream'
      if (contentType.includes('image')) {
        this.imageBlob = res.data
        this.src = URL.createObjectURL(res.data)
      }
      else {
        this.imageBlob = null
        this.src = url
        // 错误处理
        if (contentType.startsWith('application/json')) {
          const rawText = await res.data.text()
          const raw = JSON.parse(rawText)
          if (raw.code && raw.code !== 0)
            this.$message.error(raw.message)
        }
      }
    },
    getImageBlob() {
      return this.imageBlob
    },
    revokeUrl() {
      if (this.src.startsWith('blob')) {
        URL.revokeObjectURL(this.src)
        this.src = ''
      }
    }
  }
}
</script>

<template>
  <div
    v-loading="loading"
    class="img-container"
  >
    <img
      v-if="src"
      :src="src"
      v-bind="$props"
      v-on="$listeners"
    >
  </div>
</template>

<style scoped>
.img-container {
  height: 100%;
}
</style>
```
