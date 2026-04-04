---
layout: page
---

<div class="all-easings-page">

# All Easings

Every easing function at a glance. Click play to see them all animate together.

<script setup>
import { withBase } from 'vitepress'
import EasingGrid from '../components/EasingGrid.vue'
import {
  linear,
  easeInQuad, easeOutQuad, easeInOutQuad,
  easeInCubic, easeOutCubic, easeInOutCubic,
  easeInSine, easeOutSine, easeInOutSine,
  easeInExpo, easeOutExpo, easeInOutExpo,
  easeInCirc, easeOutCirc, easeInOutCirc,
  easeInBounce, easeOutBounce, easeInOutBounce,
  easeInBack, easeOutBack, easeInOutBack,
  easeInElastic, easeOutElastic, easeInOutElastic,
} from 'easefn'

const e = (name, fn, page) => ({ name, fn, link: withBase(`/easings/${page}#${name}`) })

const easings = [
  e('linear', linear, 'linear'),
  e('easeInQuad', easeInQuad, 'quad'),
  e('easeOutQuad', easeOutQuad, 'quad'),
  e('easeInOutQuad', easeInOutQuad, 'quad'),
  e('easeInCubic', easeInCubic, 'cubic'),
  e('easeOutCubic', easeOutCubic, 'cubic'),
  e('easeInOutCubic', easeInOutCubic, 'cubic'),
  e('easeInSine', easeInSine, 'sine'),
  e('easeOutSine', easeOutSine, 'sine'),
  e('easeInOutSine', easeInOutSine, 'sine'),
  e('easeInExpo', easeInExpo, 'expo'),
  e('easeOutExpo', easeOutExpo, 'expo'),
  e('easeInOutExpo', easeInOutExpo, 'expo'),
  e('easeInCirc', easeInCirc, 'circ'),
  e('easeOutCirc', easeOutCirc, 'circ'),
  e('easeInOutCirc', easeInOutCirc, 'circ'),
  e('easeInBounce', easeInBounce, 'bounce'),
  e('easeOutBounce', easeOutBounce, 'bounce'),
  e('easeInOutBounce', easeInOutBounce, 'bounce'),
  e('easeInBack', easeInBack(), 'back'),
  e('easeOutBack', easeOutBack(), 'back'),
  e('easeInOutBack', easeInOutBack(), 'back'),
  e('easeInElastic', easeInElastic(), 'elastic'),
  e('easeOutElastic', easeOutElastic(), 'elastic'),
  e('easeInOutElastic', easeInOutElastic(), 'elastic'),
]
</script>

<ClientOnly>
  <EasingGrid :easings="easings" />
</ClientOnly>

</div>
