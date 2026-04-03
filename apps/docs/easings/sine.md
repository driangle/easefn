# Sine

Easing based on sine/cosine curves. Very smooth and natural-feeling.

<script setup>
import EasingPage from '../components/EasingPage.vue'
import { easeInSine, easeOutSine, easeInOutSine } from 'easefn'

const easings = [
  { name: 'easeInSine', fn: easeInSine },
  { name: 'easeOutSine', fn: easeOutSine },
  { name: 'easeInOutSine', fn: easeInOutSine },
]
</script>

<ClientOnly>
  <EasingPage :easings="easings" />
</ClientOnly>
