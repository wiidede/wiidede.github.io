<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
</script>

<template>
  <div v-if="route.path !== '/'" class="slide-enter m-auto mb-8 mt-8 animate-delay-500 text-left prose">
    <br>
    <div
      :key="route.path"
      class="link w-fit flex cursor-pointer items-center gap4 font-mono op50 transition-all hover:op75"
      @click="router.back()"
    >
      go back
      <div i-carbon-chevron-left class="back-icon text-0.8em" />
    </div>
  </div>
</template>

<style scoped>
.link .back-icon {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.link:hover .back-icon {
  transform: translateX(-0.5rem);
}
</style>
