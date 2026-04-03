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
  { width: 200, height: 180, samples: 200 },
)

const padding = { top: 16, right: 12, bottom: 16, left: 16 }

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

const plotW = computed(() => props.width - padding.left - padding.right)
const plotH = computed(() => props.height - padding.top - padding.bottom)

function toSvgX(t: number) {
  return padding.left + t * plotW.value
}

function toSvgY(v: number) {
  const { min, max } = yRange.value
  const norm = (v - min) / (max - min)
  return padding.top + (1 - norm) * plotH.value
}

const polylinePoints = computed(() =>
  points.value.map((p) => `${toSvgX(p.x)},${toSvgY(p.y)}`).join(' '),
)

const tracerX = computed(() => toSvgX(props.progress))
const tracerY = computed(() => toSvgY(props.easeFn(props.progress)))

const zeroY = computed(() => toSvgY(0))
const oneY = computed(() => toSvgY(1))

/* axis labels */
const labelX0 = computed(() => padding.left - 2)
const labelX1 = computed(() => padding.left - 2)
</script>

<template>
  <div class="curve-container">
    <svg :width="width" :height="height" :viewBox="`0 0 ${width} ${height}`">
      <!-- y-axis labels -->
      <text :x="labelX0" :y="zeroY + 1" text-anchor="end" class="axis-label">0</text>
      <text :x="labelX1" :y="oneY + 1" text-anchor="end" class="axis-label">1</text>

      <!-- reference lines -->
      <line
        :x1="padding.left" :y1="zeroY" :x2="padding.left + plotW" :y2="zeroY"
        class="ref-line"
      />
      <line
        :x1="padding.left" :y1="oneY" :x2="padding.left + plotW" :y2="oneY"
        class="ref-line"
      />

      <!-- axes -->
      <line
        :x1="padding.left" :y1="padding.top" :x2="padding.left" :y2="padding.top + plotH"
        class="axis-line"
      />
      <line
        :x1="padding.left" :y1="padding.top + plotH" :x2="padding.left + plotW" :y2="padding.top + plotH"
        class="axis-line"
      />

      <!-- curve -->
      <polyline
        :points="polylinePoints"
        fill="none"
        stroke="var(--accent-curve)"
        stroke-width="2"
        stroke-linejoin="round"
        stroke-linecap="round"
      />

      <!-- tracer dot -->
      <circle
        v-if="progress > 0"
        :cx="tracerX"
        :cy="tracerY"
        r="4"
        fill="var(--accent-dot)"
      />
    </svg>
  </div>
</template>

<style scoped>
.ref-line {
  stroke: var(--paper-line);
  stroke-width: 1;
  stroke-dasharray: 3 4;
}

.axis-line {
  stroke: var(--ink-faint);
  stroke-width: 1;
}

.axis-label {
  font-family: var(--vp-font-family-mono);
  font-size: 9px;
  fill: var(--ink-faint);
  dominant-baseline: middle;
}
</style>
