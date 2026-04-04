<script setup lang="ts">
import { computed } from 'vue'
import type { EaseFn } from 'easefn'

const GRID = 20

const props = withDefaults(
  defineProps<{
    easeFn: EaseFn
    progress: number
    color?: string
    width?: number
    height?: number
    samples?: number
    compact?: boolean
  }>(),
  { width: 240, height: 240, samples: 200, color: 'var(--curve-in)', compact: false },
)

const pad = computed(() => props.compact ? 8 : GRID)
const padding = computed(() => ({
  top: pad.value,
  right: pad.value,
  bottom: pad.value,
  left: props.compact ? pad.value : GRID,
}))

const points = computed(() => {
  const pts: { x: number; y: number }[] = []
  for (let i = 0; i <= props.samples; i++) {
    const t = i / props.samples
    pts.push({ x: t, y: props.easeFn(t) })
  }
  return pts
})

const plotW = computed(() => props.width - padding.value.left - padding.value.right)
const plotH = computed(() => props.height - padding.value.top - padding.value.bottom)

const yRange = computed(() => {
  let rawMin = 0
  let rawMax = 1
  for (const p of points.value) {
    if (p.y < rawMin) rawMin = p.y
    if (p.y > rawMax) rawMax = p.y
  }

  if (rawMin >= 0 && rawMax <= 1) return { min: 0, max: 1 }

  const h = plotH.value
  const rawRange = rawMax - rawMin

  let unitPx = GRID
  for (let u = h; u >= GRID; u -= GRID) {
    if (h % u === 0 && h / u >= rawRange) {
      unitPx = u
      break
    }
  }

  const rangeSize = h / unitPx
  const k = unitPx / GRID

  let max = Math.ceil(rawMax * k) / k
  let min = max - rangeSize

  if (min > rawMin) {
    min = Math.floor(rawMin * k) / k
    max = min + rangeSize
  }

  return { min, max }
})

function toSvgX(t: number) {
  return padding.value.left + t * plotW.value
}

function toSvgY(v: number) {
  const { min, max } = yRange.value
  return padding.value.top + ((max - v) / (max - min)) * plotH.value
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
      <!-- y-axis labels (full mode only) -->
      <template v-if="!compact">
        <text :x="padding.left - 4" :y="zeroY" text-anchor="end" class="axis-label">0</text>
        <text :x="padding.left - 4" :y="oneY" text-anchor="end" class="axis-label">1</text>
      </template>

      <!-- reference lines at 0 and 1 -->
      <line
        :x1="padding.left" :y1="zeroY" :x2="padding.left + plotW" :y2="zeroY"
        class="ref-line"
      />
      <line
        :x1="padding.left" :y1="oneY" :x2="padding.left + plotW" :y2="oneY"
        class="ref-line"
      />

      <!-- curve -->
      <polyline
        :points="polylinePoints"
        fill="none"
        :stroke="color"
        :stroke-width="compact ? 2 : 3"
        stroke-linejoin="round"
        stroke-linecap="round"
      />

      <!-- tracer dot -->
      <circle
        v-if="progress > 0"
        :cx="tracerX"
        :cy="tracerY"
        :r="compact ? 3 : 5"
        :fill="color"
      />
    </svg>
  </div>
</template>

<style scoped>
.ref-line {
  stroke: rgba(255, 255, 255, 0.1);
  stroke-width: 1;
}

.axis-label {
  font-family: var(--vp-font-family-mono);
  font-size: 9px;
  fill: rgba(255, 255, 255, 0.35);
  dominant-baseline: middle;
}
</style>
