# Elastic

Spring-like oscillating easing. Adjust amplitude and period to control the spring behavior.

<script setup>
import FactoryEasingPage from '../components/FactoryEasingPage.vue'
import { makeEaseInElastic, makeEaseOutElastic, makeEaseInOutElastic } from 'easefn'

const snippet = (name) => (p) =>
  `${name}({\n  amplitude: ${p.amplitude},\n  period: ${p.period},\n})`

const variants = [
  { name: 'makeEaseInElastic', factory: (p) => makeEaseInElastic({ amplitude: p.amplitude, period: p.period }), snippet: snippet('makeEaseInElastic') },
  { name: 'makeEaseOutElastic', factory: (p) => makeEaseOutElastic({ amplitude: p.amplitude, period: p.period }), snippet: snippet('makeEaseOutElastic') },
  { name: 'makeEaseInOutElastic', factory: (p) => makeEaseInOutElastic({ amplitude: p.amplitude, period: p.period }), snippet: snippet('makeEaseInOutElastic') },
]

const params = [
  { name: 'amplitude', default: 1, min: 1, max: 3, step: 0.1 },
  { name: 'period', default: 0.3, min: 0.1, max: 1, step: 0.01 },
]
</script>

<ClientOnly>
  <FactoryEasingPage :variants="variants" :params="params" />
</ClientOnly>
