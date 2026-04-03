# Exponential

Easing based on exponential functions. Very dramatic acceleration.

<script setup>
import EasingPage from '../components/EasingPage.vue'
import { easeInExpo, easeOutExpo, easeInOutExpo } from 'easefn'

const easings = [
  { name: 'easeInExpo', fn: easeInExpo },
  { name: 'easeOutExpo', fn: easeOutExpo },
  { name: 'easeInOutExpo', fn: easeInOutExpo },
]
</script>

<ClientOnly>
  <EasingPage :easings="easings" />
</ClientOnly>
