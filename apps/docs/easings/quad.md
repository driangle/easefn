# Quadratic

Easing based on the power of 2. Produces a gentle acceleration/deceleration.

<script setup>
import EasingPage from '../components/EasingPage.vue'
import { easeInQuad, easeOutQuad, easeInOutQuad } from 'easefn'

const easings = [
  { name: 'easeInQuad', fn: easeInQuad },
  { name: 'easeOutQuad', fn: easeOutQuad },
  { name: 'easeInOutQuad', fn: easeInOutQuad },
]
</script>

<ClientOnly>
  <EasingPage :easings="easings" />
</ClientOnly>
