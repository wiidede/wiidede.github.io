<script setup lang="ts">
useHead({
  title: 'wiidede | 小的的',
  meta: [
    { name: 'description', content: 'wiidede\'s personal site 是小的的呐' },
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
    text="zinc-700 dark:zinc-200"
    class="print:hidden"
  />
  <main
    :class="showHeader ? 'px4 pt4 pb6' : ''"
    text="center zinc-700 dark:zinc-200"
  >
    <RouterView />
  </main>
</template>
