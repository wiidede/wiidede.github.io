<script setup lang="ts">
import { isClient } from '@vueuse/core'

const route = useRoute()

useHead({
  title: 'wiidede',
  meta: [
    { name: 'description', content: 'wiidede\'s personal site' },
    {
      name: 'theme-color',
      content: () => isDark.value ? '#121212' : '#ffffff',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: () => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg',
    },
  ],
})
</script>

<template>
  <TheBg v-if="isClient" />
  <TheHeader
    text="gray-700 dark:gray-200"
  />
  <main
    p="x4 t4 b10"
    text="center gray-700 dark:gray-200"
  >
    <RouterView />
  </main>
  <TheFooter
    :key="route.path"
    text="gray-700 dark:gray-200"
  />
</template>
