<script lang="ts" setup>
import { isClient } from '@vueuse/core'

const route = useRoute()
const getBackUrl = () => isClient ? (window.history.state.back || '/') : '/'
</script>

<template>
  <div v-if="route.path !== '/'" class="slide-enter m-auto mb-8 mt-8 animate-delay-500 text-left prose">
    <br>
    <span font-mono op50>> </span>
    <RouterLink
      :key="route.path"
      :to="getBackUrl()"
      class="font-mono op50 hover:op75"
      v-text="'go back'"
    />
  </div>
</template>
