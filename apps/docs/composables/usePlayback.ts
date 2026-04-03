import { ref, onUnmounted } from 'vue'

export function usePlayback(duration = 1500) {
  const progress = ref(0)
  const isPlaying = ref(false)
  let startTime = 0
  let rafId = 0

  function tick(now: number) {
    const elapsed = now - startTime
    const t = Math.min(elapsed / duration, 1)
    progress.value = t

    if (t < 1) {
      rafId = requestAnimationFrame(tick)
    } else {
      isPlaying.value = false
    }
  }

  function play() {
    if (isPlaying.value) return
    isPlaying.value = true
    progress.value = 0
    startTime = performance.now()
    rafId = requestAnimationFrame(tick)
  }

  function reset() {
    cancelAnimationFrame(rafId)
    isPlaying.value = false
    progress.value = 0
  }

  onUnmounted(() => cancelAnimationFrame(rafId))

  return { progress, isPlaying, play, reset }
}
