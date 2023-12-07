<template>
  <footer class="slide-enter m-auto my-8 w-fit flex flex-col items-center px-4 prose animate-delay-800">
    <TheHitokoto class="w-fit" :delay="800" />
    <span class="text-sm op50">
      <a target="_blank" href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>
      2020-{{ new Date().getFullYear() }} © wiidede
      <a target="_blank" href="https://beian.miit.gov.cn" class="ml4">苏ICP备2023050822号</a>
    </span>
  </footer>
</template>
