# Exponential (factory)

Configurable exponential easing. Adjust the exponent to control the intensity. The default preset uses exponent 10.

<script setup>
import FactoryEasingPage from '../components/FactoryEasingPage.vue'
import { makeEaseInExpo, makeEaseOutExpo, makeEaseInOutExpo } from 'easefn'

const snippet = (name) => (p) => `${name}(${p.exponent})`

const variants = [
  { name: 'makeEaseInExpo', factory: (p) => makeEaseInExpo(p.exponent), snippet: snippet('makeEaseInExpo') },
  { name: 'makeEaseOutExpo', factory: (p) => makeEaseOutExpo(p.exponent), snippet: snippet('makeEaseOutExpo') },
  { name: 'makeEaseInOutExpo', factory: (p) => makeEaseInOutExpo(p.exponent), snippet: snippet('makeEaseInOutExpo') },
]

const params = [
  { name: 'exponent', default: 10, min: 1, max: 20, step: 0.5 },
]
</script>

<ClientOnly>
  <FactoryEasingPage :variants="variants" :params="params" />
</ClientOnly>
