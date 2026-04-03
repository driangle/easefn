# Back

Easing that overshoots the target and then returns. Adjust the overshoot parameter to control how far it goes past the target.

<script setup>
import FactoryEasingPage from '../components/FactoryEasingPage.vue'
import { easeInBack, easeOutBack, easeInOutBack } from 'easefn'

const variants = [
  { name: 'easeInBack', factory: (p) => easeInBack(p.overshoot) },
  { name: 'easeOutBack', factory: (p) => easeOutBack(p.overshoot) },
  { name: 'easeInOutBack', factory: (p) => easeInOutBack(p.overshoot) },
]

const params = [
  { name: 'overshoot', default: 1.70, min: 0, max: 5, step: 0.01 },
]
</script>

<ClientOnly>
  <FactoryEasingPage :variants="variants" :params="params" />
</ClientOnly>
