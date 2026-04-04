# Steps

CSS `steps()` compatible staircase easing. Produces `n` discrete steps with configurable jump position — useful for sprite animations, frame-by-frame effects, and discrete transitions.

<script setup>
import FactoryEasingPage from '../components/FactoryEasingPage.vue'
import { makeSteps } from 'easefn'

const positions = ['jump-end', 'jump-start', 'jump-both', 'jump-none']

const snippet = (name, pos) => (p) =>
  `${name}({ n: ${Math.round(p.steps)}, position: '${pos}' })`

const variants = positions.map((pos) => ({
  name: 'makeSteps',
  factory: (p) => makeSteps({ n: Math.round(p.steps), position: pos }),
  snippet: snippet('makeSteps', pos),
}))

const params = [
  { name: 'steps', default: 4, min: 1, max: 12, step: 1 },
]
</script>

<ClientOnly>
  <FactoryEasingPage :variants="variants" :params="params" />
</ClientOnly>
