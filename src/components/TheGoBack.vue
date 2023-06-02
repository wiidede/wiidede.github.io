<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
</script>

<template>
  <div v-if="route.path !== '/'" class="slide-enter m-auto mb-8 mt-8 animate-delay-500 text-left prose">
    <br>
    <div
      :key="route.path"
      class="link w-fit flex cursor-pointer items-center gap1 font-mono op50 hover:op75"
      @click="router.back()"
    >
      go back
      <div i-carbon-chevron-left text-0.8em />
    </div>
  </div>
</template>
