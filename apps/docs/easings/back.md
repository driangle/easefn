# Back

Easing that overshoots the target and then returns. Adjust the overshoot parameter to control how far it goes past the target.

<script setup>
import FactoryEasingPage from '../components/FactoryEasingPage.vue'
import { makeEaseInBack, makeEaseOutBack, makeEaseInOutBack } from 'easefn'

const snippet = (name) => (p) => `${name}(${p.overshoot})`

const variants = [
  { name: 'makeEaseInBack', factory: (p) => makeEaseInBack(p.overshoot), snippet: snippet('makeEaseInBack') },
  { name: 'makeEaseOutBack', factory: (p) => makeEaseOutBack(p.overshoot), snippet: snippet('makeEaseOutBack') },
  { name: 'makeEaseInOutBack', factory: (p) => makeEaseInOutBack(p.overshoot), snippet: snippet('makeEaseInOutBack') },
]

const params = [
  { name: 'overshoot', default: 1.70, min: 0, max: 5, step: 0.01 },
]
</script>

<ClientOnly>
  <FactoryEasingPage :variants="variants" :params="params" />
</ClientOnly>
