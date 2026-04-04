<script setup lang="ts">
import { computed } from 'vue'
import type { EaseFn } from 'easefn'
import { usePlayback } from '../composables/usePlayback'
import EasingCurve from './EasingCurve.vue'
import PlaybackControls from './PlaybackControls.vue'

defineProps<{
  easings: Array<{ name: string; fn: EaseFn; link: string }>
}>()

function curveColor(name: string) {
  if (name.includes('InOut') || name.includes('inOut')) return 'var(--curve-inout)'
  if (name.includes('Out') || name.includes('out')) return 'var(--curve-out)'
  return 'var(--curve-in)'
}

const { progress, isPlaying, play, reset } = usePlayback()

const colorA = { h: 217, s: 91, l: 60 }
const colorB = { h: 0, s: 84, l: 60 }

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function swatchColor(fn: EaseFn, t: number) {
  const v = fn(t)
  const h = lerp(colorA.h, colorB.h, v)
  const s = lerp(colorA.s, colorB.s, v)
  const l = lerp(colorA.l, colorB.l, v)
  return `hsl(${h}, ${s}%, ${l}%)`
}
</script>

<template>
  <PlaybackControls :is-playing="isPlaying" @play="play" @reset="reset" />
  <div class="easing-grid">
    <a v-for="easing in easings" :key="easing.name" :href="easing.link" class="easing-card">
      <EasingCurve
        :ease-fn="easing.fn"
        :progress="progress"
        :color="curveColor(easing.name)"
        :width="120"
        :height="120"
        :samples="100"
        compact
      />
      <div
        class="card-swatch"
        :style="{ background: swatchColor(easing.fn, progress) }"
      />
      <span class="card-name">{{ easing.name }}</span>
    </a>
  </div>
</template>

<style scoped>
.easing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
}

.easing-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  text-decoration: none;
  transition: transform 0.15s ease;
}

.easing-card:hover {
  transform: scale(1.04);
}

.easing-card:hover .card-name {
  color: var(--accent-curve);
}

.card-swatch {
  width: 100%;
  height: 6px;
  border-radius: 3px;
}

.card-name {
  font-family: var(--vp-font-family-mono);
  font-size: var(--fs-xs);
  color: var(--ink-faint);
  text-align: center;
}
</style>
