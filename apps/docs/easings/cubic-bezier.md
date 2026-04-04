# Cubic Bezier

CSS `cubic-bezier()` compatible easing. Accepts four control points `(x1, y1, x2, y2)` matching the CSS syntax — paste values directly from browser DevTools, Figma, or After Effects.

<script setup>
import FactoryEasingPage from '../components/FactoryEasingPage.vue'
import { makeCubicBezier } from 'easefn'

const snippet = (name) => (p) =>
  `${name}({ x1: ${p.x1}, y1: ${p.y1}, x2: ${p.x2}, y2: ${p.y2} })`

const variants = [
  { name: 'makeCubicBezier', factory: (p) => makeCubicBezier({ x1: p.x1, y1: p.y1, x2: p.x2, y2: p.y2 }), snippet: snippet('makeCubicBezier') },
]

const params = [
  { name: 'x1', default: 0.25, min: 0, max: 1, step: 0.01 },
  { name: 'y1', default: 0.1, min: -1, max: 2, step: 0.01 },
  { name: 'x2', default: 0.25, min: 0, max: 1, step: 0.01 },
  { name: 'y2', default: 1.0, min: -1, max: 2, step: 0.01 },
]
</script>

<ClientOnly>
  <FactoryEasingPage :variants="variants" :params="params" />
</ClientOnly>
