<script setup lang="ts">
import { computed } from 'vue'
import type { EaseFn } from 'easefn'

const props = withDefaults(
  defineProps<{
    easeFn: EaseFn
    progress: number
    width?: number
    height?: number
    samples?: number
  }>(),
  { width: 240, height: 180, samples: 200 },
)

const padding = 20

const points = computed(() => {
  const pts: { x: number; y: number; rawY: number }[] = []
  for (let i = 0; i <= props.samples; i++) {
    const t = i / props.samples
    const v = props.easeFn(t)
    pts.push({ x: t, y: v, rawY: v })
  }
  return pts
})

const yRange = computed(() => {
  let min = 0
  let max = 1
  for (const p of points.value) {
    if (p.rawY < min) min = p.rawY
    if (p.rawY > max) max = p.rawY
  }
  const pad = (max - min) * 0.1 || 0.1
  return { min: min - pad, max: max + pad }
})

function toSvgX(t: number) {
  return padding + t * (props.width - 2 * padding)
}

function toSvgY(v: number) {
  const { min, max } = yRange.value
  const norm = (v - min) / (max - min)
  return props.height - padding - norm * (props.height - 2 * padding)
}

const polylinePoints = computed(() =>
  points.value.map((p) => `${toSvgX(p.x)},${toSvgY(p.y)}`).join(' '),
)

const tracerX = computed(() => toSvgX(props.progress))
const tracerY = computed(() => toSvgY(props.easeFn(props.progress)))

const zeroY = computed(() => toSvgY(0))
const oneY = computed(() => toSvgY(1))
</script>

<template>
  <div class="curve-container">
    <svg :width="width" :height="height" :viewBox="`0 0 ${width} ${height}`">
      <!-- axes -->
      <line
        :x1="padding" :y1="zeroY" :x2="width - padding" :y2="zeroY"
        stroke="var(--vp-c-border)" stroke-width="1" stroke-dasharray="4,3"
      />
      <line
        :x1="padding" :y1="oneY" :x2="width - padding" :y2="oneY"
        stroke="var(--vp-c-border)" stroke-width="1" stroke-dasharray="4,3"
      />
      <line
        :x1="padding" :y1="padding" :x2="padding" :y2="height - padding"
        stroke="var(--vp-c-border)" stroke-width="1"
      />
      <line
        :x1="padding" :y1="height - padding" :x2="width - padding" :y2="height - padding"
        stroke="var(--vp-c-border)" stroke-width="1"
      />

      <!-- curve -->
      <polyline
        :points="polylinePoints"
        fill="none"
        stroke="var(--vp-c-brand-1)"
        stroke-width="2"
        stroke-linejoin="round"
      />

      <!-- tracer dot -->
      <circle
        v-if="progress > 0"
        :cx="tracerX"
        :cy="tracerY"
        r="4"
        fill="var(--vp-c-brand-1)"
      />
    </svg>
  </div>
</template>
