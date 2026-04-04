<script setup lang="ts">
import type { EaseFn } from 'easefn'
import { usePlayback } from '../composables/usePlayback'
import EasingCurve from './EasingCurve.vue'
import MotionDemo from './MotionDemo.vue'
import ColorDemo from './ColorDemo.vue'
import PlaybackControls from './PlaybackControls.vue'

defineProps<{
  easings: Array<{ name: string; fn: EaseFn }>
}>()

const { progress, isPlaying, play, reset } = usePlayback()
</script>

<template>
  <PlaybackControls :is-playing="isPlaying" @play="play" @reset="reset" />
  <div v-for="easing in easings" :key="easing.name" class="easing-section">
    <h3>{{ easing.name }}</h3>
    <div class="demo-row">
      <EasingCurve :ease-fn="easing.fn" :progress="progress" />
      <div>
        <MotionDemo :ease-fn="easing.fn" :progress="progress" />
        <div style="height: 0.75rem" />
        <ColorDemo :ease-fn="easing.fn" :progress="progress" />
        <code class="snippet">import { {{ easing.name }} } from 'easefn'</code>
      </div>
    </div>
  </div>
</template>
