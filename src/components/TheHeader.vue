<script setup lang="ts">
</script>

<template>
  <header class="position-sticky top-0">
    <RouterLink class="absolute m-3 text-6 text-black outline-none icon-btn dark:text-white" to="/" focusable="false">
      <div i-the-wiidede />
    </RouterLink>
    <nav flex="~ gap-4" class="items-center justify-end px-4 pb2 pt4 text-4">
      <RouterLink class="icon-btn" to="/posts" title="Blog">
        <span class="lt-md:hidden">Blog</span>
        <div i-carbon-document-multiple-01 class="md:hidden" />
      </RouterLink>

      <button class="icon-btn" title="Toggle dark" @click="toggleDark">
        <div i="carbon-sun dark:carbon-moon" />
      </button>

      <a class="icon-btn" rel="noreferrer" href="https://github.com/wiidede/wiidede.github.io" target="_blank" title="GitHub">
        <div i-carbon-logo-github />
      </a>
    </nav>
  </header>
</template>
