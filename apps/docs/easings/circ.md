# Circular

Easing based on circular/elliptical curves. Sharp acceleration with a smooth finish.

<script setup>
import EasingPage from '../components/EasingPage.vue'
import { easeInCirc, easeOutCirc, easeInOutCirc } from 'easefn'

const easings = [
  { name: 'easeInCirc', fn: easeInCirc },
  { name: 'easeOutCirc', fn: easeOutCirc },
  { name: 'easeInOutCirc', fn: easeInOutCirc },
]
</script>

<ClientOnly>
  <EasingPage :easings="easings" />
</ClientOnly>
