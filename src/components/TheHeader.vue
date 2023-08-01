<script setup lang="ts">
</script>

<template>
  <RouterLink class="header-card fixed ml2 mt2 rd-full px2 py1 text-6 text-black outline-none icon-btn dark:text-white" to="/" focusable="false">
    <div i-the-wiidede />
  </RouterLink>
  <header class="header-card fixed right-0 top-0 ml-auto mr4 mt3 w-fit rd-5 px2 py1 text-black ring-1 ring-zinc/33 dark:text-white">
    <nav flex="~ gap-4" class="items-center justify-end text-4">
      <RouterLink class="icon-btn" to="/posts" title="Blog">
        <span class="lt-md:hidden">博客</span>
        <div i-carbon-document-multiple-01 class="md:hidden" />
      </RouterLink>

      <RouterLink class="icon-btn" to="/friends" title="Friends">
        <span class="lt-md:hidden">友链</span>
        <div i-carbon-friendship class="md:hidden" />
      </RouterLink>

      <RouterLink class="icon-btn" to="/sponsor" title="捐赠">
        <div i-carbon-favorite />
      </RouterLink>

      <a class="icon-btn" rel="noreferrer" href="https://github.com/wiidede/wiidede.github.io" target="_blank" title="GitHub">
        <div i-carbon-logo-github />
      </a>

      <a href="/feed.xml" target="_blank" title="RSS">
        <div i-carbon-rss />
      </a>

      <button class="icon-btn" title="切换暗黑模式" @click="toggleDark">
        <div i="carbon-sun dark:carbon-moon" />
      </button>
    </nav>
  </header>
  <div class="h16 w0" />
</template>
