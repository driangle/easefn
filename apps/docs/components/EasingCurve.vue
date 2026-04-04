<script setup lang="ts">
import { computed } from 'vue'
import type { EaseFn } from 'easefn'

const GRID = 20

const props = withDefaults(
  defineProps<{
    easeFn: EaseFn
    progress: number
    width?: number
    height?: number
    samples?: number
  }>(),
  { width: 240, height: 240, samples: 200 },
)

const padding = { top: GRID, right: GRID, bottom: GRID, left: GRID }

const points = computed(() => {
  const pts: { x: number; y: number }[] = []
  for (let i = 0; i <= props.samples; i++) {
    const t = i / props.samples
    pts.push({ x: t, y: props.easeFn(t) })
  }
  return pts
})

const plotW = computed(() => props.width - padding.left - padding.right)
const plotH = computed(() => props.height - padding.top - padding.bottom)

/**
 * Compute y-axis range, snapped so that 0 and 1 land on grid lines.
 *
 * For standard 0–1 easings this is trivial (min=0, max=1).
 * For overshoot curves (back, elastic) we pick the finest "unit" size
 * (pixels per 1.0 of value) that is a multiple of GRID and still fits
 * the data, then snap max/min so both 0 and 1 align to the grid.
 */
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

  // Find largest unitPx (finest resolution) that is a multiple of GRID,
  // divides plotH evenly, and whose implied range fits the data.
  let unitPx = GRID
  for (let u = h; u >= GRID; u -= GRID) {
    if (h % u === 0 && h / u >= rawRange) {
      unitPx = u
      break
    }
  }

  const rangeSize = h / unitPx
  const k = unitPx / GRID // grid cells per unit of value

  // Snap max up so 0 and 1 both land on grid-aligned Y positions
  let max = Math.ceil(rawMax * k) / k
  let min = max - rangeSize

  if (min > rawMin) {
    min = Math.floor(rawMin * k) / k
    max = min + rangeSize
  }

  return { min, max }
})

function toSvgX(t: number) {
  return padding.left + t * plotW.value
}

function toSvgY(v: number) {
  const { min, max } = yRange.value
  return padding.top + ((max - v) / (max - min)) * plotH.value
}

const polylinePoints = computed(() =>
  points.value.map((p) => `${toSvgX(p.x)},${toSvgY(p.y)}`).join(' '),
)

const tracerX = computed(() => toSvgX(props.progress))
const tracerY = computed(() => toSvgY(props.easeFn(props.progress)))

const zeroY = computed(() => toSvgY(0))
const oneY = computed(() => toSvgY(1))

const labelX = padding.left - 2
</script>

<template>
  <div class="curve-container">
    <svg :width="width" :height="height" :viewBox="`0 0 ${width} ${height}`">
      <!-- y-axis labels -->
      <text :x="labelX" :y="zeroY" text-anchor="end" class="axis-label">0</text>
      <text :x="labelX" :y="oneY" text-anchor="end" class="axis-label">1</text>

      <!-- reference lines -->
      <line
        :x1="padding.left" :y1="zeroY" :x2="padding.left + plotW" :y2="zeroY"
        class="ref-line"
      />
      <line
        :x1="padding.left" :y1="oneY" :x2="padding.left + plotW" :y2="oneY"
        class="ref-line"
      />

      <!-- axes (anchored to 0 and 1) -->
      <line
        :x1="padding.left" :y1="oneY" :x2="padding.left" :y2="zeroY"
        class="axis-line"
      />
      <line
        :x1="padding.left" :y1="zeroY" :x2="padding.left + plotW" :y2="zeroY"
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
