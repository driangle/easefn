<script setup lang="ts">
import { computed } from 'vue'
import type { EaseFn } from 'easefn'

const props = withDefaults(
  defineProps<{
    easeFn: EaseFn
    progress: number
    color?: string
  }>(),
  { color: 'var(--curve-in)' },
)

const fillWidth = computed(() => `${props.easeFn(props.progress) * 100}%`)
</script>

<template>
  <div class="progress-bar" :style="{ '--curve-color': color }">
    <div class="progress-bar-fill" :style="{ width: fillWidth }" />
  </div>
</template>
