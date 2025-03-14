<script lang="ts" setup>
defineProps<{
  icon: string
  label: string
}>()
</script>

<template>
  <div class="inline-flex items-center gap1">
    <div :class="icon" />
    <span class="text-sm text-zinc-600">{{ label }}</span>
  </div>
</template>

<style scoped>

</style>
