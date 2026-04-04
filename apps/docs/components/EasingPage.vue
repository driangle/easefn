<script setup lang="ts">
import type { EaseFn } from 'easefn'
import { usePlayback } from '../composables/usePlayback'
import EasingCurve from './EasingCurve.vue'
import ProgressBar from './ProgressBar.vue'
import ColorDemo from './ColorDemo.vue'
import PlaybackControls from './PlaybackControls.vue'

defineProps<{
  easings: Array<{ name: string; fn: EaseFn }>
}>()

function curveColor(name: string) {
  if (name.includes('InOut') || name.includes('inOut')) return 'var(--curve-inout)'
  if (name.includes('Out') || name.includes('out')) return 'var(--curve-out)'
  return 'var(--curve-in)'
}

const { progress, isPlaying, play, reset } = usePlayback()
</script>

<template>
  <PlaybackControls :is-playing="isPlaying" @play="play" @reset="reset" />
  <div v-for="easing in easings" :key="easing.name" class="easing-section">
    <h3>{{ easing.name }}</h3>
    <div class="demo-row">
      <EasingCurve :ease-fn="easing.fn" :progress="progress" :color="curveColor(easing.name)" />
      <div>
        <ProgressBar :ease-fn="easing.fn" :progress="progress" :color="curveColor(easing.name)" />
        <div style="height: 0.75rem" />
        <ColorDemo :ease-fn="easing.fn" :progress="progress" />
        <code class="snippet">import { {{ easing.name }} } from 'easefn'</code>
      </div>
    </div>
  </div>
</template>
