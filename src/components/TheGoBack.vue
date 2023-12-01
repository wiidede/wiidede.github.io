<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
</script>

<template>
  <div v-if="route.path !== '/'" class="slide-enter m-auto mb-8 mt-8 text-left prose animate-delay-500">
    <br>
    <div
      :key="route.path"
      class="group w-fit w-fit flex cursor-pointer items-center gap4 font-mono op67 under-anime-r under-base hover:under-anime-hover"
      @click="router.back()"
    >
      返回
      <div i-carbon-chevron-left class="back-icon text-0.8em transition duration-250 group-hover:translate-x--2" />
    </div>
  </div>
</template>

<style scoped>
</style>
