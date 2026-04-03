# Cubic

Easing based on the power of 3. Stronger acceleration than quadratic.

<script setup>
import EasingPage from '../components/EasingPage.vue'
import { easeInCubic, easeOutCubic, easeInOutCubic } from 'easefn'

const easings = [
  { name: 'easeInCubic', fn: easeInCubic },
  { name: 'easeOutCubic', fn: easeOutCubic },
  { name: 'easeInOutCubic', fn: easeInOutCubic },
]
</script>

<ClientOnly>
  <EasingPage :easings="easings" />
</ClientOnly>
