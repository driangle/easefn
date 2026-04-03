# Elastic

Spring-like oscillating easing. Adjust amplitude and period to control the spring behavior.

<script setup>
import FactoryEasingPage from '../components/FactoryEasingPage.vue'
import { easeInElastic, easeOutElastic, easeInOutElastic } from 'easefn'

const variants = [
  { name: 'easeInElastic', factory: (p) => easeInElastic({ amplitude: p.amplitude, period: p.period }) },
  { name: 'easeOutElastic', factory: (p) => easeOutElastic({ amplitude: p.amplitude, period: p.period }) },
  { name: 'easeInOutElastic', factory: (p) => easeInOutElastic({ amplitude: p.amplitude, period: p.period }) },
]

const params = [
  { name: 'amplitude', default: 1, min: 1, max: 3, step: 0.1 },
  { name: 'period', default: 0.3, min: 0.1, max: 1, step: 0.01 },
]
</script>

<ClientOnly>
  <FactoryEasingPage :variants="variants" :params="params" />
</ClientOnly>
