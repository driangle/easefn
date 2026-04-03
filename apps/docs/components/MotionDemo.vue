<script setup lang="ts">
import { computed } from 'vue'
import type { EaseFn } from 'easefn'

const props = defineProps<{
  easeFn: EaseFn
  progress: number
}>()

const ballLeft = computed(() => {
  const v = props.easeFn(props.progress)
  return `calc(12px + ${v * 100}% - ${v * 24}px)`
})
</script>

<template>
  <div class="motion-track">
    <div class="motion-ball" :style="{ left: ballLeft }" />
  </div>
</template>
