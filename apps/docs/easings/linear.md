# Linear

No easing — constant speed from start to finish.

<script setup>
import EasingPage from '../components/EasingPage.vue'
import { linear } from 'easefn'

const easings = [
  { name: 'linear', fn: linear },
]
</script>

<ClientOnly>
  <EasingPage :easings="easings" />
</ClientOnly>
