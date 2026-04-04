# Polynomial

Configurable polynomial easing. Adjust the power to control the curve intensity. Power 2 = quadratic, 3 = cubic, etc.

<script setup>
import FactoryEasingPage from '../components/FactoryEasingPage.vue'
import { makeEaseInPoly, makeEaseOutPoly, makeEaseInOutPoly } from 'easefn'

const snippet = (name) => (p) => `${name}(${p.power})`

const variants = [
  { name: 'makeEaseInPoly', factory: (p) => makeEaseInPoly(p.power), snippet: snippet('makeEaseInPoly') },
  { name: 'makeEaseOutPoly', factory: (p) => makeEaseOutPoly(p.power), snippet: snippet('makeEaseOutPoly') },
  { name: 'makeEaseInOutPoly', factory: (p) => makeEaseInOutPoly(p.power), snippet: snippet('makeEaseInOutPoly') },
]

const params = [
  { name: 'power', default: 3, min: 1, max: 10, step: 0.1 },
]
</script>

<ClientOnly>
  <FactoryEasingPage :variants="variants" :params="params" />
</ClientOnly>
