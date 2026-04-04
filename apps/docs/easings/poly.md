# Polynomial

Configurable polynomial easing. Adjust the power to control the curve intensity. Power 2 = quadratic, 3 = cubic, etc.

<script setup>
import FactoryEasingPage from '../components/FactoryEasingPage.vue'
import { easeInPoly, easeOutPoly, easeInOutPoly } from 'easefn'

const snippet = (name) => (p) => `${name}(${p.power})`

const variants = [
  { name: 'easeInPoly', factory: (p) => easeInPoly(p.power), snippet: snippet('easeInPoly') },
  { name: 'easeOutPoly', factory: (p) => easeOutPoly(p.power), snippet: snippet('easeOutPoly') },
  { name: 'easeInOutPoly', factory: (p) => easeInOutPoly(p.power), snippet: snippet('easeInOutPoly') },
]

const params = [
  { name: 'power', default: 3, min: 1, max: 10, step: 0.1 },
]
</script>

<ClientOnly>
  <FactoryEasingPage :variants="variants" :params="params" />
</ClientOnly>
