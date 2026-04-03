<script setup lang="ts">
import { computed } from 'vue'
import type { EaseFn } from 'easefn'

const props = defineProps<{
  easeFn: EaseFn
  progress: number
}>()

const colorA = { h: 217, s: 91, l: 60 } // #3b82f6 blue
const colorB = { h: 0, s: 84, l: 60 }   // #ef4444 red

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

const color = computed(() => {
  const t = props.easeFn(props.progress)
  const h = lerp(colorA.h, colorB.h, t)
  const s = lerp(colorA.s, colorB.s, t)
  const l = lerp(colorA.l, colorB.l, t)
  return `hsl(${h}, ${s}%, ${l}%)`
})
</script>

<template>
  <div class="color-swatch" :style="{ background: color }" />
</template>
