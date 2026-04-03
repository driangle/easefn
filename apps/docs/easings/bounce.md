# Bounce

Simulates a bouncing motion, like a ball hitting a surface.

<script setup>
import EasingPage from '../components/EasingPage.vue'
import { easeInBounce, easeOutBounce, easeInOutBounce } from 'easefn'

const easings = [
  { name: 'easeInBounce', fn: easeInBounce },
  { name: 'easeOutBounce', fn: easeOutBounce },
  { name: 'easeInOutBounce', fn: easeInOutBounce },
]
</script>

<ClientOnly>
  <EasingPage :easings="easings" />
</ClientOnly>
