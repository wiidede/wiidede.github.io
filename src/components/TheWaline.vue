<script setup>
import { Waline } from '@waline/client/component'
import '@waline/client/style'

const serverURL = 'https://waline.wiidede.space'
const path = computed(() => useRoute().path)
</script>

<template>
  <Waline
    class="waline"
    :server-u-r-l="serverURL"
    :path="path"
    dark=".dark"
    :emoji="[
      '//unpkg.com/@waline/emojis@1.2.0/weibo',
      '//unpkg.com/@waline/emojis@1.2.0/bmoji',
    ]"
    :search="false"
    :image-uploader="() => ''"
  />
</template>

<style scoped>
.waline {
  --waline-theme-color: var(--c-primary);
  --waline-active-color: var(--c-active);
}

:deep(label[for='wl-image-upload']) {
  display: none;
}
:deep(a.wl-action) {
  display: inline-flex;
}

:deep(.wl-btn) {
  --waline-black: currentColor;
  --waline-white: currentColor;
}

:deep(a) {
  color: currentColor;
}
</style>
