<script setup lang="ts">
import CWDComments from 'cwd-widget'

// 放在 mounted 钩子中初始化评论组件
const comments = ref(null)
let instance: CWDComments
const route = useRoute()

onMounted(async () => {
  if (!comments.value)
    return
  instance = new CWDComments({
    el: comments.value,
    apiBaseUrl: 'https://cwd.wiidede.space',
    postSlug: route.path,
    siteId: 'wiidede.space',
    theme: isDark.value ? 'dark' : 'light',
  })
  instance.mount()
})

watch(isDark, (val) => {
  if (instance)
    instance.updateConfig({ theme: val ? 'dark' : 'light' })
})

onBeforeUnmount(() => {
  instance.unmount()
})
</script>

<template>
  <div ref="comments" class="text-align-left" />
</template>
