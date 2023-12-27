<script setup lang="ts">
import beian from '/assets/images/beian.png'
</script>

<template>
  <footer class="slide-enter m-auto my-8 w-fit flex flex-col items-center px-4 prose animate-delay-800">
    <TheHitokoto class="w-fit" :delay="800" />
    <span class="op50">
      <a target="_blank" href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>
      2020-{{ new Date().getFullYear() }} © wiidede
    </span>
    <span class="flex gap4 op50">
      <a target="_blank" href="https://beian.miit.gov.cn" class="ml4">苏ICP备2023050822号</a>
      <a
        href="https://beian.mps.gov.cn/#/query/webSearch?code=32050502011687"
        rel="noreferrer" target="_blank"
      >
        <span class="flex items-center gap1">
          <img class="inline-block h-1em w-1em select-none" :src="beian">
          <span>苏公网安备32050502011687</span>
        </span>
      </a>
    </span>
  </footer>
</template>
