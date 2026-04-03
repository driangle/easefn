# Exponential (factory)

Configurable exponential easing. Adjust the exponent to control the intensity. The default preset uses exponent 10.

<script setup>
import FactoryEasingPage from '../components/FactoryEasingPage.vue'
import { makeEaseInExpo, makeEaseOutExpo, makeEaseInOutExpo } from 'easefn'

const variants = [
  { name: 'makeEaseInExpo', factory: (p) => makeEaseInExpo(p.exponent) },
  { name: 'makeEaseOutExpo', factory: (p) => makeEaseOutExpo(p.exponent) },
  { name: 'makeEaseInOutExpo', factory: (p) => makeEaseInOutExpo(p.exponent) },
]

const params = [
  { name: 'exponent', default: 10, min: 1, max: 20, step: 0.5 },
]
</script>

<ClientOnly>
  <FactoryEasingPage :variants="variants" :params="params" />
</ClientOnly>
