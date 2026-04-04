# Back

Easing that overshoots the target and then returns. Adjust the overshoot parameter to control how far it goes past the target.

<script setup>
import FactoryEasingPage from '../components/FactoryEasingPage.vue'
import { easeInBack, easeOutBack, easeInOutBack } from 'easefn'

const snippet = (name) => (p) => `${name}(${p.overshoot})`

const variants = [
  { name: 'easeInBack', factory: (p) => easeInBack(p.overshoot), snippet: snippet('easeInBack') },
  { name: 'easeOutBack', factory: (p) => easeOutBack(p.overshoot), snippet: snippet('easeOutBack') },
  { name: 'easeInOutBack', factory: (p) => easeInOutBack(p.overshoot), snippet: snippet('easeInOutBack') },
]

const params = [
  { name: 'overshoot', default: 1.70, min: 0, max: 5, step: 0.01 },
]
</script>

<ClientOnly>
  <FactoryEasingPage :variants="variants" :params="params" />
</ClientOnly>
