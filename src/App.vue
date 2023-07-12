<script setup lang="ts">
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

const showHeader = ref(true)
const showBg = ref(true)

provide(ProvideShowHeaderKey, showHeader)
provide(ProvideShowBgKey, showBg)
</script>

<template>
  <client-only>
    <TheBg v-if="showBg" />
  </client-only>
  <TheHeader
    v-if="showHeader"
    text="gray-700 dark:gray-200"
    class="print:hidden"
  />
  <main
    :class="showHeader ? 'px4 pt4 pb10' : ''"
    text="center gray-700 dark:gray-200"
  >
    <RouterView />
  </main>
</template>
