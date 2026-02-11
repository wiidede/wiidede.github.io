<script setup>
const comments = ref(null)
let instance = null
const route = useRoute()

onMounted(async () => {
  // FIXME await esm support & remember to update version
  if (!window.CWDComments) {
    await loadScript('https://unpkg.com/cwd-widget@0.1.3/dist/cwd.js')
  }
  instance = new window.CWDComments({
    el: comments.value,
    apiBaseUrl: 'https://cwd.wiidede.space', // 换成你的 API 地址
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
  instance = null
})

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.onload = () => resolve()
    script.onerror = e => reject(e)
    document.head.appendChild(script)
  })
}
</script>

<template>
  <div ref="comments" class="text-align-left" />
</template>
