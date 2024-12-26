<script setup lang="ts">
</script>

<template>
  <footer class="slide-enter m-auto mb-4 mt-8 w-fit w-full flex flex-col items-center prose animate-delay-800">
    <TheHitokoto class="w-fit" :delay="800" />
    <span class="text-sm op50">
      <a target="_blank" href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>
      2020-{{ new Date().getFullYear() }} © wiidede
    </span>
    <slot />
  </footer>
</template>
