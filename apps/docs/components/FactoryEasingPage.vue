<script setup lang="ts">
import { ref, computed, type Ref } from 'vue'
import type { EaseFn } from 'easefn'
import { usePlayback } from '../composables/usePlayback'
import EasingCurve from './EasingCurve.vue'
import ProgressBar from './ProgressBar.vue'
import ColorDemo from './ColorDemo.vue'
import PlaybackControls from './PlaybackControls.vue'
import ParamSlider from './ParamSlider.vue'

interface ParamDef {
  name: string
  default: number
  min: number
  max: number
  step: number
}

const props = defineProps<{
  variants: Array<{
    name: string
    factory: (params: Record<string, number>) => EaseFn
    snippet?: (params: Record<string, number>) => string
  }>
  params: ParamDef[]
}>()

const { progress, isPlaying, play, reset } = usePlayback()

const paramValues: Record<string, Ref<number>> = {}
for (const p of props.params) {
  paramValues[p.name] = ref(p.default)
}

const currentParams = computed(() => {
  const result: Record<string, number> = {}
  for (const key in paramValues) {
    result[key] = paramValues[key].value
  }
  return result
})

function curveColor(name: string) {
  if (name.includes('InOut') || name.includes('inOut')) return 'var(--curve-inout)'
  if (name.includes('Out') || name.includes('out')) return 'var(--curve-out)'
  return 'var(--curve-in)'
}

const easings = computed(() =>
  props.variants.map((v) => ({
    name: v.name,
    fn: v.factory(currentParams.value),
    color: curveColor(v.name),
    snippet: v.snippet
      ? `import { ${v.name} } from 'easefn'\n\nconst ease = ${v.snippet(currentParams.value)}`
      : `import { ${v.name} } from 'easefn'`,
  })),
)
</script>

<template>
  <div class="sticky-controls">
    <div class="params-panel">
      <ParamSlider
        v-for="p in params"
        :key="p.name"
        :label="p.name"
        :model-value="paramValues[p.name].value"
        :min="p.min"
        :max="p.max"
        :step="p.step"
        @update:model-value="paramValues[p.name].value = $event"
      />
    </div>

    <PlaybackControls :is-playing="isPlaying" @play="play" @reset="reset" />
  </div>

  <div v-for="easing in easings" :key="easing.name" class="easing-section">
    <h3>{{ easing.name }}</h3>
    <div class="demo-row">
      <EasingCurve :ease-fn="easing.fn" :progress="progress" :color="easing.color" />
      <div>
        <ProgressBar :ease-fn="easing.fn" :progress="progress" :color="easing.color" />
        <div style="height: 0.75rem" />
        <ColorDemo :ease-fn="easing.fn" :progress="progress" />
        <code class="snippet">{{ easing.snippet }}</code>
      </div>
    </div>
  </div>
</template>
